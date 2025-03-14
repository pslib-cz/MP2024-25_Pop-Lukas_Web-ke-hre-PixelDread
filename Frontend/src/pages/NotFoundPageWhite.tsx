import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./NotFoundPageWhite.module.css";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.header}>404 - Page Not Found</h1>
        <p className={styles.message}>
          The page you are looking for does not exist or another error occurred.
        </p>
        <button className={styles.button} onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </HelmetProvider>
  );
};

export default NotFoundPage;
