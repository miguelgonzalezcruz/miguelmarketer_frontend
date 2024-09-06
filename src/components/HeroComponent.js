import React, { useState, useEffect } from "react";
import emojis from "../emoji.json";
import "../blocks/Hero.css";

const HeroComponent = () => {
  // const baseURL =
  //   process.env.NODE_ENV === "production"
  //     ? "https://api.miguelmarketer.com"
  //     : "http://localhost:3001";

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex].emoji;
  };

  const [heroImage, setHeroImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchHeroImage = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        console.log("Fetching hero image from API...");
        const response = await fetch("/api/hero-image");

        console.log("Response status from API:", response.status);

        // Verifica si la respuesta es JSON o no
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Data received from API:", data);

          const timestamp = Date.now();
          const imageUrlWithCacheBuster = `${data.imageUrl}?v=${timestamp}`;

          const image = new Image();
          image.src = imageUrlWithCacheBuster;
          image.onload = () => {
            setHeroImage({ ...data, imageUrl: imageUrlWithCacheBuster });
            localStorage.setItem(
              "heroImage",
              JSON.stringify({
                data: { ...data, imageUrl: imageUrlWithCacheBuster },
                timestamp,
              })
            );
            setIsLoading(false);
          };
          image.onerror = () => {
            setHasError(true);
            setIsLoading(false);
          };
        } else {
          console.error("Received non-JSON response from API");
          setHasError(true);
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
        setHasError(true);
        setIsLoading(false);
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
          isLoading || hasError ? backupImageUrl : heroImage.imageUrl
        })`,
        position: "relative",
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
              Imagen de{" "}
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

      {isLoading && (
        <div className="loading-message">Importando siguiente imagen...</div>
      )}
    </div>
  );
};

export default HeroComponent;
