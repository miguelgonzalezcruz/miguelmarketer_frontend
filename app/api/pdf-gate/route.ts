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

const RATE_LIMIT = {
  max: 10,
  windowMs: 10 * 60 * 1000,
};

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = getClientIp(forwardedFor);
  const rateResult = consumeRateLimit(`pdf_gate:${ip}`, RATE_LIMIT.max, RATE_LIMIT.windowMs);

  if (!rateResult.allowed) {
    return NextResponse.json(
      {
        message: "Demasiados intentos. Espera unos minutos para volver a intentarlo.",
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

  const honeypot = asString(payload.honeypot);

  if (honeypot) {
    return NextResponse.json(
      {
        message: "Recibido.",
        downloadUrl: siteData.resources.leadMagnet.downloadUrl,
      },
      { status: 200 }
    );
  }

  const values = sanitizeValues(payload.values);
  const email = asString(values.email);

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ message: "Introduce un email válido." }, { status: 400 });
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
        message: "PDF desbloqueado.",
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
            : "No se pudo procesar la solicitud de PDF.",
      },
      { status: 500 }
    );
  }
}
