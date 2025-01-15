import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.css";

const MobileMenu = () => {
    return (
        <div className={styles.mobileMenu}>
            <ul>
                <li><Link to="settings">Settings</Link></li>
                <li><Link to="statistics">Statistics</Link></li>
                <li><Link to="categories">Categories</Link></li>
                <li><Link to="content">Content</Link></li>
                <li><Link to="createCategory">Create Category</Link></li>
                <li><Link to="createContent">Create Content</Link></li>
            </ul>
        </div>
    );
}

export default MobileMenu;