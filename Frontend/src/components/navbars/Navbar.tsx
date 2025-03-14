import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        {/* Clickable brand that links to the base (home) page */}
        <Link 
          to="/" 
          className={styles.navbar__brand} 
          onClick={() => setMenuOpen(false)}
        >
          PIXEL DREAD
        </Link>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.hamburger__open : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`${styles.menu} ${menuOpen ? styles.menu__open : ""}`}>
          <Link to="/blog" className={styles.menu__link} onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
          <Link to="/faq" className={styles.menu__link} onClick={() => setMenuOpen(false)}>
            FAQ
          </Link>
          <Link to="/patch" className={styles.menu__link + " " + styles.last} onClick={() => setMenuOpen(false)}>
            Patch-notes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
