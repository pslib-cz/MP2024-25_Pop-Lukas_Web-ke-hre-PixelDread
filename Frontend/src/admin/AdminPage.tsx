import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AppContext } from "../AppContext";
const AdminPage = () => {
    const { state } = useContext(AppContext);

    if(!state.isLoggedIn){
      return (
        <>
            <p>Access denied</p>
            <Link to="/login">Login</Link>
        </>
      )
    }
    else{
      return (
        <>
            <h1>Admin Page</h1>
            <Outlet />
        </>
      );  
    }
  }
  export default AdminPage;