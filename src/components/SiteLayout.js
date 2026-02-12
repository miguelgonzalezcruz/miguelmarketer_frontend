import React from "react";
import Header from "./Header";
import HeaderBurger from "./HeaderBurger";
import Footer from "./Footer";

function SiteLayout({ children }) {
  return (
    <main className="app-container">
      <Header />
      <HeaderBurger />
      {children}
      <Footer />
    </main>
  );
}

export default SiteLayout;
