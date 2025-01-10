import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.nav}>
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
}

export default Navbar;