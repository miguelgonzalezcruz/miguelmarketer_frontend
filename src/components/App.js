import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header from "./Header";
import About from "./About";
import Timeline from "./Timeline";
import Contact from "./Contact";
import Footer from "./Footer";
import HeroComponent from "./HeroComponent";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";
import ScrollToTop from "./ScrollToTop";
import PageContent from "./PageContent";

import "../blocks/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //   return (
  //     <Router>
  //       <div className="app">
  //         <Header />

  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/blog/:postId" element={<BlogPost />} />
  //           <Route path="/blog" element={<BlogList />} />
  //         </Routes>

  //         <Footer />
  //       </div>
  //     </Router>
  //   );
  // }

  return (
    <main className="app-container">
      <Router>
        <ScrollToTop />
        <div className="page">
          <div className="page__content">
            <Header />
            <Routes>
              <Route path="/" element={<PageContent />} />
              <Route path="/sobre-mi" element={<About />} />
              <Route path="/mi-trayectoria" element={<Timeline />} />
              <Route path="/contacta" element={<Contact />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </main>
  );
}

export default App;

{
  /* <HeroComponent />
<main className="app-container">
  <About />
  <Timeline />
  <Contact />
</main> */
}
