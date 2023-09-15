import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If we have a hash value, let's scroll to the element right away
      setTimeout(() => {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      // No hash value, scroll to the top of the page
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
