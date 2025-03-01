import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminNavbar.module.css";

const AdminNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__brand}>Admin Dashboard</div>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.hamburger__open : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`${styles.menu} ${menuOpen ? styles.menu__open : ""}`}>
          <Link to="/admin" className={styles.menu__link} onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/admin/blog" className={styles.menu__link} onClick={() => setMenuOpen(false)}>
            Manage blog
          </Link>
          <Link to="/admin/faq" className={styles.menu__link} onClick={() => setMenuOpen(false)}>
            Manage FAQ
          </Link>
          <Link to="/admin/patch" className={styles.menu__link} onClick={() => setMenuOpen(false)}>
            Manage patch notes
          </Link>
          <Link to="/admin/manageAdmins" className={styles.menu__link} onClick={() => setMenuOpen(false)}>
            Manage admins
          </Link>
          <Link to="/" className={styles.menu__link} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
