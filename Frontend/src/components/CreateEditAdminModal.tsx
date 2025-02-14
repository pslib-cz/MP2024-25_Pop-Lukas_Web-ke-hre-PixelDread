import React, { useState, useEffect } from "react";
import { Admin } from "../types/admin";
import { createAdmin, updateAdmin } from "../api/adminService";

interface CreateEditAdminModalProps {
  admin: Admin | null;
  onClose: () => void;
  onSave: (admin: Admin) => void;
}

const CreateEditAdminModal: React.FC<CreateEditAdminModalProps> = ({ admin, onClose, onSave }) => {
  const [email, setEmail] = useState<string>(admin ? admin.email : "");
  const [password, setPassword] = useState<string>(""); // Pouze pro vytvoření nebo změnu hesla
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (admin) {
      setEmail(admin.email);
    }
  }, [admin]);

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      let savedAdmin: Admin;
      if (admin) {
        savedAdmin = await updateAdmin(admin.id, { email, password });
      } else {
        const secured = "abcXYZ"; // Dummy secured value
        savedAdmin = await createAdmin( email, password, secured);
      }
      onSave(savedAdmin);
    } catch (err: any) {
      setError(err.message || "Error saving admin");
    }
  };

  return (
    <div>
      <h2>{admin ? "Edit Admin" : "Create Admin"}</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      {!admin && (
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
      )}
      <div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>{admin ? "Save" : "Create"}</button>
      </div>
    </div>
  );
};

export default CreateEditAdminModal;
