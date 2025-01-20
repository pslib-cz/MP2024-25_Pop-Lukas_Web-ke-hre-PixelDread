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
      });
    
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
    <div className="flexcontainer column center">
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
              <div className="inputWithLabel">
                <label htmlFor="email">Email:</label> 
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="inputWithLabel last">
                <label htmlFor="password">Password:</label>
                  <div className="inputWithLabel__password">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="togglePasswordButton"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                          <g fill="currentColor">
                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/>
                            <path fillRule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566a7.003 7.003 0 0 1 13.238.006a.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28M11 8a3 3 0 1 1-6 0a3 3 0 0 1 6 0" clipRule="evenodd"/>
                          </g>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/>
                        </svg>
                      )}
                    </button>
                  </div>
              </div>

              <button className="addbutton" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              {error && <p>{error}</p>}
            </div>  
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
