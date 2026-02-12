import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../utils/animation.json";

const About = () => {
  const lottieContainer = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    // Cleanup animation instance on component unmount
    return () => {
      lottie.destroy();
    };
  }, []);

  const cardContent = [
    {
      title: "Marketing Digital",
      description: [
        "Me apasiona el marketing digital y su capacidad para generar resultados medibles y escalables.",
        "La combinación de creatividad, datos y tecnología es clave para desarrollar estrategias de marketing efectivas y eficientes.",
      ],
    },
    {
      title: "Pop-Rock - Carmen Supermarket",
      description: [
        "Toco la batería en una banda de pop-rock llamada Carmen Supermarket. Reivindicamos las guitarras despreocupadas de los 90.",
        "Hemos lanzado nuestos primeros dos singles en Spotify y estamos programando conciertos en Mallorca",
      ],
    },
    {
      title: "Educación - Formación",
      description: [
        "Me encanta compartir mis conocimientos y experiencias con otros. Es una buena forma de devolver a la comunidad y seguir aprendiendo.",
        "Actualmente imparto dos asignaturas en el Grado del Marketing del Centro de Educación Superior Felipe Moreno - Nebrija (Centro adscrito a la Universidad Nebrija)",
      ],
    },
    {
      title: "Inteligencia Artificial",
      description: [
        "Son incontables las muchas posibilidades que la IA ofrece para optimizar y escalar las acciones de marketing y mejorar la experiencia del cliente.",
        "Podemos aprovechar los datos para obtener información sobre la audiencia, personalizar mensajes y crear flujos de trabajo y automatizaciones más eficientes.",
      ],
    },
    {
      title: "Blockchain",
      description: [
        "La tecnología blockchain es una herramienta increíble con un inmenso potencial para transformar casi cualquier proceso digital y negocio.",
        "Su naturaleza descentralizada y transparente puede ofrecer beneficios significativos en términos de seguridad, trazabilidad y eficiencia. Me fascinan las muchas posibles aplicaciones.",
      ],
    },
    {
      title: "Startups",
      description: [
        "Mis intereses abarcan diversos sectores pero me focalizo en TravelTech, EdTech y Fitness. Me apasiona conocer nuevos proyectos que resuelvan problemas reales.",
        "Si ya tienes el MVP, cuentas con una pequeña base de clientes -que paguen -, y necesitas ayuda para hacer crecer tu proyecto, no dudes en contactarme.",
      ],
    },
  ];

  const renderCards = cardContent.map((card, index) => (
    <div className="about_card" key={index}>
      <h3>{card.title}</h3>
      {card.description.map((text, idx) => (
        <p key={idx}>{text}</p>
      ))}
    </div>
  ));

  return (
    <div className="about" id="about">
      <h1 className="about-title">Sobre mí</h1>
      <div className="row">
        <div className="column lottie-container">
          <div ref={lottieContainer}></div>
        </div>
        <div className="column description-container">
          <p className="about-description">
            Profesional de Marketing con más de 15 años de experiencia
            internacional y desarrollador Full-Stack.
          </p>
          <p className="about-description">
            Apasionado por la tecnología y el marketing digital orientado a
            resultados en entornos de rápido crecimiento.
          </p>
          <p className="about-description">
            Me especializo en el desarrollo y ejecución de planes de marketing,
            aprovechando al máximo el análisis y uso de datos, la automatización
            y la creatividad para impulsar la demanda.
          </p>
        </div>
      </div>
      <h2 className="about-subtitle">Intereses</h2>
      <div className="card-group">{renderCards}</div>
    </div>
  );
};

export default About;
