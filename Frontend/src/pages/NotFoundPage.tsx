import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or another error occurred.</p>
      <button onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
