import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
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
        <Link className={styles["navbar__link"]} to="/faq">FAQ</Link>
        <Link className={styles["navbar__link"]} to="/patch">Patch notes</Link>
        {isAuthenticated && (
          <button className={styles["navbar__logout"]} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
