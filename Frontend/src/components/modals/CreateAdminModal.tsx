import React, { useState } from "react";
import { Admin } from "../../types/admin";
import { createAdmin } from "../../api/adminService";

interface CreateAdminModalProps {
  onClose: () => void;
  onSave: (createdAdmin: Admin) => void;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ onClose, onSave }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      // Call your create API
      const secured = "abcXYZ"; // Dummy 'secured' value
      const newAdmin = await createAdmin(email, password, secured);

      // Notify parent we have created a new admin
      onSave(newAdmin);
    } catch (err: any) {
      setError(err.message || "Error creating admin");
    }
  };

  return (
    <div>
      <h2>Create Admin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      <div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
};

export default CreateAdminModal;
