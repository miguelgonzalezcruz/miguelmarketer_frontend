import React from "react";

const corePrinciples = ["Claridad", "Ejecución", "Mejora continua"];

const valuePillars = [
  {
    title: "Estrategia y posicionamiento",
    description:
      "Aterrizo propuesta de valor, narrativa y go-to-market para que marketing y negocio hablen el mismo idioma.",
  },
  {
    title: "Demanda y crecimiento",
    description:
      "Combino SEO, paid, lifecycle y CRO para generar pipeline y ventas con calidad, no solo volumen.",
  },
  {
    title: "Web y producto digital",
    description:
      "Trato la web como un activo comercial vivo: estructura, UX, contenido y optimización constante para convertir mejor.",
  },
  {
    title: "Operación y automatización",
    description:
      "Elimino fricción con procesos, CRM, dashboards e IA para que el equipo trabaje con más foco y velocidad.",
  },
  {
    title: "Liderazgo y alineación",
    description:
      "Trabajo con equipos pequeños y foco alto: coordino, doy contexto y exijo con respeto para acelerar decisiones.",
  },
];

const About = () => (
  <section className="about" id="about">
    <div className="about__intro-shell">
      <p className="about__eyebrow">Propuesta de valor</p>
      <h1 className="about-title">Dirección de marketing</h1>
      <p className="about__lead">
        Me gusta el marketing cuando se convierte en un sistema que genera
        ingresos de forma predecible.
      </p>
      <p className="about__lead">
        He pasado años construyendo y escalando marca, demanda y ecosistemas
        digitales: a veces ordenando lo que ya existía y muchas otras
        empezando desde cero, desde la propuesta de valor hasta la operativa.
      </p>
      <div className="about__principles" aria-label="Principios de trabajo">
        {corePrinciples.map((principle) => (
          <span className="about__principle" key={principle}>
            {principle}
          </span>
        ))}
      </div>
    </div>

    <div className="about__areas">
      <div className="about__section-head">
        <h2 className="about-subtitle">Lo que hago bien</h2>
      </div>
      <div className="about__grid">
        {valuePillars.map((item) => (
          <article className="about_card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </div>

    <section className="about__workflow">
      <h2 className="about-subtitle about-subtitle--light">Cómo suelo trabajar</h2>
      <p className="about__workflow-lead">
        Empiezo por entender negocio y cliente, defino prioridades que muevan
        aguja y construyo un plan ejecutable.
      </p>
      <ol className="about__workflow-list">
        <li>Entender: contexto, mercado, cliente y objetivos reales.</li>
        <li>Priorizar: foco en iniciativas con impacto tangible.</li>
        <li>Ejecutar: lanzar, medir y optimizar con cadencia.</li>
      </ol>
      <p className="about__closing">
        Si buscas a alguien que construya, ordene cuando toca y convierta
        marketing en una palanca de crecimiento real, hablamos.
      </p>
    </section>
  </section>
);

export default About;
