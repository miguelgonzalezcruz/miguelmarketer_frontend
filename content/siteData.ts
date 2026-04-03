import type { FormSchema } from "@/src/types/forms";
import type { Locale } from "@/src/lib/i18n";
import { formSchemasEn, siteDataEn } from "@/content/siteData.en";

export const SITE_URL = "https://miguelmarketer.com";

export interface KPI {
  id: string;
  label: string;
  value: string;
  note?: string;
}

export interface CaseDetail {
  slug: string;
  company: string;
  role: string;
  years: string;
  logo?: string;
  tag: string;
  title: string;
  intro: string;
  approach?: string;
  challenge: string;
  actions: string[];
  resultPublic: string;
  ctas: {
    back: string;
    contact: string;
  };
}

export interface CaseSummary {
  slug: string;
  company: string;
  role: string;
  years: string;
  logo?: string;
  tag: string;
  title: string;
  challenge: string;
  approach?: string;
  impact: string;
  description: string;
  buttonLabel: string;
  featuredHome: boolean;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  scope: string;
  highlights: string[];
}

export interface ResourceItem {
  slug: string;
  title: string;
  description: string;
  cta: string;
  downloadUrl?: string;
  status: "ready" | "coming_soon";
}

export interface ThinkingPrinciple {
  title: string;
  description: string;
}

