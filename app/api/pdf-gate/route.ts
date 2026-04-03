import { NextRequest, NextResponse } from "next/server";
import { siteData } from "../../../content/siteData";
import { consumeRateLimit, getClientIp } from "../../../src/lib/rateLimit";
import { sendResendEmail } from "../../../src/lib/resend";
import {
  asString,
  buildPayloadList,
  escapeHtml,
  isValidEmail,
  sanitizeValues,
  type IncomingFormBody,
} from "../../../src/lib/apiForms";
import type { Locale } from "../../../src/lib/i18n";

const RATE_LIMIT = {
  max: 10,
  windowMs: 10 * 60 * 1000,
};

function getLocaleFromRequest(request: NextRequest, payload?: IncomingFormBody): Locale {
  const value = asString(payload?.values?.locale);
  if (value === "en") return "en";
  if (value === "es") return "es";

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() || "";
  return acceptLanguage.startsWith("en") || acceptLanguage.includes(",en") ? "en" : "es";
}

function getCopy(locale: Locale) {
  return locale === "en"
    ? {
        tooManyAttempts: "Too many attempts. Please wait a few minutes and try again.",
        invalidRequest: "Invalid request format.",
        received: "Received.",
        invalidEmail: "Enter a valid email address.",
        unlocked: "PDF unlocked.",
        processError: "The PDF request could not be processed.",
      }
    : {
        tooManyAttempts: "Demasiados intentos. Espera unos minutos para volver a intentarlo.",
        invalidRequest: "Formato de petición no válido.",
        received: "Recibido.",
        invalidEmail: "Introduce un email válido.",
        unlocked: "PDF desbloqueado.",
        processError: "No se pudo procesar la solicitud de PDF.",
      };
}

export async function POST(request: NextRequest) {
  const requestLocale = getLocaleFromRequest(request);
  const requestCopy = getCopy(requestLocale);
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = getClientIp(forwardedFor);
  const rateResult = consumeRateLimit(`pdf_gate:${ip}`, RATE_LIMIT.max, RATE_LIMIT.windowMs);

  if (!rateResult.allowed) {
    return NextResponse.json(
      {
        message: requestCopy.tooManyAttempts,
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

  const honeypot = asString(payload.honeypot);

  if (honeypot) {
    return NextResponse.json(
      {
        message: copy.received,
        downloadUrl: siteData.resources.leadMagnet.downloadUrl,
      },
      { status: 200 }
    );
  }

  const values = sanitizeValues(payload.values);
  const email = asString(values.email);

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ message: copy.invalidEmail }, { status: 400 });
  }

  const rows = buildPayloadList(values);

  const htmlRows = rows
    .map(
      (row) =>
        `<tr><td style="padding:6px 10px;border:1px solid #d6dee6;"><strong>${escapeHtml(
          row.key
        )}</strong></td><td style="padding:6px 10px;border:1px solid #d6dee6;">${escapeHtml(
          row.value
        )}</td></tr>`
    )
    .join("");

  try {
    await sendResendEmail({
      subject: "Nuevo lead de descarga de perfil (PDF)",
      replyTo: email,
      text: rows.map((row) => `${row.key}: ${row.value}`).join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f253d;">
          <h2 style="margin-bottom:12px;">Nueva solicitud de PDF</h2>
          <table style="border-collapse:collapse;width:100%;">${htmlRows}</table>
        </div>
      `,
    });

    return NextResponse.json(
      {
        message: copy.unlocked,
        downloadUrl: siteData.resources.leadMagnet.downloadUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : copy.processError,
      },
      { status: 500 }
    );
  }
}
