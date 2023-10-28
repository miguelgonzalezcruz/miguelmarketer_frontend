import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./Header";
import HeaderBurger from "./HeaderBurger";
import About from "./About";
import Timeline from "./Timeline";
import Contact from "./Contact";
import Footer from "./Footer";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";
import ScrollToTop from "./ScrollToTop";
import PageContent from "./PageContent";
import NewBlogPosts from "./NewBlogPosts";
import BlogPostDetail from "./BlogPostDetail";

import "../blocks/App.css";

function App() {
  return (
    <HelmetProvider>
      <main className="app-container">
        <Router>
          <ScrollToTop />
          <div className="page">
            <div className="page__content">
              <Header />
              <HeaderBurger />
              <Routes>
                <Route path="/" element={<PageContent />} />
                <Route path="/sobre-mi" element={<About />} />
                <Route path="/mi-trayectoria" element={<Timeline />} />
                <Route path="/contacta" element={<Contact />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:postId" element={<BlogPost />} />
                <Route exact path="/blog-posts" element={<NewBlogPosts />} />
                <Route
                  exact
                  path="/blog-posts/:slug"
                  element={<BlogPostDetail />}
                />
              </Routes>
              <Footer />
            </div>
          </div>
        </Router>
      </main>
    </HelmetProvider>
  );
}

export default App;
