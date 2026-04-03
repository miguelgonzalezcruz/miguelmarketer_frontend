"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isGenericEmailDomain } from "@/src/lib/contactEmail";
import { trackEvent } from "@/src/lib/tracking";

type RoleType = "headhunter" | "ceo_founder" | "people_talent_hr" | "other_profile";
type WizardStep = 1 | 2 | 3 | 4;
type SubmitStatus = "idle" | "submitting" | "success" | "error";
type GoalMode = "single" | "multi";

interface OptionItem {
  label: string;
  value: string;
  requiresComment?: boolean;
}

interface RoleOption {
  value: RoleType;
  label: string;
  icon: "user-search" | "compass" | "users" | "ellipsis";
}

interface RoleFlowConfig {
  stepTwoTitle: string;
  stepTwoQuestion: string;
  timingQuestion: string;
  goalMode: GoalMode;
  goalHint?: string;
  goals: OptionItem[];
  stepThreeTitle: string;
  stepThreePlaceholder: string;
}

interface ContactWizardFormData {
  roleType: RoleType | "";
  selectedGoals: string[];
  decisionTiming: string;
  comments: string;
  fullName: string;
  email: string;
  company: string;
  phone: string;
}

interface ContactConversationWizardProps {
  source?: string;
}

const FORM_ID = "contact_multistep_v5";
const FORM_VERSION = "v5";
const STORAGE_KEY = "contact_conversation_wizard_v5";
const STEP_COUNT = 4;
const CONTEXT_REQUIRED_MESSAGE =
  "Has marcado una opción abierta. Añade algo de contexto para que pueda responderte con más precisión.";

const ROLE_OPTIONS: RoleOption[] = [
  {
    value: "headhunter",
    label: "Headhunter",
    icon: "user-search",
  },
  {
    value: "ceo_founder",
    label: "CEO / Founder",
    icon: "compass",
  },
  {
    value: "people_talent_hr",
    label: "People / Talent / HR",
    icon: "users",
  },
  {
    value: "other_profile",
    label: "Otro perfil",
    icon: "ellipsis",
  },
];

const TIMING_OPTIONS: OptionItem[] = [
  { label: "Inmediato", value: "immediate_0_30" },
  { label: "1–3 meses", value: "one_to_three_months" },
  { label: "3–6 meses", value: "three_to_six_months" },
  { label: "Exploratorio / más adelante", value: "exploratory_later" },
];

const ROLE_FLOW_CONFIG: Record<RoleType, RoleFlowConfig> = {
  headhunter: {
    stepTwoTitle: "Tipo de búsqueda y timing",
    stepTwoQuestion: "¿Qué tipo de rol estáis valorando?",
    timingQuestion: "¿Cuál es el timing de decisión?",
    goalMode: "single",
    goals: [
      {
        label: "Marketing Director / Head of Marketing",
        value: "marketing_director_head_of_marketing",
      },
      { label: "CMO", value: "cmo" },
      {
        label: "Perfil híbrido (marketing + growth / digital)",
        value: "hybrid_marketing_growth_digital",
      },
      { label: "Otro", value: "other", requiresComment: true },
    ],
    stepThreeTitle: "Contexto de la búsqueda y datos de contacto",
    stepThreePlaceholder:
      "Tipo de compañía, alcance del rol, momento del proceso y perfil que estáis buscando.",
  },
  ceo_founder: {
    stepTwoTitle: "Objetivo y timing",
    stepTwoQuestion: "¿Qué necesitas resolver ahora desde marketing?",
    timingQuestion: "¿Cuál es vuestro horizonte de decisión?",
    goalMode: "multi",
    goalHint: "Puedes marcar más de una opción.",
    goals: [
      { label: "Posicionamiento y propuesta de valor", value: "positioning_value_proposition" },
      { label: "Más demanda cualificada", value: "more_qualified_demand" },
      { label: "Alinear marketing con ventas", value: "marketing_sales_alignment" },
      { label: "Otro", value: "other", requiresComment: true },
    ],
    stepThreeTitle: "Datos de contacto y contexto",
    stepThreePlaceholder:
      "Objetivos de negocio, punto de partida, principales fricciones y tipo de liderazgo que estáis valorando.",
  },
  people_talent_hr: {
    stepTwoTitle: "Necesidad y timing",
    stepTwoQuestion: "¿Qué necesitáis reforzar en esta búsqueda?",
    timingQuestion: "¿Cuál es el timing previsto?",
    goalMode: "multi",
    goalHint: "Puedes marcar más de una opción.",
    goals: [
      { label: "Posicionamiento y propuesta de valor", value: "positioning_value_proposition" },
      { label: "Más demanda cualificada", value: "more_qualified_demand" },
      { label: "Liderazgo de marketing", value: "marketing_leadership" },
      { label: "Otro", value: "other", requiresComment: true },
    ],
    stepThreeTitle: "Contexto de la búsqueda y datos de contacto",
    stepThreePlaceholder:
      "Contexto del equipo, alcance de la posición, retos del área y nivel de liderazgo que necesitáis incorporar o reforzar.",
  },
  other_profile: {
    stepTwoTitle: "Motivo de contacto y timing",
    stepTwoQuestion: "¿Qué te gustaría plantearme?",
    timingQuestion: "¿En qué horizonte lo estás moviendo?",
    goalMode: "single",
    goals: [
      { label: "Valorar encaje para un rol", value: "assess_role_fit" },
      { label: "Compartir una oportunidad", value: "share_opportunity" },
      { label: "Explorar colaboración", value: "explore_collaboration" },
      { label: "Otro", value: "other", requiresComment: true },
    ],
    stepThreeTitle: "Contexto y datos de contacto",
    stepThreePlaceholder: "Cuéntame brevemente el contexto y qué te gustaría explorar.",
  },
};

