import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
// Import your images (ensure the paths are correct)
import pixelDreadHeader from "../images/pixelDreadHeader.png";
import gplay from "../images/gplay.png";

const HomePage: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Pixel Dread</title>
      </Helmet>
      <div className={styles.home}>
        <div className={styles.grid}>
          <img
            src={pixelDreadHeader}
            alt="Pixel Dread Header"
            className={styles.home__image}
          /><div>
          <h1 className={styles.home__title}>PIXEL DREAD</h1>
          <p className={styles.home__caption}>
            Explore a brand new world packed with mystery, fun, and retro charm.
          </p></div>

            <img
              //links to the Google Play Store
              onClick={() => {window.open("https://play.google.com/store/apps/details?id=com.pixeldread.com.unity.template.mobile2D&hl=en");
              }}
              src={gplay}
              alt="Google Play"
              className={styles.home__gplay}
            />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HomePage;
