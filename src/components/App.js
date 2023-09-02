import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Header";
import About from "./About";
import Timeline from "./Timeline";
import Contact from "./Contact";
import Footer from "./Footer";
import HeroComponent from "./HeroComponent";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";

import "../blocks/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/blog" element={<BlogList />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

function Home() {
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

export default App;
