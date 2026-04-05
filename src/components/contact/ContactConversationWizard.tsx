"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isGenericEmailDomain } from "@/src/lib/contactEmail";
import { trackEvent } from "@/src/lib/tracking";
import type { Locale } from "@/src/lib/i18n";

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
  locale: Locale;
}

const FORM_ID = "contact_multistep_v5";
const FORM_VERSION = "v5";
const STORAGE_KEY = "contact_conversation_wizard_v5";
const STEP_COUNT = 4;

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

function getWizardDictionary(locale: Locale) {
  if (locale === "en") {
    return {
      contextRequiredMessage:
        "You selected an open option. Add a bit of context so I can respond with more precision.",
      roleOptions: [
        { value: "headhunter", label: "Recruiter / Headhunter", icon: "user-search" },
        { value: "ceo_founder", label: "CEO / Founder", icon: "compass" },
        { value: "people_talent_hr", label: "People / Talent / HR", icon: "users" },
        { value: "other_profile", label: "Other profile", icon: "ellipsis" },
      ] as RoleOption[],
      timingOptions: [
        { label: "Immediate", value: "immediate_0_30" },
        { label: "1-3 months", value: "one_to_three_months" },
        { label: "3-6 months", value: "three_to_six_months" },
        { label: "Exploratory / later", value: "exploratory_later" },
      ] as OptionItem[],
      roleFlowConfig: {
        headhunter: {
          stepTwoTitle: "Search type and timing",
          stepTwoQuestion: "What kind of role are you assessing?",
          timingQuestion: "What is the decision timeline?",
          goalMode: "multi",
          goalHint: "You can select more than one option.",
          goals: [
            { label: "Marketing Director / Head of Marketing", value: "marketing_director_head_of_marketing" },
            { label: "CMO", value: "cmo" },
            { label: "Hybrid profile (marketing + growth / digital)", value: "hybrid_marketing_growth_digital" },
            { label: "Other", value: "other", requiresComment: true },
          ],
          stepThreeTitle: "Search context and contact details",
          stepThreePlaceholder:
            "Company type, scope of the role, stage of the process and the profile you are looking for.",
        },
        ceo_founder: {
          stepTwoTitle: "Priority and timing",
          stepTwoQuestion: "What do you need marketing to solve right now?",
          timingQuestion: "What is your decision horizon?",
          goalMode: "multi",
          goalHint: "You can select more than one option.",
          goals: [
            { label: "Positioning and value proposition", value: "positioning_value_proposition" },
            { label: "More qualified demand", value: "more_qualified_demand" },
            { label: "Align marketing with sales", value: "marketing_sales_alignment" },
            { label: "Other", value: "other", requiresComment: true },
          ],
          stepThreeTitle: "Contact details and business context",
          stepThreePlaceholder:
            "Business goals, starting point, main friction points and the kind of leadership you are considering.",
        },
        people_talent_hr: {
          stepTwoTitle: "Need and timing",
          stepTwoQuestion: "What do you need to strengthen in this search?",
          timingQuestion: "What is the expected timeline?",
          goalMode: "multi",
          goalHint: "You can select more than one option.",
          goals: [
            { label: "Positioning and value proposition", value: "positioning_value_proposition" },
            { label: "More qualified demand", value: "more_qualified_demand" },
            { label: "Marketing leadership", value: "marketing_leadership" },
            { label: "Other", value: "other", requiresComment: true },
          ],
          stepThreeTitle: "Search context and contact details",
          stepThreePlaceholder:
            "Team context, role scope, area challenges and the level of leadership you need to hire or strengthen.",
        },
        other_profile: {
          stepTwoTitle: "Reason for contact and timing",
          stepTwoQuestion: "What would you like to discuss?",
          timingQuestion: "What timeline are you working with?",
          goalMode: "multi",
          goalHint: "You can select more than one option.",
          goals: [
            { label: "Assess fit for a role", value: "assess_role_fit" },
            { label: "Share an opportunity", value: "share_opportunity" },
            { label: "Explore collaboration", value: "explore_collaboration" },
            { label: "Other", value: "other", requiresComment: true },
          ],
          stepThreeTitle: "Context and contact details",
          stepThreePlaceholder: "Briefly share the context and what you would like to explore.",
        },
      } as Record<RoleType, RoleFlowConfig>,
      stepOneQuestion: "Select your profile so I can tailor my response",
      fullNameLabel: "Full name",
      fullNamePlaceholder: "Your full name",
      emailLabel: "Work email",
      phoneLabel: "Phone",
      companyLabel: "Company",
      companyPlaceholder: "Company",
      companyHint:
        "If you use a generic email address, I need the company name to understand the context better.",
      additionalContext: "Additional context",
      back: "Back",
      continue: "Continue",
      send: "Send",
      sending: "Sending...",
      successTitle: "Message sent",
      successTime: "Typical response time: under 24 business hours.",
      submitAnother: "Send another request",
      stepOf: "Step",
      processRoleAria: "Role in the process",
      chooseOption: "Select an option to continue.",
      chooseOneOption: "Select at least one option to continue.",
      chooseTiming: "Select the timing to continue.",
      addFullName: "Enter your full name.",
      minChars: "Enter at least 2 characters.",
      invalidName: "The name does not look valid.",
      emailRequired: "Email is required.",
      invalidEmail: "Enter a valid email address.",
      companyRequired: "Enter the company name.",
      phoneRequired: "Phone is required.",
      invalidPhone: "Enter a valid phone number.",
      successMessage: "Request sent. I will reply with a clear assessment and next steps.",
      sendError:
        "The form could not be submitted right now. If you prefer, message me on LinkedIn while I review it.",
      openRole:
        "Choose your profile",
      headhunterStep2: "Define the type of search",
      founderStep2: "Clarify the main priority",
      talentStep2: "Define the search need",
      otherStep2: "Summarize the main reason",
      founderStep3: "Set the decision horizon",
      headhunterStep3: "Set the decision timeline",
      talentStep3: "Set the expected timing",
      otherStep3: "Set the timing horizon",
      founderStep4: "Share the business context and your details",
      searchStep4: "Share the search context and your details",
      genericStep4: "Share the context and your details",
    };
  }

  return {
    contextRequiredMessage:
      "Has marcado una opción abierta. Añade algo de contexto para que pueda responderte con más precisión.",
    roleOptions: [
      { value: "headhunter", label: "Headhunter", icon: "user-search" },
      { value: "ceo_founder", label: "CEO / Founder", icon: "compass" },
      { value: "people_talent_hr", label: "People / Talent / HR", icon: "users" },
      { value: "other_profile", label: "Otro perfil", icon: "ellipsis" },
    ] as RoleOption[],
    timingOptions: [
      { label: "Inmediato", value: "immediate_0_30" },
      { label: "1–3 meses", value: "one_to_three_months" },
      { label: "3–6 meses", value: "three_to_six_months" },
      { label: "Exploratorio / más adelante", value: "exploratory_later" },
    ] as OptionItem[],
    roleFlowConfig: {
      headhunter: {
        stepTwoTitle: "Tipo de búsqueda y timing",
        stepTwoQuestion: "¿Qué tipo de rol estáis valorando?",
        timingQuestion: "¿Cuál es el timing de decisión?",
        goalMode: "multi",
        goalHint: "Puedes marcar más de una opción.",
        goals: [
          { label: "Marketing Director / Head of Marketing", value: "marketing_director_head_of_marketing" },
          { label: "CMO", value: "cmo" },
          { label: "Perfil híbrido (marketing + growth / digital)", value: "hybrid_marketing_growth_digital" },
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
        goalMode: "multi",
        goalHint: "Puedes marcar más de una opción.",
        goals: [
          { label: "Valorar encaje para un rol", value: "assess_role_fit" },
          { label: "Compartir una oportunidad", value: "share_opportunity" },
          { label: "Explorar colaboración", value: "explore_collaboration" },
          { label: "Otro", value: "other", requiresComment: true },
        ],
        stepThreeTitle: "Contexto y datos de contacto",
        stepThreePlaceholder: "Cuéntame brevemente el contexto y qué te gustaría explorar.",
      },
    } as Record<RoleType, RoleFlowConfig>,
    stepOneQuestion: "Selecciona tu perfil para personalizar mi respuesta",
    fullNameLabel: "Nombre y apellidos",
    fullNamePlaceholder: "Tu nombre y apellidos",
    emailLabel: "Email de trabajo",
    phoneLabel: "Teléfono",
    companyLabel: "Empresa",
    companyPlaceholder: "Empresa",
    companyHint:
      "Si usas un email genérico, necesito la empresa para valorar mejor el contexto.",
    additionalContext: "Contexto adicional",
    back: "Volver",
    continue: "Continuar",
    send: "Enviar",
    sending: "Enviando...",
    successTitle: "Mensaje enviado",
    successTime: "Tiempo de respuesta habitual: menos de 24h laborables.",
    submitAnother: "Enviar otra solicitud",
    stepOf: "Paso",
    processRoleAria: "Rol en el proceso",
    chooseOption: "Selecciona una opción para continuar.",
    chooseOneOption: "Selecciona al menos una opción para continuar.",
    chooseTiming: "Selecciona el timing para continuar.",
    addFullName: "Introduce nombre y apellidos.",
    minChars: "Introduce al menos 2 caracteres.",
    invalidName: "El nombre parece no válido.",
    emailRequired: "El email es obligatorio.",
    invalidEmail: "Introduce un email válido.",
    companyRequired: "Indica el nombre de la empresa.",
    phoneRequired: "El teléfono es obligatorio.",
    invalidPhone: "Introduce un teléfono válido.",
    successMessage: "Solicitud enviada. Te responderé con una valoración clara y siguientes pasos.",
    sendError:
      "No se pudo enviar ahora mismo. Si lo prefieres, escríbeme por LinkedIn mientras lo reviso.",
    openRole: "Elige tu perfil",
    headhunterStep2: "Define el tipo de busqueda",
    founderStep2: "Aclara la prioridad principal",
    talentStep2: "Aterriza la necesidad de la busqueda",
    otherStep2: "Resume el motivo principal",
    founderStep3: "Marca el horizonte de decision",
    headhunterStep3: "Define el timing de decision",
    talentStep3: "Marca el timing previsto",
    otherStep3: "Define el horizonte de decision",
    founderStep4: "Comparte el contexto de negocio y tus datos",
    searchStep4: "Comparte el contexto de la busqueda y tus datos",
    genericStep4: "Comparte el contexto y tus datos",
  };
}

function getRoleLabel(roleType: RoleType | "", roleOptions: RoleOption[]): string {
  return roleOptions.find((option) => option.value === roleType)?.label || "";
}

function getLegacyRoleType(value: string): RoleType | "" {
  if (value === "headhunter" || value === "ceo_founder" || value === "people_talent_hr") {
    return value;
  }

  if (value === "other_profile") return value;
  if (value === "Headhunter") return "headhunter";
  if (value === "Recruiter / Headhunter") return "headhunter";
  if (value === "CEO / Founder") return "ceo_founder";
  if (value === "People / HR" || value === "People / Talent / HR") return "people_talent_hr";
  if (value === "Other profile") return "other_profile";
  if (value === "Otro" || value === "Otro perfil") return "other_profile";
  return "";
}

function getStepTopline(
  step: WizardStep,
  roleType: RoleType | "",
  copy: ReturnType<typeof getWizardDictionary>
): string {
  if (step === 1) return copy.openRole;

  if (step === 2) {
    if (roleType === "headhunter") return copy.headhunterStep2;
    if (roleType === "ceo_founder") return copy.founderStep2;
    if (roleType === "people_talent_hr") return copy.talentStep2;
    return copy.otherStep2;
  }

  if (step === 3) {
    if (roleType === "ceo_founder") return copy.founderStep3;
    if (roleType === "headhunter") return copy.headhunterStep3;
    if (roleType === "people_talent_hr") return copy.talentStep3;
    return copy.otherStep3;
  }

  if (roleType === "ceo_founder") return copy.founderStep4;
  if (roleType === "headhunter" || roleType === "people_talent_hr") {
    return copy.searchStep4;
  }
  return copy.genericStep4;
}

function getSafeStep(value: unknown): WizardStep {
  if (value === 2 || value === 3 || value === 4) return value;
  return 1;
}

function getRoleConfig(
  roleType: RoleType | "",
  roleFlowConfig: Record<RoleType, RoleFlowConfig>
): RoleFlowConfig {
  if (roleType && roleFlowConfig[roleType]) {
    return roleFlowConfig[roleType];
  }

  return roleFlowConfig.other_profile;
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
  locale,
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
  const copy = useMemo(() => getWizardDictionary(locale), [locale]);

  const roleConfig = useMemo(
    () => getRoleConfig(formData.roleType, copy.roleFlowConfig),
    [copy.roleFlowConfig, formData.roleType]
  );

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
        roleLabel: getRoleLabel(formDataRef.current.roleType, copy.roleOptions),
        source,
        page: pathname || "/contacto",
      });
    };

    window.addEventListener("pagehide", trackAbandonment);

    return () => {
      window.removeEventListener("pagehide", trackAbandonment);
      trackAbandonment();
    };
  }, [copy.roleOptions, pathname, source]);

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
      roleLabel: getRoleLabel(roleType, copy.roleOptions),
      source,
    });

    if (step === 1) {
      trackEvent("step_1_completed", {
        roleType,
        roleLabel: getRoleLabel(roleType, copy.roleOptions),
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
      roleLabel: getRoleLabel(formData.roleType, copy.roleOptions),
      selectedGoals: nextSelectedGoals,
      selectedGoalLabels: nextLabels,
      source,
    });

  }

  function handleTimingSelect(value: string) {
    markFormStarted();
    setField("decisionTiming", value);

    const timingLabel = copy.timingOptions.find((option) => option.value === value)?.label || value;

    trackEvent("selected_timing", {
      roleType: formData.roleType || "unknown",
      roleLabel: getRoleLabel(formData.roleType, copy.roleOptions),
      decisionTiming: value,
      decisionTimingLabel: timingLabel,
      source,
    });

    if (step === 3) {
      trackEvent("step_3_completed", {
        roleType: formData.roleType,
        roleLabel: getRoleLabel(formData.roleType, copy.roleOptions),
        decisionTiming: value,
        decisionTimingLabel: timingLabel,
        source,
      });
      setStatusMessage("");
      setStep(4);
    }
  }

  function handleStepValidation(targetStep: WizardStep) {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1) {
      if (!formData.roleType) {
        nextErrors.roleType = copy.chooseOption;
      }
    }

    if (targetStep === 2) {
      if (formData.selectedGoals.length === 0) {
        nextErrors.selectedGoals = copy.chooseOneOption;
      }
    }

    if (targetStep === 3) {
      if (!formData.decisionTiming) {
        nextErrors.decisionTiming = copy.chooseTiming;
      }
    }

    if (targetStep === 4) {
      if (requiresContext && formData.comments.trim().length < 20) {
        nextErrors.comments = copy.contextRequiredMessage;
      }

      if (!formData.fullName.trim()) {
        nextErrors.fullName = copy.addFullName;
      } else if (formData.fullName.trim().length < 2) {
        nextErrors.fullName = copy.minChars;
      } else if (isSuspiciousName(formData.fullName)) {
        nextErrors.fullName = copy.invalidName;
      }

      if (!formData.email.trim()) {
        nextErrors.email = copy.emailRequired;
      } else if (!hasValidEmail) {
        nextErrors.email = copy.invalidEmail;
      }

      if (showCompanyField && !formData.company.trim()) {
        nextErrors.company = copy.companyRequired;
      }

      if (!formData.phone.trim()) {
        nextErrors.phone = copy.phoneRequired;
      } else if (!isValidPhone(formData.phone)) {
        nextErrors.phone = copy.invalidPhone;
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
      copy.timingOptions.find((option) => option.value === formData.decisionTiming)?.label ||
      formData.decisionTiming;

    setSubmitStatus("submitting");
    setStatusMessage("");

    trackEvent("form_submitted", {
      roleType: formData.roleType || "unknown",
      roleLabel: getRoleLabel(formData.roleType, copy.roleOptions),
      source,
      formVersion: FORM_VERSION,
    });

    const payload = trimPayload({
      roleType: formData.roleType,
      roleLabel: getRoleLabel(formData.roleType, copy.roleOptions),
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
      locale,
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
            copy.sendError
        );
      }

      submittedRef.current = true;
      setSubmitStatus("success");
      setStatusMessage(copy.successMessage);

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : copy.sendError;

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
        roleLabel: getRoleLabel(formData.roleType, copy.roleOptions),
        source,
      });
      setStep(2);
      return;
    }

    if (step === 2) {
      trackEvent("step_2_completed", {
        roleType: formData.roleType,
        roleLabel: getRoleLabel(formData.roleType, copy.roleOptions),
        selectedGoals: formData.selectedGoals,
        selectedGoalLabels: selectedGoalOptions.map((goal) => goal.label),
        source,
      });
      setStep(3);
      return;
    }

    trackEvent("step_4_completed", {
      roleType: formData.roleType,
      roleLabel: getRoleLabel(formData.roleType, copy.roleOptions),
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
        <h3>{copy.successTitle}</h3>
        <p>{statusMessage}</p>
        <p className="contact-wizard__response-time">{copy.successTime}</p>
        <button type="button" className="btn btn--secondary" onClick={restartWizard}>
          {copy.submitAnother}
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
        title={getStepTopline(step, formData.roleType, copy)}
        progress={(step / STEP_COUNT) * 100}
        stepOfLabel={copy.stepOf}
      />

      {step === 1 ? (
        <section className="contact-wizard__step" aria-labelledby="contact-step-1-title">
          <h3 id="contact-step-1-title">{copy.stepOneQuestion}</h3>
          <RoleSelectorCards
            options={copy.roleOptions}
            selected={formData.roleType}
            onSelect={handleRoleSelect}
            describedBy={errors.roleType ? "contact-role-error" : undefined}
            ariaLabel={copy.processRoleAria}
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
              options={copy.timingOptions}
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
                  <label htmlFor="contact-full-name">{copy.fullNameLabel}</label>
                  <input
                    id="contact-full-name"
                    name="fullName"
                    type="text"
                    placeholder={copy.fullNamePlaceholder}
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
                  <label htmlFor="contact-email">{copy.emailLabel}</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder={locale === "en" ? "name@company.com" : "nombre@empresa.com"}
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
                  <label htmlFor="contact-phone">{copy.phoneLabel}</label>
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
                    <label htmlFor="contact-company">{copy.companyLabel}</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder={copy.companyPlaceholder}
                      value={formData.company}
                      onChange={(event) => setField("company", event.target.value)}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={
                        errors.company ? "contact-company-error" : "contact-company-hint"
                      }
                      autoComplete="organization"
                    />
                    <p className="form-field__hint" id="contact-company-hint">
                      {copy.companyHint}
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
                {copy.additionalContext}
              </label>
              {requiresContext ? (
                <p className="contact-wizard__context-alert" aria-live="polite">
                  {copy.contextRequiredMessage}
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
              {copy.back}
            </button>
          ) : (
            <span />
          )}
          {step === 2 || step === 4 ? (
            <button
              type="submit"
              className="btn btn--primary contact-wizard__cta"
              disabled={!isCurrentStepReady || submitStatus === "submitting"}
            >
              {step === 2 ? copy.continue : submitStatus === "submitting" ? copy.sending : copy.send}
            </button>
          ) : (
            <span />
          )}
        </div>
      )}
    </form>
  );
}

interface WizardStepHeaderProps {
  step: WizardStep;
  title: string;
  progress: number;
  stepOfLabel: string;
}

function WizardStepHeader({ step, title, progress, stepOfLabel }: WizardStepHeaderProps) {
  return (
    <header className="contact-wizard__header">
      <div className="contact-wizard__step-topline">
        <span className="contact-wizard__step-icon" aria-hidden="true">
          <WizardIcon kind={`step-${step}`} />
        </span>
        <p>{`${stepOfLabel} ${step} / ${STEP_COUNT} · ${title}`}</p>
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
  ariaLabel: string;
}

function RoleSelectorCards({
  options,
  selected,
  onSelect,
  describedBy,
  ariaLabel,
}: RoleSelectorCardsProps) {
  return (
    <div
      className="role-selector"
      role="radiogroup"
      aria-label={ariaLabel}
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
