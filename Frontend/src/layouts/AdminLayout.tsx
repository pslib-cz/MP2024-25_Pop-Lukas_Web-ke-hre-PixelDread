import { Navigate, Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
