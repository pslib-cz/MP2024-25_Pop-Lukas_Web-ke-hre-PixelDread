import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authService";

const Navbar: React.FC = () => {
  const isAdmin = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>{" "}
        <Link to="/post">Post</Link>{" "}
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>
      <div>
        {isAdmin ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
