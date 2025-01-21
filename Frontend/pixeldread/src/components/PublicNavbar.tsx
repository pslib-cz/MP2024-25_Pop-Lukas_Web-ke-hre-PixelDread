import { useState } from "react"
import styles from "./PublicNavbar.module.css"
import Hamburger from "./Hamburger"
import { Link, useNavigate } from "react-router-dom";

const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate()
    const handleClick = () => {
        setIsOpen((prevState) => !prevState); 
      };
    const handleSpan = () => {  
        setIsOpen((prevState) => !prevState);
        navigate("/")
    }
    return(
    <>
    <div>
        <div className={styles.navbar}>
            <span className={styles.navbar__logo} onClick={handleSpan}>PIXELDREAD</span>
            <Hamburger onClick={handleClick} setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
    </div>
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
                <ul>
                    <li onClick={handleClick}><Link to="/">Home</Link></li>
                    <li onClick={handleClick}><Link to="/blog">Blog</Link></li>
                    <li onClick={handleClick}><Link to="/patchnotes">Patches</Link></li>
                    <li onClick={handleClick}><Link to="/faq">FAQ</Link></li>
                </ul>
            </div>
        
    </>
    )
}
export default PublicNavbar