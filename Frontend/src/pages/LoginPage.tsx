import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={styles["login-page"]}>
        <div className={styles.login}>
          <h2 className={styles.login__title}>Login</h2>
          <form className={styles.login__form} onSubmit={handleSubmit}>
            <div className={styles.login__group}>
              <label className={styles.login__label}>Email:</label>
              <input
                type="email"
                className={styles.login__input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.login__group}>
              <label className={styles.login__label}>Password:</label>
              <input
                type="password"
                className={styles.login__input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className={styles.login__error}>{error}</p>}
            <button type="submit" className={styles.login__button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default LoginPage;
