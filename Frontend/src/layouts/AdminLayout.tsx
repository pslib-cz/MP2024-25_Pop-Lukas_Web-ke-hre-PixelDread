import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/navbars/AdminNavbar";
import styles from "./AdminLayout.module.css";
import { me } from "../api/authService";

const AdminLayout: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
      const isValid = await me();
      setAuthorized(isValid);
    };
    checkAuthorization();
  }, [navigate]);

  if (authorized === null) {
    return <div className={styles["admin-layout__loading"]}>Loading...</div>;
  }

  if (!authorized) {
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
