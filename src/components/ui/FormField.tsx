import React from "react";
import type { FormFieldSchema } from "@/src/types/forms";

interface FormFieldProps {
  field: FormFieldSchema;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

export function FormField({ field, value, error, onChange }: FormFieldProps) {
  const placeholder = field.placeholder || field.label;

  const commonProps = {
    id: field.id,
    name: field.name,
    required: field.required,
    value,
    "aria-label": field.label,
    "aria-invalid": Boolean(error),
    onChange: (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => onChange(field.name, event.target.value),
  };

  return (
    <div className="form-field">
      <label className="visually-hidden" htmlFor={field.id}>
        {field.label}
      </label>

      {field.type === "textarea" ? (
        <textarea {...commonProps} placeholder={placeholder} rows={4} />
      ) : null}

      {field.type === "select" ? (
        <select {...commonProps}>
          {field.options?.map((option) => (
            <option key={option.value || option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {field.type === "text" || field.type === "email" || field.type === "tel" ? (
        <input
          {...commonProps}
          type={field.type}
          placeholder={placeholder}
          autoComplete={field.type === "email" ? "email" : "on"}
        />
      ) : null}

      {error ? <p className="form-field__error">{error}</p> : null}
      {field.hint ? <p className="form-field__hint">{field.hint}</p> : null}
    </div>
  );
}