const INITIAL_FORM_DATA: ContactWizardFormData = {
  roleType: "",
  selectedGoals: [],
  decisionTiming: "",
  comments: "",
  fullName: "",
  email: "",
  company: "",
  phone: "",
};

function getRoleLabel(roleType: RoleType | ""): string {
  return ROLE_OPTIONS.find((option) => option.value === roleType)?.label || "";
}

function getLegacyRoleType(value: string): RoleType | "" {
  if (value === "headhunter" || value === "ceo_founder" || value === "people_talent_hr") {
    return value;
  }

  if (value === "other_profile") return value;
  if (value === "Headhunter") return "headhunter";
  if (value === "CEO / Founder") return "ceo_founder";
  if (value === "People / HR" || value === "People / Talent / HR") return "people_talent_hr";
  if (value === "Otro" || value === "Otro perfil") return "other_profile";
  return "";
}

function getStepTopline(step: WizardStep, roleType: RoleType | ""): string {
  if (step === 1) return "Elige tu perfil";

  if (step === 2) {
    if (roleType === "headhunter") return "Define el tipo de busqueda";
    if (roleType === "ceo_founder") return "Aclara la prioridad principal";
    if (roleType === "people_talent_hr") return "Aterriza la necesidad de la busqueda";
    return "Resume el motivo principal";
  }

  if (step === 3) {
    if (roleType === "ceo_founder") return "Marca el horizonte de decision";
    if (roleType === "headhunter") return "Define el timing de decision";
    if (roleType === "people_talent_hr") return "Marca el timing previsto";
    return "Define el horizonte de decision";
  }

  if (roleType === "ceo_founder") return "Comparte el contexto de negocio y tus datos";
  if (roleType === "headhunter" || roleType === "people_talent_hr") {
    return "Comparte el contexto de la busqueda y tus datos";
  }
  return "Comparte el contexto y tus datos";
}

function getSafeStep(value: unknown): WizardStep {
  if (value === 2 || value === 3 || value === 4) return value;
  return 1;
}

