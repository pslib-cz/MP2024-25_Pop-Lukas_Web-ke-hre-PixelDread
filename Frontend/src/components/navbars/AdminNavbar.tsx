import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar: React.FC = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <Link to="/admin" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>
      <Link to="/admin/admins" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
        Manage Admins
      </Link>
      {/* Přidejte další odkazy podle potřeby */}
    </nav>
  );
};

export default AdminNavbar;
