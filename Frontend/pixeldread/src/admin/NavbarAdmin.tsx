import { Link } from "react-router-dom";
import Hamburger from "../components/Hamburger";
import styles from "./NavbarAdmin.module.css";
import PixelDreadIcon from "./PixelDreadIcon";

const NavbarAdmin = () => {

    return (
        <>
            <div className={styles.navbar}>
                <PixelDreadIcon />
                <Hamburger />
            </div>
            

            <div style={{display: "none"}}>
                <nav>
                <Link to="settings">Settings</Link> |{" "}
                <Link to="statistics">Statistics</Link> |{" "}
                <Link to="categories">Categories</Link> |{" "}
                <Link to="content">Content</Link> |{" "}
                <Link to="createCategory">Create Category</Link> |{" "}
                <Link to="createContent">Create Content</Link>
                </nav>
            </div>
        </>
    );
}

export default NavbarAdmin;