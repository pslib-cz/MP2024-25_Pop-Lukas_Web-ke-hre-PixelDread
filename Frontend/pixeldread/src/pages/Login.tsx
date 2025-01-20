import React, { useState, useContext } from "react";
import { BlogContext, api_url } from "../BlogContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from './Login.module.css';
import '../index.css';
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { state, dispatch } = useContext(BlogContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${api_url}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), 
      })
    
      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }
      
      const data = await response.json();

      dispatch({
        type: 'LOGIN',
        payload: {
          isUserLoggedIn: true,
          email: email,
          token: data.accessToken,
        },
      });
      navigate("/admin/content");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }

  };
  

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    
    <div className={styles.logincontainer}>
      {state.isUserLoggedIn ? (
        <div>
          <p>Logged in as: {state.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/admin/content">Admin</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label> 
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"/></svg>
            <button className="addbutton" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          </div>
          {error && <p>{error}</p>}
          
        </form>
      )}
    </div>
   
  );
};

export default Login;