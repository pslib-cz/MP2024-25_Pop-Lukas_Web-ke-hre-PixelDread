import React from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HelmetProvider>
    <title>404 - Page Not Found</title>
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or another error occurred.</p>
      <button onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  </HelmetProvider>
    
  );
};

export default NotFoundPage;
