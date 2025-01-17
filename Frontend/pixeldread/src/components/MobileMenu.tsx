import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.css";
interface MobileMenuProps {
    isOpen: boolean; // Přijímá stav otevření
    onClose: () => void; 
}
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    var iconWidth = "32";
    var iconHeight = "32";
    return (
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
            <ul>
                <h2>Manage</h2>
                <div className={styles.divider}></div>
                <Link to="statistics" onClick={onClose}>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M20 20H4V4"/><path d="M4 16.5L12 9l3 3l4.5-4.5"/></g></svg>
                        <span>Statistics</span>
                    </li>                    
                </Link>

                <Link to="categories" onClick={onClose}>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/></svg>
                        <span>Categories</span>
                    </li>
                </Link>

                <Link to="content" onClick={onClose}>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 24 24"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"/></svg>                    
                        <span>Content</span>
                    </li>                    
                </Link>

                <Link to="admins" onClick={onClose}>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 24 24"><path fill="currentColor" d="M13.07 10.41a5 5 0 0 0 0-5.82A3.4 3.4 0 0 1 15 4a3.5 3.5 0 0 1 0 7a3.4 3.4 0 0 1-1.93-.59M5.5 7.5A3.5 3.5 0 1 1 9 11a3.5 3.5 0 0 1-3.5-3.5m2 0A1.5 1.5 0 1 0 9 6a1.5 1.5 0 0 0-1.5 1.5M16 17v2H2v-2s0-4 7-4s7 4 7 4m-2 0c-.14-.78-1.33-2-5-2s-4.93 1.31-5 2m11.95-4A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4Z"/></svg>                    
                        <span>Admins</span>
                    </li>
                </Link>

                <Link to="settings" onClick={onClose}>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M13.765 2.152C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353a1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7s-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555c.473.297.777.803.777 1.361s-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605c.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353c.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863c.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453s.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.562 12c0-.558.304-1.064.777-1.36c.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605c-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008a1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"/></g></svg>
                        <span>Settings</span>
                    </li>
                </Link>

                <h2>Create</h2>
                <div className={styles.divider}></div>

                <Link to="createCategory" onClick={onClose}>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3h6m-3-3v6"/></svg>
                        <span>New category</span>
                    </li>
                </Link>

                <Link to="createContent" onClick={onClose}>

                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8m-4-4v8"/></g></svg>
                        <span>New content</span>
                    </li>
                </Link>

                <div className={styles.divider}></div>
                <div onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20"/></svg>            
                </div>
                
                </ul>
        </div>
    );
}

export default MobileMenu;