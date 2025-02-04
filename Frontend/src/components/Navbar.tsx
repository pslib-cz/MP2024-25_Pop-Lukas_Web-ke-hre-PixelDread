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
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
      {isAdmin ? (
        <>
          <Link to="/admin">Admin</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
