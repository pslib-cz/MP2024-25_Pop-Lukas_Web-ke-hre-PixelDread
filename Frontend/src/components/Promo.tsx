import React from "react";
import styles from "./Promo.module.css";

const PromoPage: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src="/pixeldreadimageexample.png" alt="Promo" className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Dive into the darkness!</h2>
          <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
        </div>
      </div>
    </section>
  );
};

export default PromoPage;