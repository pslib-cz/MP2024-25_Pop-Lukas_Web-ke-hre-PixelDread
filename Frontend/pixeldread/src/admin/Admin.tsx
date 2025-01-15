import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { BlogContext } from "../BlogContext";
import { useState } from "react";
import MobileMenu from "../components/MobileMenu";
import Hamburger from "../components/Hamburger";
import PixelDreadIcon from "../components/PixelDreadIcon";

export default function Admin() {
  const { state } = useContext(BlogContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }

  if(!state.isUserLoggedIn){
    return (
      <>
      <h2>Access Denied</h2>
      <Link to="/login">Login</Link>
      </>
    )
  }
  else{
    return (
      <>
        <nav className="navbarAdmin">
          <PixelDreadIcon />
          <Hamburger onClick={handleClick} />
        </nav>
        <div>
          <Outlet />
          {isOpen && <MobileMenu />}
        </div>
      </>

    );  
  }
}

