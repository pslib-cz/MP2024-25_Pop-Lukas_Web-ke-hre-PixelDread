import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authService";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const isAdmin = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar__links"]}>
        <Link className={styles["navbar__link"]} to="/">Home</Link>
        <Link className={styles["navbar__link"]} to="/blog">Blog</Link>
        {isAdmin && <Link className={styles["navbar__link"]} to="/admin">Admin</Link>}
      </div>
      <div className={styles["navbar__auth"]}>
        {isAdmin ? (
          <button className={styles["navbar__button"]} onClick={handleLogout}>Logout</button>
        ) : (
          <Link className={styles["navbar__link"]} to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
