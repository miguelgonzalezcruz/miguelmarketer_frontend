import React from "react";

import "../blocks/App.css";

import HeroComponent from "./HeroComponent";
import About from "./About";
import Timeline from "./Timeline";
import Contact from "./Contact";
import NewBlogPosts from "./NewBlogPosts";

function PageContent() {
  return (
    <>
      <HeroComponent />
      <main className="app-container">
        <About />
        <Timeline />
        <Contact />
        <NewBlogPosts />
      </main>
    </>
  );
}

export default PageContent;
