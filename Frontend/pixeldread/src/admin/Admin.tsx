import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { BlogContext } from "../BlogContext";
import NavbarAdmin from "./NavbarAdmin";
export default function Admin() {
  const { state } = useContext(BlogContext);
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
        <NavbarAdmin />
        <Outlet />
      </>

    );  
  }
}

