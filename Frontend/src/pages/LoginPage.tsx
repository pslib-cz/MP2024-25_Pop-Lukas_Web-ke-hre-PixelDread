import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { HelmetProvider } from "react-helmet-async";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Použití AuthContextu

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    const success = await login(email, password); 
    setLoading(false);
    if (success) {
      navigate("/admin");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <HelmetProvider>
      <title>Login</title>
    <div className={styles["login-page"]}>
      <h2 className={styles["login-page__title"]}>Login</h2>
      <form className={styles["login-page__form"]} onSubmit={handleSubmit}>
        <div className={styles["login-page__group"]}>
          <label className={styles["login-page__label"]}>Email:</label>
          <input
            type="email"
            className={styles["login-page__input"]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles["login-page__group"]}>
          <label className={styles["login-page__label"]}>Password:</label>
          <input
            type="password"
            className={styles["login-page__input"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles["login-page__error"]}>{error}</p>}
        <button type="submit" className={styles["login-page__button"]} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>    
    </HelmetProvider>

  );
};

export default LoginPage;
