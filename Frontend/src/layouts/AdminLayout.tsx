import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./AdminLayout.module.css";

const AdminLayout: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className={styles["admin-layout__denied"]}>
        <h2>Access Denied</h2>
        <p>Please log in to continue.</p>
        <Navigate to="/login" replace />
      </div>
    );
  }

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
