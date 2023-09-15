import React from "react";

import "../blocks/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HeroComponent from "./HeroComponent";
import About from "./About";
import Timeline from "./Timeline";
import Contact from "./Contact";

function PageContent() {
  return (
    <>
      <HeroComponent />
      <main className="app-container">
        <About />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}

export default PageContent;
