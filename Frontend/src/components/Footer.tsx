import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
            <span>2025</span>
        <div className={styles.footer__links}>
          <Link to="/gdpr" className={styles.footer__link}>
            GDPR
          </Link>
          <span className={styles.footer__separator}>|</span>
          <Link to="cookie-policy" className={styles.footer__link}>
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