export const siteData = {
  person: {
    fullName: "Miguel Ángel González Cruz",
    displayName: "Miguel González",
    jobTitle: "Marketing Director",
    description:
      "Liderazgo de marketing para compañías que necesitan crecer con criterio en entornos B2B y TravelTech.",
    linkedIn: "https://www.linkedin.com/in/miguelgonzalezcruz/",
    location: "Mallorca, España",
  },
  hero: {
    eyebrow: "Marketing Leadership",
    headline: "Posicionamiento, demanda y crecimiento",
    subheadline:
      "Ayudo a empresas a convertir su propuesta de valor en clientes.",
    bullets: [
      "Primero claridad estratégica: propuesta, segmento y fricciones reales.",
      "Eficiencia sí, sin erosionar experiencia ni valor percibido.",
      "IA para elevar criterio y velocidad, no para empobrecer la relación con el cliente.",
    ],
    microcopy: "15+ años al frente de marketing en entornos internacionales.",
    ctas: {
      primary: {
        label: "Hablemos",
        href: "/contacto",
      },
    },
  },
  thinking: {
    eyebrow: "Cómo trabajo",
    title:
      "Marketing con criterio, foco comercial y entendimiento real del producto",
    description:
      "No entiendo marketing como una suma de canales o campañas. Lo trabajo como una función que conecta propuesta de valor, conocimiento del cliente, experiencia digital, captación y conversión para generar resultados sostenibles.",
    manifesto:
      "Aporto visión estratégica, capacidad de priorización y una forma de trabajar muy conectada a negocio.",
    principles: [
      {
        title: "Marca y demanda no compiten",
        description:
          "No separo posicionamiento y rendimiento. Cuando la propuesta de valor está bien trabajada y conecta con necesidades reales del cliente, la captación mejora, la conversión sube y el crecimiento es más sostenible.",
      },
      {
        title: "Marketing útil para ventas",
        description:
          "Trabajo cerca de ventas para entender objeciones, fricciones y patrones de decisión. Eso permite afinar mensajes, contenidos, journeys y activos comerciales que ayudan a generar demanda y a cerrar mejor.",
      },
      {
        title: "La web también vende",
        description:
          "La web no es solo presencia. Es un activo comercial que debe explicar mejor, guiar mejor y convertir mejor, con una lógica clara de negocio y mejora continua.",
      },
      {
        title: "IA aplicada con criterio",
        description:
          "Uso IA para acelerar análisis, producción y personalización, pero nunca como sustituto del criterio. La tecnología suma cuando mejora la calidad de la decisión y de la ejecución.",
      },
    ] as ThinkingPrinciple[],
    closing:
      "Antes de escalar canales o campañas, necesito entender bien el producto, la propuesta de valor, el cliente y la lógica de compra para alinear marketing con ventas y construir sobre una base sólida.",
  },
  kpisHome: [
    {
      id: "qualified-leads-yoy",
      value: "+100%",
      label: "Leads cualificados YoY",
    },
    {
      id: "onboarding-time",
      value: "-60%",
      label: "Tiempo de onboarding",
    },
    {
      id: "revenue-target",
      value: "+55%",
      label: "Sobre objetivo de ingresos año 1",
    },
    {
      id: "revenue-growth",
      value: "€60M → €200M",
      label: "Escalado de ingresos en 3 años",
    },
  ] as KPI[],
  kpisAll: [
    {
      id: "visit-prospect",
      value: "2%",
      label: "Visitante a prospect cualificado",
    },
    {
      id: "mql-rate",
      value: "85%",
      label: "Tasa media de MQL sobre leads captados",
    },
    {
      id: "sql-rate",
      value: "25%",
      label: "Conversión de MQL a SQL",
    },
    {
      id: "fy-performance",
      value: "x2",
      label: "Rendimiento inbound cualificado vs año previo",
    },
    {
      id: "direct-sales",
      value: "+60%",
      label: "Crecimiento de venta directa web en 24 meses",
    },
    {
      id: "revenue-growth",
      value: "€60M → €200M",
      label: "Escalado de ingresos en 3 años",
    },
    {
      id: "onboarding-time",
      value: "-60%",
      label: "Reducción del tiempo de onboarding",
    },
    {
      id: "new-market",
      value: "€35M",
      label: "Ventas en año uno tras lanzamiento de nuevo mercado",
    },
    {
      id: "revenue-target",
      value: "+55%",
      label: "Sobre objetivo de ingresos en primer año",
    },
    {
      id: "visitor-user",
      value: "3%",
      label: "Visitante a usuario registrado",
    },
    {
      id: "seo-ranking",
      value: "Top 1ª página",
      label: "Posicionamiento en búsquedas locales high-intent en meses",
    },
  ] as KPI[],
  howIHelpModules: [
    {
      id: "positioning-gtm",
      title: "Posicionamiento y go-to-market",
      description:
        "Defino propuesta de valor, narrativa y enfoque comercial para que el producto se entienda mejor, se diferencie con claridad y sea más fácil de vender.",
    },
    {
      id: "demand-pipeline",
      title: "Demanda y pipeline",
      description:
        "Activo demanda combinando posicionamiento, contenido, canales, captación y optimización para generar interés cualificado, mejorar la conversión y reforzar pipeline.",
    },
    {
      id: "website-revenue",
      title: "Web y experiencia digital",
      description:
        "Entiendo la web como un activo comercial: más claridad, mejor experiencia y una estructura pensada para acompañar la decisión y convertir mejor.",
    },
    {
      id: "revops-automation-ai",
      title: "Automatización, datos e IA",
      description:
        "Conecto CRM, automatización, datos e IA para acelerar procesos, mejorar la personalización y reducir fricción a lo largo del ciclo de vida del cliente.",
    },
    {
      id: "leadership-alignment",
      title: "Alineación con ventas",
      description:
        "Trabajo cerca de ventas y producto para que marketing esté alineado con las prioridades del negocio y contribuya mejor al crecimiento.",
    },
  ],
  howIWork: {
    title: "Entender bien. Priorizar mejor. Ejecutar con foco.",
    steps: [
      {
        title: "Entender el punto de partida",
        description:
          "Empiezo por negocio, producto, cliente y proceso comercial. Busco dónde se pierde valor, qué frena la conversión y qué necesita realmente el mercado.",
      },
      {
        title: "Elegir las palancas correctas",
        description:
          "No todo merece prioridad. Defino dónde tiene más sentido intervenir antes: posicionamiento, propuesta de valor, web, captación, automatización o alineación con ventas.",
      },
      {
        title: "Activar y ajustar",
        description:
          "Lanzo iniciativas con una lógica clara de impacto, midiendo lo que importa y ajustando mensajes, canales y experiencia según respuesta del mercado.",
      },
      {
        title: "Convertir avances en sistema",
        description:
          "Lo que funciona no se queda en una acción aislada. Lo convierto en una forma de operar más sólida, con seguimiento, aprendizaje y capacidad de escalar.",
      },
    ],
    cadence: "Cómo trabajo",
  },
  caseDetails: [
    {
      slug: "roiback-inbound-ia-operacion-comercial",
      company: "Roiback",
      role: "Head of Marketing Communications",
      years: "2022 - Hoy",
      logo: "/logos-hero/roiback-part-of-hbx-group-logo.png",
      tag: "HOTELTECH",
      title: "Posicionamiento e inbound cualificado con IA aplicada a la operación comercial",
      intro:
        "Dirección de posicionamiento, web y generación de demanda en entorno B2B internacional, conectando marketing con ventas y producto.",
      approach:
        "Aclarar la propuesta de valor y reducir fricciones en el funnel para escalar en volumen y calidad del lead. Reforzar la conexión entre marketing y ventas con una operativa más sólida de captación, cualificación y seguimiento, apoyada en CRM e IA.",
      challenge:
        "Mejorar la calidad del inbound y su velocidad de cualificación, mientras se refuerza el posicionamiento de marca y se conecta la operativa web con la generación de demanda.",
      actions: [
        "Definición y liderazgo del posicionamiento global y la estrategia de messaging.",
        "Rediseño y gestión end-to-end del website con enfoque CRO.",
        "Implantación de un workflow de cualificación asistida por IA (formulario → research/enrichment → informe → handoff a Salesforce).",
        "Despliegue de campañas multicanal (Paid, SEO, Email), automatización lifecycle y cultura de A/B testing.",
        "Coordinación de squads web y alineación con ventas y producto.",
      ],
      resultPublic:
        "Crecimiento del pipeline de adquisición y cross-selling.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "hotelbeds-growth-automatizacion-cro-global",
      company: "Hotelbeds",
      role: "Global Growth Marketing Manager",
      years: "2018 - 2022",
      logo: "/logos-hero/hotelbeds-part-of-hbx-group-logo.png",
      tag: "TRAVELTECH",
      title: "Crecimiento internacional con automatización y digitalización",
      intro:
        "Liderazgo de growth marketing en un contexto internacional con foco en eficiencia operativa, journeys digitales y crecimiento de venta directa.",
      approach:
        "Estructurar la automatización de procesos globales sin perder contexto local ni calidad de experiencia.",
      challenge:
        "Digitalizar la experiencia, escalar crecimiento y mejorar eficiencia en un entorno global, manteniendo consistencia de marca y engagement en múltiples mercados.",
      actions: [
        "Consolidación global de marca tras adquisición, incluyendo migraciones web y compliance en múltiples mercados.",
        "Optimización de workflows web y content journeys para reducir fricción en onboarding.",
        "Gestión de iniciativas SEO/SEM, analítica web y experimentación CRO para mejorar win rates y venta directa.",
      ],
      resultPublic:
        "Mejora de la eficiencia operativa y reducción de fricciones en procesos digitales clave dentro de un entorno global de alta complejidad.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "rafa-nadal-academy-ecosistema-digital-desde-cero",
      company: "Rafa Nadal Academy",
      role: "Marketing & eCommerce Director",
      years: "2015 - 2018",
      logo: "/logos-hero/RNA-final3.png",
      tag: "CONSUMER BRAND",
      title: "Ecosistema digital desde cero con foco en ingresos",
      intro:
        "Liderazgo de marca, eCommerce y presencia digital para construir una base de crecimiento internacional desde el lanzamiento.",
      approach:
        "Construir un sistema completo de marca, web y booking sobre una base coherente y preparada para escalar.",
      challenge:
        "Crear desde cero la presencia digital de la Academia, alineando posicionamiento, experiencia digital y expansión internacional.",
      actions: [
        "Definición de posicionamiento y tono de voz en canales digitales, on-site y media.",
        "Liderazgo de activaciones de marca en torneos internacionales.",
        "Lanzamiento de website, sistema de booking y flujos eCommerce desde cero.",
        "Gestión de roadmap web, mejoras UX, estrategia de contenidos y SEO multi-idioma.",
      ],
      resultPublic:
        "Base digital sólida para crecer desde el lanzamiento, con impacto en captación, conversión y expansión internacional.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "portblue-rebranding-venta-directa-web",
      company: "PortBlue Hotels",
      role: "Head of Marketing & Communications",
      years: "2014 - 2016",
      logo: "/logos-hero/portblue-hotels-logo.png",
      tag: "HOSPITALITY GROUP",
      title: "Rebranding y evolución digital con foco en venta directa",
      intro:
        "Transformación de marca y activos digitales para reforzar conversión y peso del canal directo.",
      approach:
        "Rebranding y presencia digital, conectando percepción de marca y conversión.",
      challenge:
        "Creación de la nueva marca del grupo y mejora del rendimiento digital con una estrategia más orientada a la venta directa.",
      actions: [
        "Rebranding de la cadena hotelera.",
        "Despliegue de nuevo booking engine con foco en reserva directa.",
        "Gestión end-to-end de webs del grupo (diseño, partners de desarrollo y funnels de conversión).",
        "Optimización UX y CRO de activos digitales.",
      ],
      resultPublic:
        "Refuerzo del posicionamiento, aumento del share de venta directa y mejora de la reputación online.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "low-cost-travel-group-lanzamiento-mercado-35m",
      company: "LowCost Travel",
      role: "Managing Director Southern Europe",
      years: "2011 - 2012",
      logo: "/logos-hero/lowcostholidays-logo.png",
      tag: "TRAVEL GROUP",
      title:
        "Lanzamiento de mercado y funnels locales con crecimiento en año 1",
      intro:
        "Apertura y consolidación de mercado en el sur de Europa con foco en adquisición digital, localización y performance.",
      approach:
        "Localización rápida de webs y funnels de adquisición con coordinación estrecha entre performance, contenido y marca.",
      challenge:
        "Abrir mercado con foco en intención de compra y velocidad de ejecución, en un entorno de expansión internacional.",
      actions: [
        "Lanzamiento de websites locales y funnels de adquisición desde cero.",
        "Gestión de canales digitales y performance web con UX localizada.",
        "Aseguramiento de compliance con guidelines de HQ.",
      ],
      resultPublic:
        "Base comercial y de captación preparada para crecer con consistencia desde el arranque.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "logitravel-escalado-ingresos-web-growth",
      company: "Logitravel",
      role: "Marketing & Communications Director",
      years: "2008 - 2011",
      logo: "/logos-hero/logitravel.svg",
      tag: "OTA",
      title: "Escalado de ingresos con crecimiento web y experimentación",
      intro:
        "Dirección de growth y comunicación en OTA de alto volumen con foco en performance web, CRO y despliegue de nuevas funcionalidades.",
      approach:
        "Impulsar una cultura de experimentación continua y análisis del dato para decidir mejor y acelerar el crecimiento.",
      challenge:
        "Escalar ingresos y rendimiento digital de forma sostenida en un entorno de alto volumen y evolución continua del producto web.",
      actions: [
        "Dirección de la estrategia de crecimiento web.",
        "Implementación de marcos de A/B testing, remarketing y tácticas CRO.",
        "Coordinación de equipos de desarrollo y diseño para nuevos lanzamientos y mejoras site-wide.",
      ],
      resultPublic:
        "Crecimiento sostenido de los ingresos, reducción de costes de adquisición y consolidación del liderazgo de mercado.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "hylovi-mvp-ia-seo-local",
      company: "Hylovi",
      role: "Founder, Developer & Product Owner",
      years: "2025 - Hoy",
      logo: "/logos-hero/hylovi-logo.png",
      tag: "AI PLATFORM",
      title:
        "Plataforma local con IA: MVP funcional, SEO y personalización desde cero",
      intro:
        "Proyecto propio sin ánimo de lucro de descubrimiento musical con IA, construido en React/Next.js y orientado a producto, contenido y crecimiento orgánico.",
      approach:
        "Validar primero la utilidad real del producto y usar IA para impulsar relevancia y personalización.",
      challenge:
        "Construir un MVP útil desde cero, con una base de contenido escalable y un modelo de crecimiento orgánico en un nicho local.",
      actions: [
        "Definición de visión de producto, desarrollo y arquitectura de contenidos.",
        "Implementación de generación de contenido y personalización asistidas por IA.",
        "Ejecución de estrategia SEO para búsquedas locales de alta intención.",
      ],
      resultPublic:
        "Lanzamiento de una beta funcional con base técnica y de contenido preparada para crecer con SEO y personalización.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "sync-rentals-saas-onboarding-lifecycle",
      company: "Sync Rentals",
      role: "Co-founder & CMO",
      years: "2017 - 2021",
      logo: "/logos-hero/sync-rentals-logo.png",
      tag: "SAAS",
      title: "Activación SaaS con foco en onboarding, producto y retención",
      intro:
        "Co-liderazgo de producto y marketing en un channel manager para alquiler vacacional, con foco en activación y retención.",
      approach:
        "Desarrollar una estrategia de contenido escalable para posicionar la marca de forma orgánica y simplificar el onboarding para mejorar la activación y construir un lifecycle más claro.",
      challenge:
        "Traducir el producto a una propuesta de valor clara y ordenar activación, onboarding y retención en un negocio SaaS de nicho.",
      actions: [
        "Definición de roadmap técnico y marketing del producto.",
        "Optimización de flujos de onboarding web.",
        "Gestión de automatización de emails lifecycle para activación y retención.",
      ],
      resultPublic:
        "Adquisición de +6K nuevos usuarios.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "geniuzz-reposicionamiento-marketplace-b2b",
      company: "Geniuzz",
      role: "Executive Director",
      years: "2015 - 2016",
      logo: "/logos-hero/geniuzz-logo.png",
      tag: "B2B MARKETPLACE",
      title: "Reposicionamiento de marketplace con mejora de experiencia",
      intro:
        "Liderazgo de reposicionamiento comercial y digital en marketplace B2B en etapa de transformación.",
      approach:
        "Revisar propuesta de valor, navegación y experiencia para aumentar claridad y rendimiento comercial.",
      challenge:
        "Reordenar propuesta comercial y experiencia digital en una etapa de transformación del negocio.",
      actions: [
        "Rediseño del marketplace y optimización de UX web.",
        "Ajuste de enfoque comercial y marketing.",
      ],
      resultPublic:
        "Mejor comprensión de la oferta y una base digital más útil para reactivar la demanda.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "fitboo-producto-reservas-fitness",
      company: "fitboo",
      role: "Founder",
      years: "2012 - 2014",
      logo: "/case-logos/fitboo.jpeg",
      tag: "STARTUP",
      title: "Plataforma de reservas en fitness: producto e integración",
      intro:
        "Creación de una plataforma de reservas de clases de fitness con foco en producto, integración y adquisición desde fase inicial.",
      approach:
        "Desarrollo de producto con integración al backend de proveedores y foco en experiencia de uso.",
      challenge:
        "Lanzar un producto funcional e integrado para sostener captación y operación desde una fase temprana.",
      actions: [
        "Desarrollo y lanzamiento de plataforma de reservas conectada al backend de proveedores.",
        "Gestión integral del desarrollo de producto y estrategia de CAC.",
      ],
      resultPublic:
        "Adquisición de usuarios y proveedores, e internacionalización desde el primer año.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
    {
      slug: "nebrija-docencia-marketing-aplicado",
      company: "CES Felipe Moreno",
      role: "Marketing Lecturer",
      years: "2024 - 2025",
      logo: "/case-logos/ces-felipe-moreno.jpeg",
      tag: "EDUCACIÓN",
      title: "Docencia en marketing",
      intro:
        "Experiencia docente conectando estrategia de marketing con casos reales de ejecución y toma de decisiones.",
      approach:
        "Formación en principios y fundamentos de marketing.",
      challenge:
        "Traducir marcos de marketing y ejecución digital a decisiones aplicables en negocio real.",
      actions: [
        "Docencia en marketing y estrategia digital.",
        "Mentorización en growth tactics, funnel design y fundamentos de gestión de producto web.",
      ],
      resultPublic:
        "Transferencia práctica de criterio y metodología.",
      ctas: {
        back: "Volver a Experiencia Relevante",
        contact: "Contacta para descubrir los resultados",
      },
    },
  ] as CaseDetail[],
  caseSummaries: [
    {
      slug: "roiback-inbound-ia-operacion-comercial",
      company: "Roiback",
      role: "Head of Marketing Communications",
      years: "2022 - Hoy",
      logo: "/logos-hero/roiback-part-of-hbx-group-logo.png",
      tag: "HOTELTECH",
      title: "Posicionamiento e inbound cualificado con IA aplicada a la operación comercial",
      challenge:
        "Mejorar la calidad del inbound y su velocidad de cualificación, mientras se refuerza el posicionamiento de marca y se conecta la operativa web con la generación de demanda.",
      approach:
        "Aclarar la propuesta de valor y reducir fricciones en el funnel para escalar en volumen y calidad del lead. Reforzar la conexión entre marketing y ventas con una operativa más sólida de captación, cualificación y seguimiento, apoyada en CRM e IA.",
      impact:
        "Crecimiento del pipeline de adquisición y cross-selling.",
      description:
        "Crecimiento del pipeline de adquisición y cross-selling.",
      buttonLabel: "Ver caso",
      featuredHome: true,
    },
    {
      slug: "hotelbeds-growth-automatizacion-cro-global",
      company: "Hotelbeds",
      role: "Global Growth Marketing Manager",
      years: "2018 - 2022",
      logo: "/logos-hero/hotelbeds-part-of-hbx-group-logo.png",
      tag: "TRAVELTECH",
      title: "Crecimiento internacional con automatización y digitalización",
      challenge:
        "Digitalizar la experiencia, escalar crecimiento y mejorar eficiencia en un entorno global, manteniendo consistencia de marca y engagement en múltiples mercados.",
      approach:
        "Estructurar la automatización de procesos globales sin perder contexto local ni calidad de experiencia.",
      impact:
        "Reducción de fricción operativa, mejora de la experiencia digital y mayor eficiencia en la captación y conversión.",
      description:
        "Reducción de fricción operativa, mejora de la experiencia digital y mayor eficiencia en la captación y conversión.",
      buttonLabel: "Ver caso",
      featuredHome: false,
    },
    {
      slug: "rafa-nadal-academy-ecosistema-digital-desde-cero",
      company: "Rafa Nadal Academy",
      role: "Marketing & eCommerce Director",
      years: "2015 - 2018",
      logo: "/logos-hero/RNA-final3.png",
      tag: "CONSUMER BRAND",
      title: "Ecosistema digital desde cero con foco en ingresos",
      challenge:
        "Crear desde cero la presencia digital de la Academia, alineando posicionamiento, experiencia digital y expansión internacional.",
      approach:
        "Construir un sistema completo de marca, web y booking sobre una base coherente y preparada para escalar.",
      impact:
        "Base digital sólida para crecer desde el lanzamiento, con impacto en captación, conversión y expansión internacional.",
      description:
        "Base digital sólida para crecer desde el lanzamiento, con impacto en captación, conversión y expansión internacional.",
      buttonLabel: "Ver caso",
      featuredHome: true,
    },
    {
      slug: "portblue-rebranding-venta-directa-web",
      company: "PortBlue Hotels",
      role: "Head of Marketing & Communications",
      years: "2014 - 2016",
      logo: "/logos-hero/portblue-hotels-logo.png",
      tag: "HOSPITALITY GROUP",
      title: "Rebranding y evolución digital con foco en venta directa",
      challenge:
        "Creación de la nueva marca del grupo y mejora del rendimiento digital con una estrategia más orientada a la venta directa.",
      approach:
        "Rebranding y presencia digital, conectando percepción de marca y conversión.",
      impact:
        "Refuerzo del posicionamiento, aumento del share de venta directa y mejora de la reputación online.",
      description:
        "Refuerzo del posicionamiento, aumento del share de venta directa y mejora de la reputación online.",
      buttonLabel: "Ver caso",
      featuredHome: true,
    },
    {
      slug: "low-cost-travel-group-lanzamiento-mercado-35m",
      company: "LowCost Travel",
      role: "Managing Director Southern Europe",
      years: "2011 - 2012",
      logo: "/logos-hero/lowcostholidays-logo.png",
      tag: "TRAVEL GROUP",
      title:
        "Lanzamiento de mercado y funnels locales con crecimiento en año 1",
      challenge:
        "Abrir mercado con foco en intención de compra y velocidad de ejecución, en un entorno de expansión internacional.",
      approach:
        "Localización rápida de webs y funnels de adquisición con coordinación estrecha entre performance, contenido y marca.",
      impact:
        "Base comercial y de captación preparada para crecer con consistencia desde el arranque.",
      description:
        "Base comercial y de captación preparada para crecer con consistencia desde el arranque.",
      buttonLabel: "Ver caso",
      featuredHome: false,
    },
    {
      slug: "logitravel-escalado-ingresos-web-growth",
      company: "Logitravel",
      role: "Marketing & Communications Director",
      years: "2008 - 2011",
      logo: "/logos-hero/logitravel.svg",
      tag: "OTA",
      title: "Escalado de ingresos con crecimiento web y experimentación",
      challenge:
        "Escalar ingresos y rendimiento digital de forma sostenida en un entorno de alto volumen y evolución continua del producto web.",
      approach:
        "Impulsar una cultura de experimentación continua y análisis del dato para decidir mejor y acelerar el crecimiento.",
      impact:
        "Crecimiento sostenido de los ingresos, reducción de costes de adquisición y consolidación del liderazgo de mercado.",
      description:
        "Crecimiento sostenido de los ingresos, reducción de costes de adquisición y consolidación del liderazgo de mercado.",
      buttonLabel: "Ver caso",
      featuredHome: false,
    },
    {
      slug: "hylovi-mvp-ia-seo-local",
      company: "Hylovi",
      role: "Founder, Developer & Product Owner",
      years: "2025 - Hoy",
      logo: "/logos-hero/hylovi-logo.png",
      tag: "AI PLATFORM",
      title: "Plataforma local con IA: MVP funcional, SEO y personalización desde cero",
      challenge:
        "Construir un MVP útil desde cero, con una base de contenido escalable y un modelo de crecimiento orgánico en un nicho local.",
      approach:
        "Validar primero la utilidad real del producto y usar IA para impulsar relevancia y personalización.",
      impact:
        "Lanzamiento de una beta funcional con base técnica y de contenido preparada para crecer con SEO y personalización.",
      description:
        "Lanzamiento de una beta funcional con base técnica y de contenido preparada para crecer con SEO y personalización.",
      buttonLabel: "Ver caso",
      featuredHome: false,
    },
    {
      slug: "sync-rentals-saas-onboarding-lifecycle",
      company: "Sync Rentals",
      role: "Co-founder & CMO",
      years: "2017 - 2021",
      logo: "/logos-hero/sync-rentals-logo.png",
      tag: "SAAS",
      title: "Activación SaaS con foco en onboarding, producto y retención",
      challenge:
        "Traducir el producto a una propuesta de valor clara y ordenar activación, onboarding y retención en un negocio SaaS de nicho.",
      approach:
        "Desarrollar una estrategia de contenido escalable para posicionar la marca de forma orgánica y simplificar el onboarding para mejorar la activación y construir un lifecycle más claro.",
      impact:
        "Adquisición de +6K nuevos usuarios.",
      description:
        "Adquisición de +6K nuevos usuarios.",
      buttonLabel: "Ver caso",
      featuredHome: false,
    },
    {
      slug: "geniuzz-reposicionamiento-marketplace-b2b",
      company: "Geniuzz",
      role: "Executive Director",
      years: "2015 - 2016",
      logo: "/logos-hero/geniuzz-logo.png",
      tag: "B2B MARKETPLACE",
      title: "Reposicionamiento de marketplace con mejora de experiencia",
      challenge:
        "Reordenar propuesta comercial y experiencia digital en una etapa de transformación del negocio.",
      approach:
        "Revisar propuesta de valor, navegación y experiencia para aumentar claridad y rendimiento comercial.",
      impact:
        "Mejor comprensión de la oferta y una base digital más útil para reactivar la demanda.",
      description:
        "Mejor comprensión de la oferta y una base digital más útil para reactivar la demanda.",
      buttonLabel: "Ver caso",
      featuredHome: false,
    },
    {
      slug: "fitboo-producto-reservas-fitness",
      company: "fitboo",
      role: "Founder",
      years: "2012 - 2014",
      logo: "/case-logos/fitboo.jpeg",
      tag: "STARTUP",
      title: "Plataforma de reservas en fitness: producto e integración",
      challenge:
        "Lanzar un producto funcional e integrado para sostener captación y operación desde una fase temprana.",
      approach:
        "Desarrollo de producto con integración al backend de proveedores y foco en experiencia de uso.",
      impact:
        "Adquisición de usuarios y proveedores, e internacionalización desde el primer año.",
      description:
        "Adquisición de usuarios y proveedores, e internacionalización desde el primer año.",
      buttonLabel: "Ver caso",
      featuredHome: false,
    },
    {
      slug: "nebrija-docencia-marketing-aplicado",
      company: "CES Felipe Moreno",
      role: "Marketing Lecturer",
      years: "2024 - 2025",
      logo: "/case-logos/ces-felipe-moreno.jpeg",
      tag: "EDUCACIÓN",
      title: "Docencia en marketing",
      challenge:
        "Traducir marcos de marketing y ejecución digital a decisiones aplicables en negocio real.",
      approach:
        "Formación en principios y fundamentos de marketing.",
      impact:
        "Transferencia práctica de criterio y metodología.",
      description:
        "Transferencia práctica de criterio y metodología.",
      buttonLabel: "Ver caso",
      featuredHome: false,
    },
  ] as CaseSummary[],
  experience: [
    {
      period: "2022 - Actualidad",
      role: "Head of Marketing Communications",
      company: "Roiback (HBX Group)",
      scope:
        "Dirección de posicionamiento global, estrategia web y generación de demanda en entorno B2B internacional con foco en calidad de pipeline.",
      highlights: [
        "Alineación entre marketing, ventas y producto para decidir con un marco común de negocio.",
        "Mejora continua en captación, conversión y reporting ejecutivo sin perder calidad de experiencia.",
      ],
    },
    {
      period: "2018 - 2022",
      role: "Global Growth Marketing Manager",
      company: "Hotelbeds (HBX Group)",
      scope:
        "Liderazgo de growth internacional con automatización y optimización de journeys digitales en múltiples mercados.",
      highlights: [
        "Estructuración de procesos para escalar con consistencia operativa y de marca.",
        "Priorización de mejoras que combinan eficiencia y experiencia de cliente.",
      ],
    },
    {
      period: "2016 - 2018",
      role: "Marketing & eCommerce Director",
      company: "Rafa Nadal Academy by Movistar",
      scope:
        "Construcción del ecosistema digital desde cero y despliegue de marca internacional con foco comercial.",
      highlights: [
        "Definición de arquitectura digital orientada a decisión, conversión y escalabilidad.",
        "Ejecución de roadmap de crecimiento coordinando marca, tecnología y operación.",
      ],
    },
    {
      period: "2014 - 2016",
      role: "Head of Marketing & Communications",
      company: "PortBlue Hotels & Resorts",
      scope:
        "Replanteamiento de marca y evolución de activos digitales con orientación a venta directa rentable.",
      highlights: [
        "Mejora de experiencia digital y consistencia de mensaje en todo el journey.",
        "Priorización de iniciativas de conversión con impacto comercial sostenido.",
      ],
    },
    {
      period: "2015 - 2016",
      role: "Executive Director",
      company: "Geniuzz",
      scope:
        "Liderazgo de reposicionamiento de marketplace B2B en etapa de transformación comercial.",
      highlights: [
        "Ajuste de propuesta comercial y estrategia digital para mejorar elegibilidad.",
        "Ordenación operativa para crecer con más foco y menos fricción interna.",
      ],
    },
    {
      period: "2008 - 2011",
      role: "Marketing & Communications Director",
      company: "Logitravel Group",
      scope:
        "Dirección de growth y comunicación en canal digital de alto volumen y alta velocidad operativa.",
      highlights: [
        "Evolución del modelo comercial digital a escala con enfoque de experimentación.",
        "Instalación de una cultura de mejora continua en performance web.",
      ],
    },
    {
      period: "Paralelo",
      role: "Founder, Developer & Product Owner",
      company: "Hylovi.com",
      scope:
        "Producto propio de descubrimiento musical con IA aplicado a crecimiento orgánico y personalización.",
      highlights: [
        "Visión de producto, desarrollo y arquitectura de contenido con criterio SEO.",
        "Aprendizaje aplicado de IA y automatización orientado a utilidad real para usuario.",
      ],
    },
  ] as ExperienceItem[],
  resources: {
    leadMagnet: {
      slug: "perfil-ejecutivo",
      title: "Perfil ejecutivo de Marketing Leadership",
      description:
        "Resumen estratégico de enfoque, casos y resultados para evaluación de CEOs y headhunters.",
      cta: "Descargar perfil (PDF)",
      downloadUrl: "/resources/perfil-ejecutivo.pdf",
      status: "ready",
    },
    tool: {
      slug: "growth-scorecard-beta",
      title: "Growth Scorecard (beta)",
      description:
        "Herramienta en desarrollo para auditar madurez de marketing, demanda y operación comercial.",
      cta: "Unirme a la lista de espera",
      status: "coming_soon",
    },
  } satisfies { leadMagnet: ResourceItem; tool: ResourceItem },
  music: {
    title: "Off the clock",
    copy: "También soy batería en Carmen Supermarket (pop-rock, Mallorca). La música me recuerda lo mismo que el marketing bien hecho: ritmo, consistencia y equipo.",
    links: [
      { label: "Web oficial", href: "https://www.carmensupermarket.com/" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/carmensupermarket/",
      },
      {
        label: "Spotify",
        href: "https://open.spotify.com/artist/4Ms17M4YF5EZfoUPEUCGny",
      },
    ],
  },
};

export const formSchemas: Record<string, FormSchema> = {
  contact: {
    id: "contact",
    endpoint: "/api/lead",
    submitLabel: "Hablemos",
    successMessage:
      "Mensaje recibido. Te responderé en menos de 24h laborables.",
    steps: [
      {
        id: "contact-main",
        title: "Cuéntame tu contexto",
        description:
          "Comparte la situación actual, objetivos y tipo de liderazgo que estás buscando.",
        fields: [
          {
            id: "email",
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            placeholder: "nombre@empresa.com",
            hint: "Recomendado: correo corporativo para agilizar la respuesta.",
          },
          {
            id: "firstName",
            name: "firstName",
            label: "Nombre",
            type: "text",
            required: false,
            placeholder: "Nombre",
          },
          {
            id: "lastName",
            name: "lastName",
            label: "Apellidos",
            type: "text",
            required: false,
            placeholder: "Apellidos",
          },
          {
            id: "phone",
            name: "phone",
            label: "Teléfono",
            type: "tel",
            required: false,
            placeholder: "Teléfono (opcional)",
          },
          {
            id: "company",
            name: "company",
            label: "Empresa",
            type: "text",
            required: false,
            placeholder: "Nombre de la empresa",
          },
          {
            id: "role",
            name: "role",
            label: "Rol",
            type: "text",
            required: false,
            placeholder: "CEO, Founder, Talent Partner...",
          },
          {
            id: "companySize",
            name: "companySize",
            label: "Tamaño de empresa",
            type: "select",
            required: false,
            options: [
              { label: "Seleccionar", value: "" },
              { label: "1-10", value: "1-10" },
              { label: "11-50", value: "11-50" },
              { label: "51-200", value: "51-200" },
              { label: "201-500", value: "201-500" },
              { label: "500+", value: "500+" },
            ],
          },
          {
            id: "intent",
            name: "intent",
            label: "Qué tipo de ayuda buscas",
            type: "select",
            required: false,
            options: [
              { label: "Seleccionar", value: "" },
              {
                label: "Contratación Marketing Director / Head of Marketing",
                value: "hiring_marketing_lead",
              },
              {
                label: "Evaluación para posición CMO",
                value: "evaluation_cmo",
              },
              {
                label: "Proyecto de transformación de marketing",
                value: "marketing_transformation",
              },
            ],
          },
          {
            id: "message",
            name: "message",
            label: "Mensaje",
            type: "textarea",
            required: true,
            placeholder:
              "Objetivo del rol, retos actuales y timing de decisión.",
          },
        ],
      },
    ],
  },
  pdf_gate: {
    id: "pdf_gate",
    endpoint: "/api/pdf-gate",
    submitLabel: "Desbloquear PDF",
    successMessage: "PDF desbloqueado. Descarga iniciada.",
    steps: [
      {
        id: "pdf-step",
        title: "Descargar perfil ejecutivo",
        description: "Accede al perfil en PDF para revisión interna.",
        fields: [
          {
            id: "email",
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            placeholder: "nombre@empresa.com",
          },
          {
            id: "company",
            name: "company",
            label: "Empresa",
            type: "text",
            required: false,
            placeholder: "Nombre de la empresa",
          },
          {
            id: "role",
            name: "role",
            label: "Rol",
            type: "text",
            required: false,
            placeholder: "CEO, Headhunter, Talent Partner...",
          },
        ],
      },
    ],
  },
  waitlist: {
    id: "waitlist",
    endpoint: "/api/lead",
    submitLabel: "Unirme a la lista",
    successMessage: "Te has unido a la lista de espera de la beta.",
    steps: [
      {
        id: "waitlist-step",
        title: "Growth Scorecard (beta)",
        description:
          "Deja tus datos y te avisaré cuando la herramienta esté disponible.",
        fields: [
          {
            id: "email",
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            placeholder: "nombre@empresa.com",
          },
          {
            id: "company",
            name: "company",
            label: "Empresa",
            type: "text",
            required: false,
            placeholder: "Nombre de la empresa",
          },
          {
            id: "role",
            name: "role",
            label: "Rol",
            type: "text",
            required: false,
            placeholder: "Rol actual",
          },
          {
            id: "message",
            name: "message",
            label: "Qué te gustaría evaluar",
            type: "textarea",
            required: false,
            placeholder:
              "Ejemplo: madurez de pipeline, conversiones, RevOps...",
          },
        ],
      },
    ],
  },
};

export type SiteData = typeof siteData;
export type FormSchemas = typeof formSchemas;

const siteDataByLocale: Record<Locale, SiteData> = {
  es: siteData,
  en: siteDataEn,
};

const formSchemasByLocale: Record<Locale, FormSchemas> = {
  es: formSchemas,
  en: formSchemasEn,
};

export function getSiteData(locale: Locale) {
  return siteDataByLocale[locale];
}

export function getFormSchemas(locale: Locale) {
  return formSchemasByLocale[locale];
}
