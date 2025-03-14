import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./HomePage.module.css";
import pixelDreadHeader from "../images/pixelDreadHeader.png";
import gplay from "../images/gplay.png";
import WaveText from "../components/WaveText";
import ImageGallery from "../components/ImageGallery";
import PromoPage from "../components/Promo";
import Story from "../components/Story";

const HomePage: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Pixel Dread</title>
      </Helmet>
      <div className={styles.home}>
        {/* Top section fills the viewport */}
        <div className={styles.topSection}>
          <div className={styles.grid}>
            <img
              src={pixelDreadHeader}
              alt="Pixel Dread Header"
              className={styles.home__image}
            />
            <div className={styles.home__heroText}>
              <h1 className={styles.home__title}>
                <WaveText text="PIXEL DREAD" />
              </h1>
              <p className={styles.home__caption}>
                Explore a brand new world packed with mystery, fun, and retro charm.
              </p>
            </div>
            <img
              onClick={() => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.pixeldread.com.unity.template.mobile2D&hl=en"
                );
              }}
              src={gplay}
              alt="Google Play"
              className={styles.home__gplay}
            />
          </div>
        </div>

        <div className={styles.bottomSection}>
          <h2 className={styles.galleryTitle}>GALLERY</h2>
         <ImageGallery />
        </div>
        <div className={styles.bottomSection}>
          <PromoPage />
        </div>
        <div>
          <Story />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HomePage;
