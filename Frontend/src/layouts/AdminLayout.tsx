import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbars/AdminNavbar";
import styles from "./AdminLayout.module.css";
import { useAuth } from "../context/AuthContext";

const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className={styles["admin-layout__denied"]}>
        <h2>Access Denied</h2>
        <p>Please log in to continue.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div className={styles["admin-layout"]}>
      <AdminNavbar />
      <main className={styles["admin-layout__content"]}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
