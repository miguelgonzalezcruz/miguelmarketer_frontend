export type Locale = "es" | "en";

export const LOCALE_COOKIE = "preferred_locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "es" || value === "en";
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : "es";
}

export function getPreferredLocale(headerValue: string | null | undefined): Locale {
  if (!headerValue) return "es";

  const normalized = headerValue.toLowerCase();
  if (normalized.startsWith("en")) return "en";
  if (normalized.includes(",en")) return "en";
  return "es";
}
