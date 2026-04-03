import { NextRequest, NextResponse } from "next/server";
import { isGenericEmailDomain } from "../../../src/lib/contactEmail";
import { consumeRateLimit, getClientIp } from "../../../src/lib/rateLimit";
import { sendResendEmail } from "../../../src/lib/resend";
import {
  asString,
  buildPayloadList,
  escapeHtml,
  hasSuspiciousName,
  isValidEmail,
  isValidPhone,
  sanitizeValues,
  type IncomingFormBody,
} from "../../../src/lib/apiForms";
import type { Locale } from "../../../src/lib/i18n";

const RATE_LIMIT = {
  max: 8,
  windowMs: 10 * 60 * 1000,
};

function getSubject(formId: string, values: Record<string, string>) {
  if (
    formId === "contact_multistep_v3" ||
    formId === "contact_multistep_v4" ||
    formId === "contact_multistep_v5"
  ) {
    const roleLabel = asString(values.roleLabel) || asString(values.roleType) || "Rol no indicado";
    return `Nueva conversación de encaje — ${roleLabel}`;
  }

  if (formId === "contact_multistep" || formId === "contact_multistep_v2") {
    const company = asString(values.company) || "Sin empresa";
    const roleType = asString(values.roleType) || "Rol no indicado";
    return `Nueva conversación de encaje — ${company} (${roleType})`;
  }

  if (formId === "waitlist") return "Nuevo registro waitlist Growth Scorecard";
  return "Nuevo lead desde formulario de contacto";
}

function requiresLegacyMessage(formId: string): boolean {
  return formId === "contact";
}

function isMultistepV3(formId: string): boolean {
  return (
    formId === "contact_multistep_v3" ||
    formId === "contact_multistep_v4" ||
    formId === "contact_multistep_v5"
  );
}

function isMultistepLegacy(formId: string): boolean {
  return formId === "contact_multistep" || formId === "contact_multistep_v2";
}

function buildSectionRows(items: Array<{ key: string; value: string }>) {
  return items
    .filter((item) => Boolean(item.value))
    .map(
      (item) =>
        `<tr><td style="padding:6px 10px;border:1px solid #d6dee6;"><strong>${escapeHtml(
          item.key
        )}</strong></td><td style="padding:6px 10px;border:1px solid #d6dee6;">${escapeHtml(
          item.value
        )}</td></tr>`
    )
    .join("");
}

function renderSection(title: string, rows: string) {
  if (!rows) return "";

  return `
    <h3 style="margin:18px 0 8px;color:#0f253d;">${escapeHtml(title)}</h3>
    <table style="border-collapse:collapse;width:100%;">${rows}</table>
  `;
}

function getLocaleFromRequest(request: NextRequest, payload?: IncomingFormBody): Locale {
  const value = asString(payload?.values?.locale);
  if (value === "en") return "en";
  if (value === "es") return "es";

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() || "";
  return acceptLanguage.startsWith("en") || acceptLanguage.includes(",en") ? "en" : "es";
}

