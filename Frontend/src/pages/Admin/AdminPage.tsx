import React from "react";
import { HelmetProvider } from "react-helmet-async";
const AdminPage: React.FC = () => {
  return (
    <HelmetProvider>
    <title>Admin</title>
    <div className="admin-page">
      <h1 className="admin-page__title">Admin Dashboard</h1>
      <p>Welcome to the admin panel.</p>
    </div>
    </HelmetProvider>
  );
};

export default AdminPage;
