import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbars/AdminNavbar";
import styles from "./AdminLayout.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";

const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Access Denied</title>
        </Helmet>
        <div className={styles.denied}>
          <h2 className={styles.denied__title}>Access Denied</h2>
          <p className={styles.denied__message}>Please log in to continue.</p>
          <Link to="/login" className={styles.denied__loginLink}>
            Login
          </Link>
        </div>
      </HelmetProvider>
    );
  }

  return (
    <div className={styles.adminLayout}>
      <AdminNavbar />
      <main className={styles.adminLayout__content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
