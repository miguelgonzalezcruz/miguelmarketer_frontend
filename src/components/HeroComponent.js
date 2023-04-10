import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../blocks/Hero.css";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";

import emojis from "../emoji.json";

import logo from "../images/job_logos/logomiguelmarketer.svg";

const HeroComponent = () => {
  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex].emoji;
  };

  const [heroImage, setHeroImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroImage = async () => {
      const heroImageFromLocalStorage = JSON.parse(
        localStorage.getItem("heroImage")
      );
      if (
        heroImageFromLocalStorage &&
        Date.now() - heroImageFromLocalStorage.timestamp < 180000 // 3 minutes in milliseconds
      ) {
        setHeroImage(heroImageFromLocalStorage.data);
        setIsLoading(false);
      } else {
        try {
          const response = await fetch("http://localhost:3001/api/hero-image");
          const data = await response.json();
          const timestamp = Date.now();
          setHeroImage(data);
          localStorage.setItem(
            "heroImage",
            JSON.stringify({ data, timestamp })
          );
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    };
    fetchHeroImage();
  }, []);

  const backupImageUrl =
    "https://images.unsplash.com/photo-1672243776760-67aec979f591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80";

  return (
    <div id="home">
      <ParallaxProvider>
        <div className="hero-image-container">
          {!isLoading && heroImage && (
            <ParallaxBanner
              layers={[
                {
                  image: heroImage.imageUrl || backupImageUrl,
                  amount: 0.3,
                  speed: -50,
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
              {/* <div className="hero-logo">
                <img
                  src={logo}
                  alt="Miguel González"
                  width="100"
                  height="100"
                />
              </div> */}
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