function getCopy(locale: Locale) {
  if (locale === "en") {
    return {
      rateLimited: "You have reached the temporary submission limit. Please try again in a few minutes.",
      invalidRequest: "Invalid request format.",
      received: "Received.",
      invalidEmail: "Enter a valid email address.",
      invalidFirstName: "Please review the first name. It does not look valid.",
      invalidLastName: "Please review the last name. It does not look valid.",
      invalidPhoneWithPrefix: "Enter a valid phone number, including country code if needed.",
      selectGoal: "Select at least one primary goal.",
      selectTiming: "Select the decision timeline.",
      selectRole: "Select your role.",
      companyRequired: "Enter the company name.",
      contextRequired: "This field is required when you select an open option.",
      fullNameRequired: "Enter your full name.",
      phoneRequired: "Phone is required.",
      selectMarketingGoal: "Select at least one marketing goal.",
      addSearchContext: "Add search context so I can assess fit.",
      addMoreSearchContext: "Add more search context (minimum 20 characters).",
      nameRequired: "Name is required.",
      messageRequired: "Message is required.",
      addMessageContext: "Add a bit more context in the message.",
      success: "Form submitted successfully.",
      sendError:
        "The form could not be submitted right now. If you prefer, message me on LinkedIn while I review it.",
    };
  }

  return {
    rateLimited: "Has superado el límite temporal de envíos. Inténtalo de nuevo en unos minutos.",
    invalidRequest: "Formato de petición no válido.",
    received: "Recibido.",
    invalidEmail: "Introduce un email válido.",
    invalidFirstName: "Revisa el nombre. Parece un valor no válido.",
    invalidLastName: "Revisa los apellidos. Parece un valor no válido.",
    invalidPhoneWithPrefix: "Introduce un teléfono válido, incluyendo prefijo si aplica.",
    selectGoal: "Selecciona al menos un objetivo principal.",
    selectTiming: "Selecciona el timing de decisión.",
    selectRole: "Selecciona tu rol.",
    companyRequired: "Indica el nombre de la empresa.",
    contextRequired: "Este campo es necesario si seleccionas una opción abierta.",
    fullNameRequired: "Introduce nombre y apellidos.",
    phoneRequired: "El teléfono es obligatorio.",
    selectMarketingGoal: "Selecciona al menos un objetivo de marketing.",
    addSearchContext: "Añade contexto de la búsqueda para valorar el encaje.",
    addMoreSearchContext: "Añade más contexto de la búsqueda (mínimo 20 caracteres).",
    nameRequired: "El nombre es obligatorio.",
    messageRequired: "El mensaje es obligatorio.",
    addMessageContext: "Añade un poco más de contexto en el mensaje.",
    success: "Formulario enviado correctamente.",
    sendError:
      "No se pudo enviar ahora mismo. Si prefieres, escríbeme por LinkedIn mientras lo reviso.",
  };
}

