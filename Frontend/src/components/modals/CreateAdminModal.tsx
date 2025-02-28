import React, { useState } from "react";
import { Admin } from "../../types/admin";
import { createAdmin } from "../../api/adminService";

interface CreateAdminModalProps {
  onClose: () => void;
  onSave: (createdAdmin: Admin) => void;
}

const emailRegex = /^\S+@\S+\.\S+$/;

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ onClose, onSave }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [serverError, setServerError] = useState<string | null>(null);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const errors = {
    email: !email
      ? "Email is required"
      : !emailRegex.test(email)
      ? "Email is invalid"
      : "",
    password: password
      ? password.length >= 6
        ? ""
        : "Password must be at least 6 characters"
      : "Password is required",
    confirmPassword: confirmPassword
      ? confirmPassword === password
        ? ""
        : "Passwords do not match"
      : "Confirm Password is required",
  };

  const isValid = !errors.email && !errors.password && !errors.confirmPassword;

  const handleSubmit = async () => {
    setTouched({ email: true, password: true, confirmPassword: true });
    if (!isValid) return;

    try {
      const secured = "abcXYZ"; // Dummy 'secured' value
      const newAdmin = await createAdmin(email, password, secured);
      onSave(newAdmin);
    } catch (err: any) {
      setServerError(err.message || "Error creating admin");
    }
  };

  return (
    <div>
      <h2>Create Admin</h2>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        />
        {touched.email && errors.email && (
          <p style={{ color: "red", margin: 0 }}>{errors.email}</p>
        )}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          placeholder="Minimum of 6 characters"
        />
        {touched.password && errors.password && (
          <p style={{ color: "red", margin: 0 }}>{errors.password}</p>
        )}
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
          placeholder="Confirm your password"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <p style={{ color: "red", margin: 0 }}>{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit} disabled={!isValid}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateAdminModal;
