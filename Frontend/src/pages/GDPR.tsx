import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./GDPR.module.css";

const GDPR: React.FC = () => {
  return (
    <HelmetProvider>
      <main className={styles["gdpr"]}>
        <Helmet>
          <title>GDPR</title>
          <meta name="description" content="GDPR Privacy Policy Statement" />
        </Helmet>
        <header className={styles["gdpr__header"]}>
          <h1 className={styles["gdpr__title"]}>GDPR</h1>
          <p className={styles["gdpr__intro"]}>Privacy Policy Statement.</p>
        </header>

        <section className={styles["gdpr__section"]}>
          <h2 className={styles["gdpr__subtitle"]}>Your Data, Your Rights</h2>
          <p className={styles["gdpr__text"]}>
            Welcome to the page dedicated to GDPR compliance on Jan Sebastián Kostlán's personal website. This statement describes our commitments to protecting your privacy and ensuring the security of your personal data in accordance with the General Data Protection Regulation (GDPR).
          </p>
          <p className={styles["gdpr__text"]}>
            We respect your right to privacy and control over your personal data. As a visitor to our website, you have the following rights under GDPR:
          </p>
          <ul className={styles["gdpr__list"]}>
            <li className={styles["gdpr__list-item"]}>Right of access: You can request access to your personal data that we process.</li>
            <li className={styles["gdpr__list-item"]}>Right of rectification: If your personal data is inaccurate or incomplete, you have the right to correct or supplement it.</li>
            <li className={styles["gdpr__list-item"]}>Right of erasure: You can request the deletion of your personal data under certain circumstances.</li>
            <li className={styles["gdpr__list-item"]}>Right to object: You have the right to object to the processing of your personal data for specific purposes.</li>
          </ul>
        </section>

        <section className={styles["gdpr__section"]}>
          <h2 className={styles["gdpr__subtitle"]}>Data Collection and Use</h2>
          <p className={styles["gdpr__text"]}>
            Our website collects and processes personal data only for explicitly stated purposes. Your data will not be shared with third parties without your consent, except in cases where required by law.
          </p>
        </section>

        <section className={styles["gdpr__section"]}>
          <h2 className={styles["gdpr__subtitle"]}>Cookies Policy</h2>
          <p className={styles["gdpr__text"]}>
            We use cookies to improve your browsing experience. By using our website, you consent to the use of cookies in accordance with our{" "}
            <Link to="/cookie-policy" className={styles["gdpr__link"]}>cookie policy</Link>.
          </p>
        </section>

        <section className={styles["gdpr__section"]}>
          <h2 className={styles["gdpr__subtitle"]}>Contact Us</h2>
          <p className={styles["gdpr__text"]}>
            If you have any questions or concerns regarding our GDPR compliance or the processing of your personal data, please contact us at our{" "}
            <a href="mailto:jansebastiankostlan@gmail.com" className={styles["gdpr__link"]}>
              email
            </a>.
          </p>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default GDPR;
