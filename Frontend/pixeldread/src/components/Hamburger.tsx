import React, { useState } from "react";
import styles from "./Hamburger.module.css";
interface HamburgerProps {
    onClick: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
const Hamburger: React.FC<HamburgerProps> = ({onClick, setIsOpen ,isOpen}) => {
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