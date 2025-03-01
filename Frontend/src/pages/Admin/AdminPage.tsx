import React from "react";
import { Helmet } from "react-helmet-async";
import { HelmetProvider } from "react-helmet-async";
const AdminPage: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin</title>
      </Helmet>
    <div className="admin-page">
      <h1 className="admin-page__title">Admin Dashboard</h1>
      <p>Welcome to the admin panel.</p>
      <button onClick={() =>
      {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      }>Logout</button>
    </div>
    </HelmetProvider>
  );
};

export default AdminPage;
