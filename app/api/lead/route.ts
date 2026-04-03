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

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = getClientIp(forwardedFor);

  const rateKey = `lead:${ip}`;
  const rateResult = consumeRateLimit(rateKey, RATE_LIMIT.max, RATE_LIMIT.windowMs);

  if (!rateResult.allowed) {
    return NextResponse.json(
      {
        message:
          "Has superado el límite temporal de envíos. Inténtalo de nuevo en unos minutos.",
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
    return NextResponse.json({ message: "Formato de petición no válido." }, { status: 400 });
  }

  const formId = asString(payload.formId) || "contact";
  const honeypot = asString(payload.honeypot);

  if (honeypot) {
    return NextResponse.json({ message: "Recibido." }, { status: 200 });
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
    return NextResponse.json({ message: "Introduce un email válido." }, { status: 400 });
  }

  if (fullName && hasSuspiciousName(fullName)) {
    return NextResponse.json(
      { message: "Revisa el nombre. Parece un valor no válido." },
      { status: 400 }
    );
  }

  if (lastName && hasSuspiciousName(lastName)) {
    return NextResponse.json(
      { message: "Revisa los apellidos. Parece un valor no válido." },
      { status: 400 }
    );
  }

  if (phone && !isValidPhone(phone)) {
    return NextResponse.json(
      { message: "Introduce un teléfono válido, incluyendo prefijo si aplica." },
      { status: 400 }
    );
  }

  if (isMultistepV3(formId)) {
    if (!selectedGoals) {
      return NextResponse.json(
        { message: "Selecciona al menos un objetivo principal." },
        { status: 400 }
      );
    }

    if (!decisionTiming) {
      return NextResponse.json({ message: "Selecciona el timing de decisión." }, { status: 400 });
    }

    if (!roleType) {
      return NextResponse.json({ message: "Selecciona tu rol." }, { status: 400 });
    }

    if (isValidEmail(email) && isGenericEmailDomain(email) && !company) {
      return NextResponse.json({ message: "Indica el nombre de la empresa." }, { status: 400 });
    }

    if (requiresContext && !comments) {
      return NextResponse.json(
        {
          message: "Este campo es necesario si seleccionas una opción abierta.",
        },
        { status: 400 }
      );
    }

    if (requiresContext && comments.length < 20) {
      return NextResponse.json(
        {
          message: "Este campo es necesario si seleccionas una opción abierta.",
        },
        { status: 400 }
      );
    }

    if (!fullName) {
      return NextResponse.json({ message: "Introduce nombre y apellidos." }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ message: "El teléfono es obligatorio." }, { status: 400 });
    }
  }

  if (isMultistepLegacy(formId)) {
    if (!marketingGoals) {
      return NextResponse.json(
        { message: "Selecciona al menos un objetivo de marketing." },
        { status: 400 }
      );
    }

    if (!decisionTiming) {
      return NextResponse.json({ message: "Selecciona el timing de decisión." }, { status: 400 });
    }

    if (!roleType) {
      return NextResponse.json({ message: "Selecciona tu rol." }, { status: 400 });
    }

    if (isValidEmail(email) && isGenericEmailDomain(email) && !company) {
      return NextResponse.json({ message: "Indica el nombre de la empresa." }, { status: 400 });
    }

    if (isHeadhunter(roleType) && !comments) {
      return NextResponse.json(
        { message: "Añade contexto de la búsqueda para valorar el encaje." },
        { status: 400 }
      );
    }

    if (isHeadhunter(roleType) && comments.length < 20) {
      return NextResponse.json(
        { message: "Añade más contexto de la búsqueda (mínimo 20 caracteres)." },
        { status: 400 }
      );
    }

    if (!fullName) {
      return NextResponse.json({ message: "El nombre es obligatorio." }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ message: "El teléfono es obligatorio." }, { status: 400 });
    }
  }

  if (requiresLegacyMessage(formId) && !message) {
    return NextResponse.json({ message: "El mensaje es obligatorio." }, { status: 400 });
  }

  if (requiresLegacyMessage(formId) && message.length < 12) {
    return NextResponse.json(
      { message: "Añade un poco más de contexto en el mensaje." },
      { status: 400 }
    );
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

    return NextResponse.json({ message: "Formulario enviado correctamente." }, { status: 200 });
  } catch (error) {
    // Keep technical details out of end-user responses.
    // eslint-disable-next-line no-console
    console.error("[api/lead] resend send failed", error);
    return NextResponse.json(
      {
        message:
          "No se pudo enviar ahora mismo. Si prefieres, escríbeme por LinkedIn mientras lo reviso.",
      },
      { status: 500 }
    );
  }
}

function isHeadhunter(roleType: string): boolean {
  return roleType === "Talent / Headhunter";
}
