import "../src/index.css";
import "../src/blocks/App.css";
import "../src/blocks/Header.css";
import "../src/blocks/HeaderBurger.css";
import "../src/blocks/Hero.css";
import "../src/blocks/About.css";
import "../src/blocks/TimelineList.css";
import "../src/blocks/TimelineItem.css";
import "../src/blocks/Contact.css";
import "../src/blocks/MusicSpotlight.css";
import "../src/blocks/Footer.css";
import { Analytics } from "@vercel/analytics/react";
import GTMNoScript from "../src/components/GTMNoScript";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GTMNoScript />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
