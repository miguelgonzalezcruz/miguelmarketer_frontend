"use client";

import { useMemo, useState } from "react";
import { FormField } from "@/src/components/ui/FormField";
import { trackEvent } from "@/src/lib/tracking";
import type { FormFieldSchema, FormSchema } from "@/src/types/forms";

interface SchemaFormProps {
  schema: FormSchema;
  className?: string;
  hiddenFields?: Record<string, string>;
  onSuccess?: (payload: { downloadUrl?: string }) => void;
}

function initValues(schema: FormSchema, hiddenFields: Record<string, string>) {
  const values: Record<string, string> = { ...hiddenFields };

  schema.steps.forEach((step) => {
    step.fields.forEach((field) => {
      values[field.name] = values[field.name] ?? "";
    });
  });

  values.website = "";

  return values;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSuspiciousName(name: string): boolean {
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

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+()\-\s]/g, "");
  if (!cleaned) return false;
  if (/[a-z]/i.test(cleaned)) return false;

  const digits = cleaned.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function validateFieldValue(
  field: FormFieldSchema,
  rawValue: string,
  values: Record<string, string>
): string {
  const value = rawValue.trim();

  if (field.required && !value) {
    return "Este campo es obligatorio.";
  }

  if (!value) {
    return "";
  }

  if (field.name === "email" && !isValidEmail(value)) {
    return "Introduce un email válido.";
  }

  if ((field.name === "firstName" || field.name === "lastName") && value.length < 2) {
    return "Introduce al menos 2 caracteres.";
  }

  if ((field.name === "firstName" || field.name === "lastName") && isSuspiciousName(value)) {
    return "El valor parece no válido.";
  }

  if (field.name === "phone" && !isValidPhone(value)) {
    return "Introduce un teléfono válido.";
  }

  if (field.name === "message" && values.message?.trim() && values.message.trim().length < 12) {
    return "Añade un poco más de contexto.";
  }

  return "";
}

export function SchemaForm({
  schema,
  className = "",
  hiddenFields = {},
  onSuccess,
}: SchemaFormProps) {
  const allFields = useMemo(() => schema.steps.flatMap((step) => step.fields), [schema.steps]);

  const fieldsByName = useMemo(
    () =>
      allFields.reduce<Record<string, FormFieldSchema>>((acc, field) => {
        acc[field.name] = field;
        return acc;
      }, {}),
    [allFields]
  );

  const requiredFieldNames = useMemo(
    () => allFields.filter((field) => field.required).map((field) => field.name),
    [allFields]
  );

  const [values, setValues] = useState<Record<string, string>>(() =>
    initValues(schema, hiddenFields)
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const isValid =
    requiredFieldNames.every((fieldName) => Boolean(values[fieldName]?.trim())) &&
    Object.values(fieldErrors).every((fieldError) => !fieldError);

  const resetForm = () => {
    setValues(initValues(schema, hiddenFields));
    setFieldErrors({});
  };

  const validateAllFields = (candidateValues: Record<string, string>) => {
    const nextErrors: Record<string, string> = {};

    allFields.forEach((field) => {
      const message = validateFieldValue(field, candidateValues[field.name] || "", candidateValues);
      if (message) {
        nextErrors[field.name] = message;
      }
    });

    return nextErrors;
  };

  const handleChange = (name: string, value: string) => {
    setValues((current) => {
      const updated = { ...current, [name]: value };
      const field = fieldsByName[name];

      if (field) {
        const message = validateFieldValue(field, value, updated);
        setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: message }));
      }

      return updated;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    const nextErrors = validateAllFields(values);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setError("Revisa los campos marcados antes de enviar.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(schema.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          formId: schema.id,
          values,
          honeypot: values.website,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        downloadUrl?: string;
      };

      if (!response.ok) {
        throw new Error(payload.message || "No se pudo enviar el formulario.");
      }

      trackEvent("form_submit", { formId: schema.id });
      setSuccess(true);
      onSuccess?.({ downloadUrl: payload.downloadUrl });
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={`schema-form ${className}`.trim()} onSubmit={handleSubmit} noValidate>
      {schema.steps.map((step) => (
        <fieldset className="schema-form__step" key={step.id}>
          <div className="schema-form__fields">
            {step.fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={values[field.name] || ""}
                error={fieldErrors[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </fieldset>
      ))}

      <input
        className="schema-form__honeypot"
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        value={values.website || ""}
        onChange={(event) =>
          setValues((current) => ({ ...current, website: event.target.value }))
        }
        aria-hidden="true"
      />

      <button className="btn btn--primary" type="submit" disabled={!isValid || submitting}>
        {submitting ? "Enviando..." : schema.submitLabel}
      </button>

      {success ? <p className="schema-form__success">{schema.successMessage}</p> : null}
      {error ? <p className="schema-form__error">{error}</p> : null}
      <p className="schema-form__privacy">
        Solo usaré estos datos para responder a tu solicitud.
      </p>
    </form>
  );
}
