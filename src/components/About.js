import React from "react";

import { Container, Row, Col, Card, CardGroup } from "react-bootstrap";

import Lottie from "lottie-react-web";

import animationData from "../utils/animation.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "../blocks/About.css";

const cardStyle = {
  margin: "10px",
};

const About = () => {
  return (
    <div className="about" id="about">
      <Container fluid>
        <Row>
          <Col>
            <h1 className="about-title">Sobre mí</h1>
          </Col>
        </Row>
        <Row>
          <Col className="about-lottie">
            <Lottie
              className="lottie"
              id="lottie"
              options={{
                animationData: animationData,
              }}
            />
          </Col>
          <Col className="about-description-container">
            <p className="about-description">
              Profesional de Marketing con más de 15 años de experiencia
              internacional y desarrollador Full-Stack.
            </p>
            <p className="about-description">
              Apasionado por la tecnología y el marketing digital orientado a
              resultados en entornos de rápido crecimiento.
            </p>
            <p className="about-description">
              Me especializo en el desarrollo y ejecución de planes de
              marketing, aprovechando al máximo el análisis y uso de datos, la
              automatización y la creatividad para impulsar la demanda.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="about-subtitle">Intereses</h2>
          </Col>
        </Row>
        <Row>
          <CardGroup>
            <Col>
              <Card className="about-skills-card" style={cardStyle}>
                <Card.Body>
                  <Card.Title className="about-skills-card-title">
                    Bienestar
                  </Card.Title>
                  <Card.Text className="card-text">
                    <p>
                      Abarca desde la salud física hasta el bienestar emocional
                      y mental.
                    </p>

                    <p>
                      Pasar tiempo con mi familia, mantener hobbies activos -
                      como tocar la batería o salir a la montaña - y cuidar mis
                      finanzas personales con el objetivo de conseguir la
                      independencia financiera son componentes cruciales de mi
                      bienestar general.
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="about-skills-card" style={cardStyle}>
                <Card.Body>
                  <Card.Title className="about-skills-card-title">
                    Inteligencia Artificial
                  </Card.Title>
                  <Card.Text className="card-text">
                    <p>
                      Me intriga las muchas posibilidades que la IA ofrece para
                      optimizar y escalar las acciones de marketing y mejorar la
                      experiencia del cliente.
                    </p>
                    <p>
                      Podemos aprovechar los datos para obtener información
                      sobre la audiencia, personalizar mensajes y crear flujos
                      de trabajo y automatizaciones más eficientes.
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="about-skills-card" style={cardStyle}>
                <Card.Body>
                  <Card.Title className="about-skills-card-title">
                    Blockchain
                  </Card.Title>
                  <Card.Text className="card-text">
                    <p>
                      La tecnología blockchain es una herramienta increíble con
                      un inmenso potencial para transformar casi cualquier
                      proceso digital y negocio.
                    </p>
                    <p>
                      Su naturaleza descentralizada y transparente puede ofrecer
                      beneficios significativos en términos de seguridad,
                      trazabilidad y eficiencia. Me fascinan las muchas posibles
                      aplicaciones
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="about-skills-card" style={cardStyle}>
                <Card.Body>
                  <Card.Title className="about-skills-card-title">
                    Startups
                  </Card.Title>
                  <Card.Text className="card-text">
                    <p>
                      Mis intereses abarcan diversos sectores pero me focalizo
                      en TravelTech, EdTech y Fitness. Me apasiona conocer
                      nuevos proyectos que resuelvan problemas reales.
                    </p>
                    <p>
                      Si ya tienes el MVP, cuentas con una pequeña base de
                      clientes -que paguen -, y necesitas ayuda para hacer
                      crecer tu proyecto, no dudes en{" "}
                      <a href="#contact">contactarme</a>.
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </CardGroup>
        </Row>
      </Container>
    </div>
  );
};

export default About;
