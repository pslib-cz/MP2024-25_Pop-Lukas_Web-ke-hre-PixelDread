import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { BlogContext } from "../BlogContext";
export default function Admin() {
  const { state } = useContext(BlogContext);
  if(!state.isUserLoggedIn){
    return (
      <>
      <h1>Admin</h1>
      <h2>Access Denied</h2>
      <Link to="/login">Login</Link>
      </>
    )
  }
  else{
    return (
      <>
      <div>
        <nav>
          <Link to="settings">Settings</Link> |{" "}
          <Link to="statistics">Statistics</Link> |{" "}
          <Link to="categories">Categories</Link> |{" "}
          <Link to="content">Content</Link> |{" "}
          <Link to="createCategory">Create Category</Link> |{" "}
          <Link to="createContent">Create Content</Link>
        </nav>
        <h1>Admin</h1>
        <Outlet />
      </div>
      </>
    )
  }
}