function getRoleConfig(roleType: RoleType | ""): RoleFlowConfig {
  if (roleType && ROLE_FLOW_CONFIG[roleType]) {
    return ROLE_FLOW_CONFIG[roleType];
  }

  return ROLE_FLOW_CONFIG.other_profile;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
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

function getStoredFormData(value: unknown): ContactWizardFormData {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return INITIAL_FORM_DATA;
  }

  const candidate = value as Partial<ContactWizardFormData> & {
    primaryGoal?: unknown;
    firstName?: unknown;
  };
  const roleCandidate = typeof candidate.roleType === "string" ? candidate.roleType : "";
  const roleType = getLegacyRoleType(roleCandidate);
  const selectedGoals = Array.isArray(candidate.selectedGoals)
    ? candidate.selectedGoals.filter((item): item is string => typeof item === "string")
    : Array.isArray(candidate.primaryGoal)
      ? candidate.primaryGoal.filter((item): item is string => typeof item === "string")
      : [];

  return {
    roleType,
    selectedGoals,
    decisionTiming: typeof candidate.decisionTiming === "string" ? candidate.decisionTiming : "",
    comments: typeof candidate.comments === "string" ? candidate.comments : "",
    fullName:
      typeof candidate.fullName === "string"
        ? candidate.fullName
        : typeof candidate.firstName === "string"
          ? candidate.firstName
          : "",
    email: typeof candidate.email === "string" ? candidate.email : "",
    company: typeof candidate.company === "string" ? candidate.company : "",
    phone: typeof candidate.phone === "string" ? candidate.phone : "",
  };
}

function trimPayload(values: Record<string, unknown>) {
  const trimmed: Record<string, unknown> = {};

  Object.entries(values).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        trimmed[key] = value;
      }
      return;
    }

    if (typeof value === "string") {
      const normalized = value.trim();
      if (normalized) {
        trimmed[key] = normalized;
      }
      return;
    }

    if (typeof value === "boolean") {
      trimmed[key] = value;
    }
  });

  return trimmed;
}