export async function POST(request: NextRequest) {
  const requestLocale = getLocaleFromRequest(request);
  const requestCopy = getCopy(requestLocale);
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = getClientIp(forwardedFor);

  const rateKey = `lead:${ip}`;
  const rateResult = consumeRateLimit(rateKey, RATE_LIMIT.max, RATE_LIMIT.windowMs);

  if (!rateResult.allowed) {
    return NextResponse.json(
      {
        message: requestCopy.rateLimited,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateResult.retryAfter),
        },
      }
    );
  }

  let payload: IncomingFormBody;

  try {
    payload = (await request.json()) as IncomingFormBody;
  } catch {
    return NextResponse.json({ message: requestCopy.invalidRequest }, { status: 400 });
  }

  const locale = getLocaleFromRequest(request, payload);
  const copy = getCopy(locale);

  const formId = asString(payload.formId) || "contact";
  const honeypot = asString(payload.honeypot);

  if (honeypot) {
    return NextResponse.json({ message: copy.received }, { status: 200 });
  }

  const values = sanitizeValues(payload.values);
  const email = asString(values.email);
  const fullName = asString(values.fullName) || asString(values.firstName);
  const lastName = asString(values.lastName);
  const phone = asString(values.phone);
  const message = asString(values.message);
  const selectedGoals = asString(values.selectedGoals) || asString(values.primaryGoal);
  const selectedGoalLabels =
    asString(values.selectedGoalLabels) || asString(values.primaryGoalLabels) || selectedGoals;
  const marketingGoals = asString(values.marketingGoals);
  const marketingGoalsOther = asString(values.marketingGoalsOther);
  const comments = asString(values.comments);
  const company = asString(values.company);
  const roleType = asString(values.roleType);
  const roleLabel = asString(values.roleLabel) || roleType;
  const decisionTiming = asString(values.decisionTiming);
  const decisionTimingLabel = asString(values.decisionTimingLabel) || decisionTiming;
  const requiresContext = asString(values.requiresContext) === "true";
  const teamSize = asString(values.teamSize);
  const source = asString(values.source);
  const page = asString(values.page);
  const formVersion = asString(values.formVersion);
  const timestamp = new Date().toISOString();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ message: copy.invalidEmail }, { status: 400 });
  }

  if (fullName && hasSuspiciousName(fullName)) {
    return NextResponse.json({ message: copy.invalidFirstName }, { status: 400 });
  }

  if (lastName && hasSuspiciousName(lastName)) {
    return NextResponse.json({ message: copy.invalidLastName }, { status: 400 });
  }

  if (phone && !isValidPhone(phone)) {
    return NextResponse.json({ message: copy.invalidPhoneWithPrefix }, { status: 400 });
  }

  if (isMultistepV3(formId)) {
    if (!selectedGoals) {
      return NextResponse.json({ message: copy.selectGoal }, { status: 400 });
    }

    if (!decisionTiming) {
      return NextResponse.json({ message: copy.selectTiming }, { status: 400 });
    }

    if (!roleType) {
      return NextResponse.json({ message: copy.selectRole }, { status: 400 });
    }

    if (isValidEmail(email) && isGenericEmailDomain(email) && !company) {
      return NextResponse.json({ message: copy.companyRequired }, { status: 400 });
    }

    if (requiresContext && !comments) {
      return NextResponse.json({ message: copy.contextRequired }, { status: 400 });
    }

    if (requiresContext && comments.length < 20) {
      return NextResponse.json({ message: copy.contextRequired }, { status: 400 });
    }

    if (!fullName) {
      return NextResponse.json({ message: copy.fullNameRequired }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ message: copy.phoneRequired }, { status: 400 });
    }
  }

  if (isMultistepLegacy(formId)) {
    if (!marketingGoals) {
      return NextResponse.json({ message: copy.selectMarketingGoal }, { status: 400 });
    }

    if (!decisionTiming) {
      return NextResponse.json({ message: copy.selectTiming }, { status: 400 });
    }

    if (!roleType) {
      return NextResponse.json({ message: copy.selectRole }, { status: 400 });
    }

    if (isValidEmail(email) && isGenericEmailDomain(email) && !company) {
      return NextResponse.json({ message: copy.companyRequired }, { status: 400 });
    }

    if (isHeadhunter(roleType) && !comments) {
      return NextResponse.json({ message: copy.addSearchContext }, { status: 400 });
    }

    if (isHeadhunter(roleType) && comments.length < 20) {
      return NextResponse.json({ message: copy.addMoreSearchContext }, { status: 400 });
    }

    if (!fullName) {
      return NextResponse.json({ message: copy.nameRequired }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ message: copy.phoneRequired }, { status: 400 });
    }
  }

  if (requiresLegacyMessage(formId) && !message) {
    return NextResponse.json({ message: copy.messageRequired }, { status: 400 });
  }

  if (requiresLegacyMessage(formId) && message.length < 12) {
    return NextResponse.json({ message: copy.addMessageContext }, { status: 400 });
  }

  const isV3 = isMultistepV3(formId);
  const isLegacyMultistep = isMultistepLegacy(formId);
  const rows = buildPayloadList(values);
  const htmlRows = buildSectionRows(rows);

  const legacyContextRows = buildSectionRows([
    { key: "Nombre", value: fullName },
    { key: "Email", value: email },
    { key: "Rol", value: roleType },
    { key: "Empresa", value: company },
  ]);

  const legacyObjectiveRows = buildSectionRows([
    { key: "Objetivos de marketing", value: marketingGoals },
    { key: "Otro objetivo", value: marketingGoalsOther },
    { key: "Tamaño del equipo", value: teamSize },
  ]);

  const legacyTimingRows = buildSectionRows([{ key: "Timing de decisión", value: decisionTiming }]);
  const v3RoleRows = buildSectionRows([
    { key: "Rol", value: roleLabel },
    { key: "Tipo de rol", value: roleType },
  ]);
  const v3ObjectiveRows = buildSectionRows([
    { key: "Selección / necesidad", value: selectedGoalLabels },
    { key: "Valores técnicos", value: selectedGoals },
  ]);
  const v3TimingRows = buildSectionRows([{ key: "Timing de decisión", value: decisionTimingLabel }]);
  const v3CommentsRows = buildSectionRows([{ key: "Comentarios / contexto", value: comments }]);
  const v3ContactRows = buildSectionRows([
    { key: "Nombre", value: fullName },
    { key: "Email", value: email },
    { key: "Empresa", value: company },
    { key: "Teléfono", value: phone },
  ]);

  const challengeRows = buildSectionRows([{ key: "Comentarios de contexto", value: comments }]);

  const additionalRows = buildSectionRows([{ key: "Teléfono", value: phone }]);

  const metadataRows = buildSectionRows([
    { key: "Origen", value: source },
    { key: "Página", value: page },
    { key: "Fecha", value: timestamp },
    { key: "Versión", value: formVersion },
    { key: "Form ID", value: formId },
  ]);

  const legacyTextSections = [
    "Contexto de contacto",
    [
      `Nombre: ${fullName || "-"}`,
      `Email: ${email || "-"}`,
      `Rol: ${roleType || "-"}`,
      `Empresa: ${company || "-"}`,
    ].join("\n"),
    "",
    "Objetivos de marketing",
    [
      `Objetivos: ${marketingGoals || "-"}`,
      `Otro objetivo: ${marketingGoalsOther || "-"}`,
      `Tamaño del equipo: ${teamSize || "-"}`,
    ].join("\n"),
    "",
    "Timing de decisión",
    `Timing: ${decisionTiming || "-"}`,
    "",
    "Comentarios de contexto",
    comments || "-",
    "",
    "Datos adicionales",
    [`Teléfono: ${phone || "-"}`].join("\n"),
    "",
    "Metadata técnica",
    [`Origen: ${source || "-"}`, `Página: ${page || "-"}`, `Fecha: ${timestamp}`, `Form ID: ${formId}`].join(
      "\n"
    ),
  ].join("\n");

  const v3TextSections = [
    "Rol",
    roleLabel || roleType || "-",
    "",
    "Selección / necesidad",
    selectedGoalLabels || "-",
    "",
    "Timing",
    decisionTimingLabel || "-",
    "",
    "Comentarios / contexto",
    comments || "-",
    "",
    "Datos de contacto",
    [
      `Nombre: ${fullName || "-"}`,
      `Email: ${email || "-"}`,
      `Empresa: ${company || "-"}`,
      `Teléfono: ${phone || "-"}`,
    ].join("\n"),
    "",
    "Metadata técnica",
    [
      `Origen: ${source || "-"}`,
      `Página: ${page || "-"}`,
      `Fecha: ${timestamp}`,
      `Versión: ${formVersion || "-"}`,
      `Form ID: ${formId}`,
    ].join(
      "\n"
    ),
  ].join("\n");

  try {
    const emailText = isV3
      ? v3TextSections
      : isLegacyMultistep
        ? legacyTextSections
        : rows.map((row) => `${row.key}: ${row.value}`).join("\n");

    const emailHtml = isV3
      ? `
          <div style="font-family:Arial,sans-serif;color:#0f253d;">
            <h2 style="margin-bottom:12px;">Nueva conversación de encaje</h2>
            ${renderSection("Rol", v3RoleRows)}
            ${renderSection("Selección / necesidad", v3ObjectiveRows)}
            ${renderSection("Timing", v3TimingRows)}
            ${renderSection("Comentarios / contexto", v3CommentsRows)}
            ${renderSection("Datos de contacto", v3ContactRows)}
            ${renderSection("Metadata técnica", metadataRows)}
          </div>
        `
      : isLegacyMultistep
        ? `
          <div style="font-family:Arial,sans-serif;color:#0f253d;">
            <h2 style="margin-bottom:12px;">Nueva conversación de encaje</h2>
            ${renderSection("Contexto de contacto", legacyContextRows)}
            ${renderSection("Objetivos de marketing", legacyObjectiveRows)}
            ${renderSection("Timing de decisión", legacyTimingRows)}
            ${renderSection("Comentarios de contexto", challengeRows)}
            ${renderSection("Datos adicionales", additionalRows)}
            ${renderSection("Metadata técnica", metadataRows)}
          </div>
        `
        : `
          <div style="font-family:Arial,sans-serif;color:#0f253d;">
            <h2 style="margin-bottom:12px;">Nuevo envío (${escapeHtml(formId)})</h2>
            <table style="border-collapse:collapse;width:100%;">${htmlRows}</table>
          </div>
        `;

    await sendResendEmail({
      subject: getSubject(formId, values),
      replyTo: email,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json({ message: copy.success }, { status: 200 });
  } catch (error) {
    // Keep technical details out of end-user responses.
    // eslint-disable-next-line no-console
    console.error("[api/lead] resend send failed", error);
    return NextResponse.json(
      {
        message: copy.sendError,
      },
      { status: 500 }
    );
  }
}

function isHeadhunter(roleType: string): boolean {
  return roleType === "Talent / Headhunter";
}
