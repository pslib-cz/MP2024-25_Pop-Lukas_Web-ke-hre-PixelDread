import React, { useState, useContext } from "react";
import { BlogContext, api_url } from "../BlogContext";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
          token: data.token,
          
        },
      });

      console.log("Login successful:", data, state);
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
    
    <div>
      {state.isUserLoggedIn ? (
        <div>
          <p>Logged in as: {state.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/admin">Admin</Link>
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          {error && <p>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;