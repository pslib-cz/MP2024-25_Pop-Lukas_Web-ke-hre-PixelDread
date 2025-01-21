import { Link } from "react-router-dom";
import styles from "./MobileNavbar.module.css"
interface MobileNavbarProps {
    isOpen: boolean; // Přijímá stav otevření
    onClose: () => void;
}

const MobileMenu: React.FC<MobileNavbarProps> = ({ isOpen, onClose }) => {
    return (
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/patchnotes">Patch Notes</Link></li>
            </ul>
        </div>
    )
}
export default MobileMenu