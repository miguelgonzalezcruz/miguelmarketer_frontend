import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../blocks/Hero.css";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";

import emojis from "../emoji.json";

import HeroImageBackground from "../utils/HeroImageBackground";

const Hero = () => {
  const { imageUrl, imageAuthor, imageAuthorUrl, imageAuthorProfileImage } =
    HeroImageBackground();

  const backupImageUrl =
    "https://images.unsplash.com/photo-1672243776760-67aec979f591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80";

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex].emoji;
  };

  return (
    <div id="home">
      <ParallaxProvider>
        <div className="hero-image-container">
          <ParallaxBanner
            layers={[
              {
                image: imageUrl || backupImageUrl,
                speed: -30,
              },
            ]}
            style={{
              height: "100vh",
            }}
          />
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
              <div className="hero-author">
                {imageAuthor && imageAuthorUrl && (
                  <p>
                    Image by{" "}
                    <a href={imageAuthorUrl} target="_blank" rel="noreferrer">
                      {imageAuthor}
                    </a>{" "}
                    {imageAuthorProfileImage && (
                      <img src={imageAuthorProfileImage} alt={imageAuthor} />
                    )}
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </ParallaxProvider>
    </div>
  );
};

export default Hero;
