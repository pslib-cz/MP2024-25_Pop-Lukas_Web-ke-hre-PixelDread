
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
       
<nav className={styles.navbar}>
            <ul>
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
    </div>
  );
};

export default Navbar;
