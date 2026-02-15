import React from "react";
import musicCover from "../images/history/CarmenSupermarketConcierto_1.jpg";

const musicCoverSrc = musicCover?.src || musicCover;

const musicLinks = [
  {
    label: "Web oficial",
    href: "https://www.carmensupermarket.com/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/carmensupermarket/",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/4Ms17M4YF5EZfoUPEUCGny",
  },
];

function MusicSpotlight() {
  return (
    <section className="music-spotlight" id="musica">
      <div className="music-spotlight__content">
        <p className="music-spotlight__eyebrow">Afición personal</p>
        <h2 className="music-spotlight__title">
          CarmenSupermarket: mi afición a la música
        </h2>
        <p className="music-spotlight__lead">
          Soy batería de CarmenSupermarket, una banda de pop-rock de Mallorca.
        </p>
        <div className="music-spotlight__actions">
          {musicLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="music-spotlight__action"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <figure className="music-spotlight__media">
        <img
          src={musicCoverSrc}
          alt="CarmenSupermarket en concierto"
        />
      </figure>
    </section>
  );
}

export default MusicSpotlight;