export function ContactConversationWizard({
  source = "website_contact_multistep_v5",
}: ContactConversationWizardProps) {
  const pathname = usePathname();
  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const abandonmentTrackedRef = useRef(false);
  const stepRef = useRef<WizardStep>(1);
  const formDataRef = useRef<ContactWizardFormData>(INITIAL_FORM_DATA);

  const [step, setStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<ContactWizardFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const roleConfig = useMemo(() => getRoleConfig(formData.roleType), [formData.roleType]);

  const selectedGoalOptions = useMemo(
    () => roleConfig.goals.filter((goal) => formData.selectedGoals.includes(goal.value)),
    [formData.selectedGoals, roleConfig.goals]
  );

  const requiresContext = useMemo(
    () => selectedGoalOptions.some((goal) => goal.requiresComment),
    [selectedGoalOptions]
  );

  const hasValidEmail = useMemo(() => isValidEmail(formData.email), [formData.email]);

  const showCompanyField = useMemo(
    () => hasValidEmail && isGenericEmailDomain(formData.email),
    [formData.email, hasValidEmail]
  );

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as {
        step?: unknown;
        formData?: unknown;
      };

      setStep(getSafeStep(parsed.step));
      setFormData(getStoredFormData(parsed.formData));
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (submitStatus === "success") return;

    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        step,
        formData,
      })
    );
  }, [formData, step, submitStatus]);

  useEffect(() => {
    if (showCompanyField || !formData.company) return;

    setFormData((current) => ({
      ...current,
      company: "",
    }));
  }, [formData.company, showCompanyField]);

  useEffect(() => {
    if (showCompanyField || !errors.company) return;

    setErrors((current) => {
      const { company: _discarded, ...rest } = current;
      return rest;
    });
  }, [errors.company, showCompanyField]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const trackAbandonment = () => {
      if (!startedRef.current || submittedRef.current || abandonmentTrackedRef.current) return;

      abandonmentTrackedRef.current = true;
      trackEvent("abandonment_by_step", {
        step: stepRef.current,
        roleType: formDataRef.current.roleType || "unknown",
        roleLabel: getRoleLabel(formDataRef.current.roleType),
        source,
        page: pathname || "/contacto",
      });
    };

    window.addEventListener("pagehide", trackAbandonment);

    return () => {
      window.removeEventListener("pagehide", trackAbandonment);
      trackAbandonment();
    };
  }, [pathname, source]);

  function markFormStarted() {
    if (startedRef.current) return;

    startedRef.current = true;
    trackEvent("form_started", {
      source,
      page: pathname || "/contacto",
      formVersion: FORM_VERSION,
    });
  }

  function setField<K extends keyof ContactWizardFormData>(name: K, value: ContactWizardFormData[K]) {
    markFormStarted();

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name]) return current;
      const { [name]: _discarded, ...rest } = current;
      return rest;
    });
  }

  function handleRoleSelect(roleType: RoleType) {
    markFormStarted();

    setFormData((current) => ({
      ...current,
      roleType,
      selectedGoals: [],
      decisionTiming: "",
      comments: "",
    }));
    setErrors((current) => {
      const {
        roleType: _roleError,
        selectedGoals: _goalError,
        decisionTiming: _timingError,
        comments: _commentError,
        ...rest
      } = current;
      return rest;
    });

    trackEvent("selected_role_type", {
      roleType,
      roleLabel: getRoleLabel(roleType),
      source,
    });

    if (step === 1) {
      trackEvent("step_1_completed", {
        roleType,
        roleLabel: getRoleLabel(roleType),
        source,
      });
      setStep(2);
    }
  }

  function handleGoalSelect(value: string) {
    markFormStarted();

    const nextSelectedGoals =
      roleConfig.goalMode === "single"
        ? [value]
        : formData.selectedGoals.includes(value)
          ? formData.selectedGoals.filter((item) => item !== value)
          : [...formData.selectedGoals, value];

    setFormData((current) => ({
      ...current,
      selectedGoals: nextSelectedGoals,
    }));

    setErrors((current) => {
      const { selectedGoals: _goalError, comments: _commentsError, ...rest } = current;
      return rest;
    });

    const nextLabels = roleConfig.goals
      .filter((goal) => nextSelectedGoals.includes(goal.value))
      .map((goal) => goal.label);

    trackEvent("selected_goals", {
      roleType: formData.roleType || "unknown",
      roleLabel: getRoleLabel(formData.roleType),
      selectedGoals: nextSelectedGoals,
      selectedGoalLabels: nextLabels,
      source,
    });
  }

  function handleTimingSelect(value: string) {
    markFormStarted();
    setField("decisionTiming", value);

    const timingLabel = TIMING_OPTIONS.find((option) => option.value === value)?.label || value;

    trackEvent("selected_timing", {
      roleType: formData.roleType || "unknown",
      roleLabel: getRoleLabel(formData.roleType),
      decisionTiming: value,
      decisionTimingLabel: timingLabel,
      source,
    });
  }

  function handleStepValidation(targetStep: WizardStep) {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1) {
      if (!formData.roleType) {
        nextErrors.roleType = "Selecciona una opción para continuar.";
      }
    }

    if (targetStep === 2) {
      if (formData.selectedGoals.length === 0) {
        nextErrors.selectedGoals = "Selecciona al menos una opción para continuar.";
      }
    }

    if (targetStep === 3) {
      if (!formData.decisionTiming) {
        nextErrors.decisionTiming = "Selecciona el timing para continuar.";
      }
    }

    if (targetStep === 4) {
      if (requiresContext && formData.comments.trim().length < 20) {
        nextErrors.comments = CONTEXT_REQUIRED_MESSAGE;
      }

      if (!formData.fullName.trim()) {
        nextErrors.fullName = "Introduce nombre y apellidos.";
      } else if (formData.fullName.trim().length < 2) {
        nextErrors.fullName = "Introduce al menos 2 caracteres.";
      } else if (isSuspiciousName(formData.fullName)) {
        nextErrors.fullName = "El nombre parece no válido.";
      }

      if (!formData.email.trim()) {
        nextErrors.email = "El email es obligatorio.";
      } else if (!hasValidEmail) {
        nextErrors.email = "Introduce un email válido.";
      }

      if (showCompanyField && !formData.company.trim()) {
        nextErrors.company = "Indica el nombre de la empresa.";
      }

      if (!formData.phone.trim()) {
        nextErrors.phone = "El teléfono es obligatorio.";
      } else if (!isValidPhone(formData.phone)) {
        nextErrors.phone = "Introduce un teléfono válido.";
      }
    }

    return nextErrors;
  }

  const isCurrentStepReady = useMemo(() => {
    if (step === 1) {
      return Boolean(formData.roleType);
    }

    if (step === 2) {
      return formData.selectedGoals.length > 0;
    }

    if (step === 3) {
      return Boolean(formData.decisionTiming);
    }

    return (
      (!requiresContext || formData.comments.trim().length >= 20) &&
      Boolean(formData.fullName.trim()) &&
      Boolean(formData.email.trim()) &&
      Boolean(formData.phone.trim()) &&
      (!showCompanyField || Boolean(formData.company.trim()))
    );
  }, [
    formData.comments,
    formData.company,
    formData.decisionTiming,
    formData.email,
    formData.fullName,
    formData.phone,
    formData.roleType,
    formData.selectedGoals.length,
    requiresContext,
    showCompanyField,
    step,
  ]);

  async function submitForm() {
    const validationErrors = handleStepValidation(4);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const selectedTiming =
      TIMING_OPTIONS.find((option) => option.value === formData.decisionTiming)?.label ||
      formData.decisionTiming;

    setSubmitStatus("submitting");
    setStatusMessage("");

    trackEvent("form_submitted", {
      roleType: formData.roleType || "unknown",
      roleLabel: getRoleLabel(formData.roleType),
      source,
      formVersion: FORM_VERSION,
    });

    const payload = trimPayload({
      roleType: formData.roleType,
      roleLabel: getRoleLabel(formData.roleType),
      selectedGoals: formData.selectedGoals,
      selectedGoalLabels: selectedGoalOptions.map((goal) => goal.label),
      decisionTiming: formData.decisionTiming,
      decisionTimingLabel: selectedTiming,
      requiresContext,
      comments: formData.comments,
      fullName: formData.fullName,
      email: formData.email,
      company: showCompanyField ? formData.company : "",
      phone: formData.phone,
      source,
      page: pathname || "/contacto",
      formVersion: FORM_VERSION,
    });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          formId: FORM_ID,
          values: payload,
          honeypot: "",
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        throw new Error(
          result.message ||
            "No se pudo enviar ahora mismo. Si lo prefieres, escríbeme por LinkedIn mientras lo reviso."
        );
      }

      submittedRef.current = true;
      setSubmitStatus("success");
      setStatusMessage("Solicitud enviada. Te responderé con una valoración clara y siguientes pasos.");

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo enviar ahora mismo. Si lo prefieres, escríbeme por LinkedIn mientras lo reviso.";

      setSubmitStatus("error");
      setStatusMessage(message);
    }
  }

  function handleBack() {
    setErrors({});
    setStatusMessage("");
    setSubmitStatus("idle");
    setStep((current) => (current > 1 ? ((current - 1) as WizardStep) : current));
  }

  function handleContinue() {
    const validationErrors = handleStepValidation(step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatusMessage("");

    if (step === 1) {
      trackEvent("step_1_completed", {
        roleType: formData.roleType,
        roleLabel: getRoleLabel(formData.roleType),
        source,
      });
      setStep(2);
      return;
    }

    if (step === 2) {
      trackEvent("step_2_completed", {
        roleType: formData.roleType,
        roleLabel: getRoleLabel(formData.roleType),
        selectedGoals: formData.selectedGoals,
        selectedGoalLabels: selectedGoalOptions.map((goal) => goal.label),
        source,
      });
      setStep(3);
      return;
    }

    if (step === 3) {
      trackEvent("step_3_completed", {
        roleType: formData.roleType,
        roleLabel: getRoleLabel(formData.roleType),
        decisionTiming: formData.decisionTiming,
        decisionTimingLabel:
          TIMING_OPTIONS.find((option) => option.value === formData.decisionTiming)?.label ||
          formData.decisionTiming,
        source,
      });
      setStep(4);
      return;
    }

    trackEvent("step_4_completed", {
      roleType: formData.roleType,
      roleLabel: getRoleLabel(formData.roleType),
      requiresContext,
      hasComments: Boolean(formData.comments.trim()),
      source,
    });
    void submitForm();
  }

  function restartWizard() {
    submittedRef.current = false;
    abandonmentTrackedRef.current = false;
    startedRef.current = false;
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setStatusMessage("");
    setSubmitStatus("idle");
    setStep(1);

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="contact-wizard contact-wizard--success" aria-live="polite">
        <span className="contact-wizard__success-icon" aria-hidden="true">
          <WizardIcon kind="success" />
        </span>
        <h3>Mensaje enviado</h3>
        <p>{statusMessage}</p>
        <p className="contact-wizard__response-time">
          Tiempo de respuesta habitual: menos de 24h laborables.
        </p>
        <button type="button" className="btn btn--secondary" onClick={restartWizard}>
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-wizard"
      onSubmit={(event) => {
        event.preventDefault();
        handleContinue();
      }}
      onFocusCapture={markFormStarted}
      noValidate
    >
      <input
        className="contact-wizard__honeypot"
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
      />

      <WizardStepHeader
        step={step}
        title={getStepTopline(step, formData.roleType)}
        progress={(step / STEP_COUNT) * 100}
      />

      {step === 1 ? (
        <section className="contact-wizard__step" aria-labelledby="contact-step-1-title">
          <h3 id="contact-step-1-title">¿Cuál es tu papel en este proceso?</h3>
          <RoleSelectorCards
            options={ROLE_OPTIONS}
            selected={formData.roleType}
            onSelect={handleRoleSelect}
            describedBy={errors.roleType ? "contact-role-error" : undefined}
          />
          {errors.roleType ? (
            <p className="form-field__error" id="contact-role-error" role="alert">
              {errors.roleType}
            </p>
          ) : null}
        </section>
      ) : null}

      {step === 2 ? (
        <section className="contact-wizard__step" aria-labelledby="contact-step-2-title">
          <h3 id="contact-step-2-title">{roleConfig.stepTwoQuestion}</h3>

          <div className="contact-wizard__field-wrap">
            {roleConfig.goalHint ? (
              <p className="contact-wizard__field-hint">{roleConfig.goalHint}</p>
            ) : null}
            {roleConfig.goalMode === "single" ? (
              <ChoiceChipsSingle
                options={roleConfig.goals}
                selectedValue={formData.selectedGoals[0] || ""}
                onSelect={handleGoalSelect}
                ariaLabel={roleConfig.stepTwoQuestion}
                variant="tiles"
              />
            ) : (
              <ChoiceChipsMulti
                options={roleConfig.goals}
                selectedValues={formData.selectedGoals}
                onToggle={handleGoalSelect}
                ariaLabel={roleConfig.stepTwoQuestion}
                variant="tiles"
              />
            )}
            {errors.selectedGoals ? (
              <p className="form-field__error" role="alert">
                {errors.selectedGoals}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="contact-wizard__step" aria-labelledby="contact-step-3-title">
          <h3 id="contact-step-3-title">{roleConfig.timingQuestion}</h3>

          <div className="contact-wizard__field-wrap">
            <ChoiceChipsSingle
              options={TIMING_OPTIONS}
              selectedValue={formData.decisionTiming}
              onSelect={handleTimingSelect}
              ariaLabel={roleConfig.timingQuestion}
              variant="tiles"
            />
            {errors.decisionTiming ? (
              <p className="form-field__error" role="alert">
                {errors.decisionTiming}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {step === 4 ? (
        <section className="contact-wizard__step" aria-labelledby="contact-step-4-title">
          <h3 id="contact-step-4-title">{roleConfig.stepThreeTitle}</h3>

          <div className="contact-wizard__context-group">
            <div className="contact-wizard__contact-box">
              <div className="contact-wizard__grid contact-wizard__grid--contact">
                <div className="form-field">
                  <label htmlFor="contact-full-name">Nombre y apellidos</label>
                  <input
                    id="contact-full-name"
                    name="fullName"
                    type="text"
                    placeholder="Tu nombre y apellidos"
                    value={formData.fullName}
                    onChange={(event) => setField("fullName", event.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "contact-full-name-error" : undefined}
                    autoComplete="name"
                  />
                  {errors.fullName ? (
                    <p className="form-field__error" id="contact-full-name-error" role="alert">
                      {errors.fullName}
                    </p>
                  ) : null}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">Email de trabajo</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="nombre@empresa.com"
                    value={formData.email}
                    onChange={(event) => setField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    autoComplete="email"
                  />
                  {errors.email ? (
                    <p className="form-field__error" id="contact-email-error" role="alert">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-phone">Teléfono</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+34 ..."
                    value={formData.phone}
                    onChange={(event) => setField("phone", event.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    autoComplete="tel"
                  />
                  {errors.phone ? (
                    <p className="form-field__error" id="contact-phone-error" role="alert">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                {showCompanyField ? (
                  <div className="form-field form-field--company">
                    <label htmlFor="contact-company">Empresa</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Empresa"
                      value={formData.company}
                      onChange={(event) => setField("company", event.target.value)}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={
                        errors.company ? "contact-company-error" : "contact-company-hint"
                      }
                      autoComplete="organization"
                    />
                    <p className="form-field__hint" id="contact-company-hint">
                      Si usas un email genérico, necesito la empresa para valorar mejor el contexto.
                    </p>
                    {errors.company ? (
                      <p className="form-field__error" id="contact-company-error" role="alert">
                        {errors.company}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="contact-wizard__field-wrap">
              <label className="contact-wizard__field-label" htmlFor="contact-comments">
                Contexto adicional
              </label>
              {requiresContext ? (
                <p className="contact-wizard__context-alert" aria-live="polite">
                  {CONTEXT_REQUIRED_MESSAGE}
                </p>
              ) : null}
              <div className="form-field">
                <textarea
                  id="contact-comments"
                  name="comments"
                  placeholder={roleConfig.stepThreePlaceholder}
                  value={formData.comments}
                  onChange={(event) => setField("comments", event.target.value)}
                  rows={5}
                  aria-invalid={Boolean(errors.comments)}
                  aria-describedby={errors.comments ? "contact-comments-error" : undefined}
                />
                {errors.comments ? (
                  <p className="form-field__error" id="contact-comments-error" role="alert">
                    {errors.comments}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {statusMessage && submitStatus === "error" ? (
        <p className="contact-wizard__status-error" role="alert" aria-live="assertive">
          {statusMessage}
        </p>
      ) : null}

      {step === 1 ? null : (
        <div className="contact-wizard__nav">
          {step > 1 ? (
            <button type="button" className="btn btn--secondary" onClick={handleBack}>
              Volver
            </button>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="btn btn--primary contact-wizard__cta"
            disabled={!isCurrentStepReady || submitStatus === "submitting"}
          >
            {step < 4 ? "Continuar" : submitStatus === "submitting" ? "Enviando..." : "Enviar"}
          </button>
        </div>
      )}
    </form>
  );
}

interface WizardStepHeaderProps {
  step: WizardStep;
  title: string;
  progress: number;
}

function WizardStepHeader({ step, title, progress }: WizardStepHeaderProps) {
  return (
    <header className="contact-wizard__header">
      <div className="contact-wizard__step-topline">
        <span className="contact-wizard__step-icon" aria-hidden="true">
          <WizardIcon kind={`step-${step}`} />
        </span>
        <p>{`Paso ${step} de ${STEP_COUNT} · ${title}`}</p>
      </div>
      <div className="contact-wizard__progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}

interface RoleSelectorCardsProps {
  options: RoleOption[];
  selected: RoleType | "";
  onSelect: (value: RoleType) => void;
  describedBy?: string;
}

function RoleSelectorCards({
  options,
  selected,
  onSelect,
  describedBy,
}: RoleSelectorCardsProps) {
  return (
    <div
      className="role-selector"
      role="radiogroup"
      aria-label="Rol en el proceso"
      aria-describedby={describedBy}
    >
      {options.map((option) => {
        const isActive = selected === option.value;

        return (
          <button
            type="button"
            key={option.value}
            className={`role-card ${isActive ? "role-card--active" : ""}`.trim()}
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelect(option.value)}
          >
            <span className="role-card__check" aria-hidden="true">
              <SelectionCheck active={isActive} />
            </span>
            <span className="role-card__icon" aria-hidden="true">
              <WizardIcon kind={option.icon} />
            </span>
            <span className="role-card__text">
              <strong>{option.label}</strong>
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface ChoiceChipsSingleProps {
  options: OptionItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  ariaLabel: string;
  variant?: "chips" | "tiles";
}

function ChoiceChipsSingle({
  options,
  selectedValue,
  onSelect,
  ariaLabel,
  variant = "chips",
}: ChoiceChipsSingleProps) {
  return (
    <div
      className={`choice-chips ${variant === "tiles" ? "choice-chips--tiles" : ""}`.trim()}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = selectedValue === option.value;

        return (
          <button
            type="button"
            key={option.value}
            className={`choice-chip ${variant === "tiles" ? "choice-chip--tile" : ""} ${
              isActive ? "choice-chip--active" : ""
            }`.trim()}
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelect(option.value)}
          >
            <span className="choice-chip__label">{option.label}</span>
            <span className="choice-chip__check" aria-hidden="true">
              <SelectionCheck active={isActive} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface ChoiceChipsMultiProps {
  options: OptionItem[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  ariaLabel: string;
  variant?: "chips" | "tiles";
}

function ChoiceChipsMulti({
  options,
  selectedValues,
  onToggle,
  ariaLabel,
  variant = "chips",
}: ChoiceChipsMultiProps) {
  return (
    <div
      className={`choice-chips ${variant === "tiles" ? "choice-chips--tiles" : ""}`.trim()}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = selectedValues.includes(option.value);

        return (
          <button
            type="button"
            key={option.value}
            className={`choice-chip ${variant === "tiles" ? "choice-chip--tile" : ""} ${
              isActive ? "choice-chip--active" : ""
            }`.trim()}
            aria-pressed={isActive}
            onClick={() => onToggle(option.value)}
          >
            <span className="choice-chip__label">{option.label}</span>
            <span className="choice-chip__check" aria-hidden="true">
              <SelectionCheck active={isActive} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SelectionCheck({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill={active ? "currentColor" : "none"} stroke="currentColor" />
      {active ? <path d="M6.5 10.2 8.8 12.5 13.7 7.6" stroke="#ffffff" /> : null}
    </svg>
  );
}

function WizardIcon({
  kind,
}: {
  kind:
    | "step-1"
    | "step-2"
    | "step-3"
    | "step-4"
    | "user-search"
    | "compass"
    | "users"
    | "ellipsis"
    | "success";
}) {
  if (kind === "step-1") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 13.5a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z" />
        <path d="M4 20c1.8-3.1 4.4-4.7 8-4.7s6.2 1.6 8 4.7" />
      </svg>
    );
  }

  if (kind === "step-2") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M4 17.5h4.2l2.7-6 3.2 4.2L16.8 11H20" />
        <path d="M4 6h16" />
      </svg>
    );
  }

  if (kind === "step-3") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 6.5v5l3 2" />
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      </svg>
    );
  }

  if (kind === "step-4") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M4.5 7.5A2.5 2.5 0 0 1 7 5h10a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 17 19H7a2.5 2.5 0 0 1-2.5-2.5v-9Z" />
        <path d="m7.5 9 4.5 3.5L16.5 9" />
      </svg>
    );
  }

  if (kind === "user-search") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M10.75 13.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
        <path d="M4 19c1.3-2.4 3.4-3.6 6.4-3.6 1.2 0 2.3.2 3.2.6" />
        <path d="m16.4 16.4 3.6 3.6" />
        <path d="M16.8 18.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />
      </svg>
    );
  }

  if (kind === "compass") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="m14.8 9.2-1.8 5.6-5.6 1.8 1.8-5.6 5.6-1.8Z" />
      </svg>
    );
  }

  if (kind === "users") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M9 12.7a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
        <path d="M3.7 19.2c1.3-2.1 3.1-3.2 5.3-3.2s4 1.1 5.3 3.2" />
        <path d="M17.2 11.7a2.7 2.7 0 1 0 0-5.4" />
        <path d="M16.2 16.2c1.5 0 2.9.8 4.1 2.4" />
      </svg>
    );
  }

  if (kind === "ellipsis") {
    return (
      <svg viewBox="0 0 24 24">
        <circle cx="6" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="18" cy="12" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24">
      <path d="m6.5 12 3.2 3.2L17.5 7.5" />
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
    </svg>
  );
}
