import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import styles from "./Cookies.module.css";

const Cookies: React.FC = () => {
  return (
    <HelmetProvider>
      <div className={styles["cookie-policy"]}>
        <Helmet>
          <title>Cookie Policy</title>
          <meta name="description" content="Cookie Policy" />
        </Helmet>
        <main className={styles["cookie-policy__main"]}>
          <header className={styles["cookie-policy__header"]}>
            <h1 className={styles["cookie-policy__title"]}>Cookie Policy</h1>
            <p className={styles["cookie-policy__intro"]}>
              This website uses cookies. Cookies are files stored on your device when you visit a website.
              These files help the website identify you and your preferences, allowing the website to customize itself to your needs.
            </p>
          </header>
          <section className={styles["cookie-policy__section"]}>
            <h2 className={styles["cookie-policy__subtitle"]}>What cookies do we use?</h2>
            <p className={styles["cookie-policy__text"]}>
              On this website, we use cookies to store your preferences and improve the performance of the website.
              We also use cookies for tracking website usage and improving our services.
            </p>
            <p className={styles["cookie-policy__text"]}>Types of cookies we use:</p>
            <h3 className={styles["cookie-policy__subsubtitle"]}>1. Necessary Cookies</h3>
            <p className={styles["cookie-policy__text"]}>
              These cookies are essential for the proper functioning of the website. Without them, you would not be able to use basic website functions.
            </p>
            <h3 className={styles["cookie-policy__subsubtitle"]}>2. Analytical Cookies</h3>
            <p className={styles["cookie-policy__text"]}>
              Analytical cookies allow us to track website usage and improve our services. These cookies collect information about how our website is used, helping us to enhance the user experience.
            </p>
            <h3 className={styles["cookie-policy__subsubtitle"]}>3. Personalized Cookies</h3>
            <p className={styles["cookie-policy__text"]}>
              Personalized cookies serve to provide customized content and advertisements.
              These cookies may be created by third parties and are used to analyze your usage of the website and show tailored advertisements.
            </p>
          </section>
          <section className={styles["cookie-policy__section"]}>
            <h2 className={styles["cookie-policy__subtitle"]}>Your Consent</h2>
            <p className={styles["cookie-policy__text"]}>
              By using this website, you consent to the processing of your data in accordance with our cookie policy.
              You can set your browser to limit or disable cookies. However, disabling cookies may limit the functionality of the website and restrict your browsing experience.
            </p>
          </section>
          <section className={styles["cookie-policy__section"]}>
            <h2 className={styles["cookie-policy__subtitle"]}>Changes to Our Cookie Policy</h2>
            <p className={styles["cookie-policy__text"]}>
              We may update our cookie policy in the future. If there are any changes, we will post those changes on this page.
              We recommend checking this page regularly for updates to the cookie policy.
            </p>
          </section>
          <section className={styles["cookie-policy__section"]}>
            <h2 className={styles["cookie-policy__subtitle"]}>Contact</h2>
            <p className={styles["cookie-policy__text"]}>
              If you have any questions regarding our cookies, feel free to contact me via email at{" "}
              <a href="mailto:jansebastiankostlan@gmail.com" className={styles["cookie-policy__link"]}>
                jansebastiankostlan@gmail.com
              </a>
            </p>
          </section>
        </main>
      </div>
    </HelmetProvider>
  );
};

export default Cookies;
