import React, { useState } from "react";
import styles from "./Hamburger.module.css";
interface HamburgerProps {
    onClick: () => void;
}
const Hamburger: React.FC<HamburgerProps> = ({onClick}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOnClick = () => {
        onClick();
        setIsOpen(!isOpen); 
    };
    return (
    <div className={isOpen ? styles.hamburger + " " + styles.open : styles.hamburger} onClick={handleOnClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
    );
};
export default Hamburger;