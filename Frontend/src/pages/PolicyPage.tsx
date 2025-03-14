import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./PolicyPage.module.css";

const PolicyPage: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.title}>Pixel Dread – Privacy Policy</h1>
        <h2 className={styles.subtitle}>Introduction</h2>
        <p className={styles.text}>
          Your privacy is important to us. This document describes how we collect, use, and protect your personal data when you use our application, PixelDread.
        </p>
        <h2 className={styles.subtitle}>Collected Information</h2>
        <p className={styles.text}>We collect the following information:</p>
        <h3 className={styles.subheading}>Application Improvement:</h3>
        <p className={styles.text}>
          We collect information about how you use the application to improve the application.
        </p>
        <h3 className={styles.subheading}>Communication:</h3>
        <p className={styles.text}>
          We may contact you with important information, updates, and news.
        </p>
        <h3 className={styles.subheading}>Data Sharing</h3>
        <p className={styles.text}>
          We do not share your data with third parties unless it is necessary for providing our services or required by law.
        </p>
        <h3 className={styles.subheading}>Data Security</h3>
        <p className={styles.text}>
          We have implemented security measures to protect your data from unauthorized access, alteration, or destruction. Your data is stored on secure servers.
        </p>
        <h3 className={styles.subheading}>Data Retention and Deletion</h3>
        <p className={styles.text}>
          We retain your data only for as long as necessary to fulfill the purposes outlined in this privacy policy. After this period, the data will be securely deleted.
        </p>
        <h2 className={styles.subtitle}>Contact Us</h2>
        <p className={styles.text}>
          If you have any questions about our privacy policy, please contact us at{" "}
          <a className={styles.link} href="mailto:jansebastiankostlan@gmail.com">
            jansebastiankostlan@gmail.com
          </a>
        </p>
        <h2 className={styles.subtitle}>Changes to this Policy</h2>
        <p className={styles.text}>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
        </p>
      </div>
    </HelmetProvider>
  );
};

export default PolicyPage;
