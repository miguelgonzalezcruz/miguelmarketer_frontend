// import "../blocks/App.css";
import React from "react";
import Header from "./Header";
import About from "./About";
import Hero from "./Hero";
import Timeline from "./Timeline";
import Contact from "./Contact";
import Footer from "./Footer";
import HeroComponent from "./HeroComponent";

import "../blocks/App.css";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app">
      <Header></Header>

      {/* <Hero></Hero> */}

      <HeroComponent></HeroComponent>

      <main className="app-container">
        <About></About>

        <Timeline></Timeline>

        <Contact></Contact>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
