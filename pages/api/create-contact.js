const RESEND_API_URL = "https://api.resend.com/emails";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildEmailText = ({ firstname, lastname, email, message }) => `
Nuevo contacto desde miguelmarketer.com

Nombre: ${firstname} ${lastname}
Email: ${email}

Mensaje:
${message}
`.trim();

const buildEmailHtml = ({ firstname, lastname, email, message }) => `
  <div style="font-family: Arial, sans-serif; color: #10263d; line-height: 1.5;">
    <h2 style="margin: 0 0 12px;">Nuevo contacto desde miguelmarketer.com</h2>
    <p style="margin: 0 0 8px;"><strong>Nombre:</strong> ${escapeHtml(
      firstname
    )} ${escapeHtml(lastname)}</p>
    <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p style="margin: 0 0 4px;"><strong>Mensaje:</strong></p>
    <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
  </div>
`.trim();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const {
    email: rawEmail = "",
    firstname: rawFirstname = "",
    lastname: rawLastname = "",
    message: rawMessage = "",
    website = "",
  } = req.body || {};

  const email = rawEmail.trim().toLowerCase();
  const firstname = rawFirstname.trim();
  const lastname = rawLastname.trim();
  const message = rawMessage.trim();

  if (website) {
    return res.status(200).json({ message: "OK" });
  }

  if (!email || !firstname || !lastname || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return res.status(500).json({ message: "Email service is not configured" });
  }

  if (!process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    console.error("CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not configured.");
    return res.status(500).json({ message: "Email destination is not configured" });
  }

  try {
    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Nuevo contacto web: ${firstname} ${lastname}`,
        text: buildEmailText({ firstname, lastname, email, message }),
        html: buildEmailHtml({ firstname, lastname, email, message }),
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Resend error:", errorBody);
      return res.status(502).json({ message: "Email delivery failed" });
    }

    return res.status(201).json({ message: "Contact sent successfully" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return res.status(500).json({ message: "Error sending contact email" });
  }
}
