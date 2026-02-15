import React from "react";

import HeroComponent from "./HeroComponent";
import About from "./About";
import Timeline from "./Timeline";
import Contact from "./Contact";
import MusicSpotlight from "./MusicSpotlight";

function PageContent() {
  return (
    <>
      <HeroComponent />
      <main className="app-container">
        <About />
        <Timeline />
        <MusicSpotlight />
        <Contact />
      </main>
    </>
  );
}

export default PageContent;
