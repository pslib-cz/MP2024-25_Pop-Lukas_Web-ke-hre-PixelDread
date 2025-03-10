import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./AdminPage.module.css";

const AdminPage: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className={styles["admin-page"]}>
        <h1 className={styles["admin-page__title"]}>Admin Dashboard</h1>
        <p>Welcome to the admin panel.</p>
        <button
          className={styles["admin-page__button"]}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </HelmetProvider>
  );
};

export default AdminPage;
