export interface ExperimentDetail {
  slug: string;
  category: string;
  status: string;
  publishedAt: string;
  title: string;
  summary: string;
  primaryMetric: {
    value: string;
    label: string;
    note: string;
  };
  problem: string;
  solution: string;
  implementation: string[];
  timeSaved: string;
  impact: string;
  learnings: string[];
  nextSteps: string;
}

export const experiments: ExperimentDetail[] = [
  {
    slug: "formulario-inteligente-ia-cualificacion-comercial",
    category: "IA · Cualificación comercial",
    status: "VALIDADO",
    publishedAt: "Junio 2026",
    title: "Formulario inteligente con IA para cualificar mejor la demanda",
    summary:
      "Un flujo guiado que adapta las preguntas al contexto del prospect y entrega a Sales un diagnóstico inicial enriquecido antes de la primera conversación.",
    primaryMetric: {
      value: "+30%",
      label: "conversión a SQL frente al formulario tradicional",
      note: "Comparativa entre prospects captados mediante ambos recorridos.",
    },
    problem:
      "El formulario de contacto recogía poca información y ofrecía el mismo recorrido para todos los perfiles. Sales tenía que investigar manualmente la empresa, estimar el encaje y preparar el contexto de la primera aproximación.",
    solution:
      "Convertir la captación en un flujo adaptativo: ajustar preguntas y recorrido según el origen de la visita, el perfil y las respuestas del usuario; después, enriquecer el lead con información pública y un informe interno de encaje comercial asistido por IA.",
    implementation: [
      "Formulario guiado con variables relevantes del negocio y de la necesidad comercial.",
      "Ramas de preguntas según perfil, interés, contexto de campaña y señales declaradas.",
      "Diagnóstico inicial de oportunidad a partir de los datos recogidos.",
      "Enriquecimiento con información pública y resumen interno para priorización y handoff a Sales.",
    ],
    timeSaved:
      "Se redujo la investigación manual previa al primer contacto. El equipo recibe ya estructurados el contexto de la cuenta, el origen, la necesidad declarada, las señales de encaje y posibles ángulos para la conversación.",
    impact:
      "Los prospects que completan el formulario guiado con IA convierten a SQL un 30% más que los captados a través del formulario tradicional. La mejora combina más contexto para Sales y una cualificación más alineada con el ICP.",
    learnings: [
      "La IA aporta valor dentro de una lógica de negocio y un ICP bien definidos; no sustituye el criterio comercial.",
      "La personalización debe ser progresiva: mostrar solo las preguntas que aportan decisión evita añadir fricción innecesaria.",
      "El enriquecimiento prepara una mejor conversación, pero la validación final de la oportunidad sigue siendo humana.",
    ],
    nextSteps:
      "Refinar las reglas del recorrido según ICP, origen y comportamiento; conectar el informe con scoring, routing y tareas en Salesforce para que el contexto active la siguiente acción comercial de forma más directa.",
  },
];

export function getExperimentBySlug(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
