export type FieldType = "text" | "email" | "tel" | "textarea" | "select";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldSchema {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[];
  hint?: string;
}

export interface FormStepSchema {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldSchema[];
}

export interface FormSchema {
  id: "contact" | "pdf_gate" | "waitlist";
  endpoint: "/api/lead" | "/api/pdf-gate";
  submitLabel: string;
  successMessage: string;
  steps: FormStepSchema[];
}
