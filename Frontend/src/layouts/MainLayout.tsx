import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbars/Navbar";
import styles from "./MainLayout.module.css";
import Footer from "../components/Footer";

const MainLayout: React.FC = () => {
  return (
    <div className={styles["main-layout"]}>
      <Navbar />
      <main className={styles["main-layout__content"]}>
        <Outlet />
      </main>
      <Footer />

    </div>
  );
};

export default MainLayout;
