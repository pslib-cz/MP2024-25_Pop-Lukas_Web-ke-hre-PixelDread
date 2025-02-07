import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./AdminLayout.module.css";

const AdminLayout: React.FC = () => {
  return (
    <div className={styles["admin-layout"]}>
      <Navbar />
      <main className={styles["admin-layout__content"]}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
