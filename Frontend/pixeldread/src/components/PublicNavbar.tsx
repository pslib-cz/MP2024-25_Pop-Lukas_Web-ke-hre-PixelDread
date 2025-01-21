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
    
    return(
    <>
    <div>
        <div className={styles.navbar}>
            <span className={styles.navbar__logo} onClick={() => navigate('/')}>PIXELDREAD</span>
            <Hamburger onClick={handleClick} setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
    </div>
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/faq">FAQ</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/patchnotes">Patch Notes</Link></li>
                </ul>
            </div>
        
    </>
    )
}
export default PublicNavbar