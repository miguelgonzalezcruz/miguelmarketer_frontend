import React, { useState, useEffect } from "react";
import emojis from "../emoji.json";
import "../blocks/Hero.css";

const HeroComponent = () => {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://api.miguelmarketer.com"
      : "http://localhost:3001";

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
          const response = await fetch(`${baseURL}/api/hero-image`);
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
    <div
      id="home"
      className="hero-image-container"
      style={{
        backgroundImage: `url(${
          !isLoading && heroImage ? heroImage.imageUrl : backupImageUrl
        })`,
      }}
    >
      <div className="gradient-overlay"></div>
      <div className="hero-text">
        <h1>
          Marketing &
          <br />
          Software Development {getRandomEmoji()}
        </h1>
        {/* <h2>Marketing && Software Development</h2> */}
      </div>
      {!isLoading && heroImage && (
        <div className="hero-author">
          {heroImage.imageAuthor && heroImage.imageAuthorUrl && (
            <p>
              Imágen de{" "}
              <a
                href={heroImage.imageAuthorUrl}
                target="_blank"
                rel="noreferrer"
              >
                {heroImage.imageAuthor}
              </a>
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
    </div>
  );
};

export default HeroComponent;
