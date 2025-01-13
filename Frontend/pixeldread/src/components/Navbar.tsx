import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.hamburger} ${isOpen ? styles.active : ""}`} onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>
      <ul className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <li className={styles.nav__item}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/faq">FAQ</Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/blog">Blog</Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/patchnotes">Patch Notes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
