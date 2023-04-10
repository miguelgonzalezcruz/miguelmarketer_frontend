import React from "react";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";

import imageParallax from "../images/hero/aperture-vintage-5UjBY00ToG0-unsplash.jpg";
import imageParallax2 from "../images/hero/denis-degioanni-9wH624ALFQA-unsplash.jpg";

import "../blocks/Hero.css";

const HeroParallax = () => {
  return (
    <ParallaxProvider>
      <ParallaxBanner
        layers={[
          {
            image: imageParallax,
            speed: -15,
          },
          {
            image: imageParallax2,
            speed: -10,
          },
        ]}
        style={{
          height: "100vh",
        }}
      />
      <div className="hero-text">
        <h1>Hello World</h1>
      </div>
    </ParallaxProvider>
  );
};

export default HeroParallax;
