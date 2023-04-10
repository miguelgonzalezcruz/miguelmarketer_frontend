import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../blocks/Hero.css";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";

import logo from "../images/hero/0311353a8546405cb441c741a4934ab5.png";

import emojis from "../emoji.json";

const HeroComponent = () => {
  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex].emoji;
  };

  const [heroImage, setHeroImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/hero-image");
        const data = await response.json();
        setHeroImage(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchHeroImage();
  }, []);

  return (
    <div id="home">
      <ParallaxProvider>
        <div className="hero-image-container">
          {!isLoading && heroImage && (
            <ParallaxBanner
              layers={[
                {
                  image: heroImage.imageUrl,
                  amount: 0.3,
                },
              ]}
              style={{
                height: "100vh",
              }}
            />
          )}
          <div className="gradient-overlay"></div>
        </div>
        <Container fluid>
          <Row>
            <Col>
              <div className="hero-text">
                <h1>
                  ¡Hola! Soy
                  <br />
                  Miguel González {getRandomEmoji()}
                </h1>
                <h2>Marketing && Software Development</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="hero-logo">
                <img
                  src={logo}
                  alt="Miguel González"
                  width="100"
                  height="100"
                />
              </div>
            </Col>

            <Col>
              {!isLoading && heroImage && (
                <div className="hero-author">
                  {heroImage.imageAuthor && heroImage.imageAuthorUrl && (
                    <p>
                      Image by{" "}
                      <a
                        href={heroImage.imageAuthorUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {heroImage.imageAuthor}
                      </a>{" "}
                      {heroImage.imageAuthorProfileImage && (
                        <img
                          src={heroImage.imageAuthorProfileImage}
                          alt={heroImage.imageAuthor}
                        />
                      )}
                    </p>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </ParallaxProvider>
    </div>
  );
};

export default HeroComponent;
