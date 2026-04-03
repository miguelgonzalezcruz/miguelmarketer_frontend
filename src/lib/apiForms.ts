export interface IncomingFormBody {
  formId?: string;
  values?: Record<string, unknown>;
  honeypot?: string;
}

export function asString(input: unknown): string {
  if (typeof input === "string") {
    return input.trim();
  }

  if (typeof input === "number" || typeof input === "boolean") {
    return String(input);
  }

  return "";
}

export function sanitizeValues(values: Record<string, unknown> | undefined) {
  const sanitized: Record<string, string> = {};

  if (!values) return sanitized;

  Object.entries(values).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      sanitized[key] = value.map((item) => asString(item)).filter(Boolean).join(", ");
      return;
    }

    sanitized[key] = asString(value);
  });

  return sanitized;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function hasSuspiciousName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return false;

  const compact = normalized.replace(/[^a-záéíóúüñ]/gi, "");
  const fakeTokens = new Set([
    "test",
    "prueba",
    "asdf",
    "qwer",
    "admin",
    "nombre",
    "apellido",
    "usuario",
  ]);

  if (fakeTokens.has(compact)) return true;
  if (/(.)\1{3,}/.test(compact)) return true;
  if (/[bcdfghjklmnñpqrstvwxyz]{4,}/i.test(compact)) return true;

  return false;
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+()\-\s]/g, "");
  if (!cleaned) return false;
  if (/[a-z]/i.test(cleaned)) return false;

  const digits = cleaned.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildPayloadList(values: Record<string, string>) {
  return Object.entries(values)
    .filter(([key]) => key !== "website")
    .map(([key, value]) => ({
      key,
      value: value || "(vacío)",
    }));
}
