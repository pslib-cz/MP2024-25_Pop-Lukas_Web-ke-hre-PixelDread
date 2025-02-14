import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar: React.FC = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <Link to="/admin" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>
      <Link to="/admin/manageAdmins" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
        Manage Admins
      </Link>
      <Link to="/" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
        Home
      </Link>
    </nav>
  );
};

export default AdminNavbar;
