// src/components/HeroComponent.js

import React, { useState, useEffect } from "react";
import Link from "next/link";
import miguelmarketerprofile from "../images/history/miguelmarketer_.png";

const miguelmarketerprofileSrc =
  miguelmarketerprofile?.src || miguelmarketerprofile;

const HeroComponent = () => {
  // const baseURL =
  //   process.env.NODE_ENV === "production"
  //     ? "https://api.miguelmarketer.com"
  //     : "http://localhost:3001";

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
        const data = await response.json();

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
      <div className="hero-accent hero-accent--one" aria-hidden="true"></div>
      <div className="hero-accent hero-accent--two" aria-hidden="true"></div>
      <div className="hero-text">
        <div className="hero-card">
          <div className="hero-profile-chip">
            <img src={miguelmarketerprofileSrc} alt="Miguel González" loading="lazy" />
          </div>
          <p className="hero-eyebrow">Dirección de marketing</p>
          <h1>
            Estrategia, demanda y ejecución para compañías que quieren crecer
            mejor
          </h1>
          <p className="hero-subtitle">
            Construyo sistemas de marketing que conectan marca, pipeline y
            operación comercial con una lógica clara de resultados.
          </p>
          <div className="hero-actions">
            <Link href="/contacta" className="hero-action hero-action--primary">
              Solicitar conversación
            </Link>
            <a
              href="https://www.linkedin.com/in/miguelgonzalezcruz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-action hero-action--secondary"
            >
              Ver perfil en LinkedIn
            </a>
          </div>
        </div>
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
