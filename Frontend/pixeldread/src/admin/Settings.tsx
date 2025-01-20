import React, { useState, useContext, useEffect } from "react";
import { BlogContext } from "../BlogContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api_url } from "../BlogContext";
interface UpdateAdminPayload {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Settings: React.FC = () => {
  const { state, dispatch } = useContext(BlogContext);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>("");

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
          const response = await fetch(`${api_url}/Admin/CurrentUserId`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${state.userToken}`,
              }
          });
  
          if (!response.ok) {
              console.error(`Failed to fetch admin ID. Status: ${response.status}`);
              return;
          }
  
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
              const data = await response.json();
              dispatch({ type: 'SET_ADMIN_ID', payload: data });
          } else {
              const adminId = await response.text();
              dispatch({ type: 'SET_ADMIN_ID', payload: adminId });
          }
      } catch (error) {
          console.error('Error fetching admin ID:', error);
      }
  };
  fetchAdminId()
}
, [state.userToken, dispatch]);
  const formikEmail = useFormik<UpdateAdminPayload>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Updating email...");
        console.log(values);
        
        // HTTP PUT požadavek na aktualizaci emailu
        const response = await fetch(`${api_url}/Admin/UpdateEmail/${state.adminId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${state.userToken}`,
          },
          body: JSON.stringify(values),
        });
        console.log("Response:", response);
        setShowModal(false);
      } catch (error) {
        console.error("Error updating email:", error);
      }
    },
  });
  const formikPassword = useFormik<UpdateAdminPayload>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
      .min(6, "Minimum 6 characters")
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Updating password...");
        console.log(values);
        
        // HTTP PUT požadavek na aktualizaci hesla
        const response = await fetch(`${api_url}/Admin/UpdatePassword/${state.adminId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${state.userToken}`,
          },
          body: JSON.stringify(values),
        });
        console.log("Response:", response);
        setShowModal(false);
      } catch (error) {
        console.error("Error updating password:", error);
      }
    },
  });

  const handleOpenModal = (type: string) => {
    setShowModal(true);
    setModalType(type);
  };

  return (
    <div>
      <h1>Settings</h1>
      <button onClick={() => handleOpenModal("email")}>
        Update Email
      </button>
      <button onClick={() => handleOpenModal("password")}>
        Update Password
      </button>
      <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalType === "email" ? "Edit Admin Email" : "Change Admin Password"}</h2>
            {modalType === "email" ? (
              <form onSubmit={formikEmail.handleSubmit}>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formikEmail.values.email}
                    onChange={formikEmail.handleChange}
                    onBlur={formikEmail.handleBlur}
                  />
                  {formikEmail.touched.email && formikEmail.errors.email ? (
                    <div>{formikEmail.errors.email}</div>
                  ) : null}
                </label>
                <div className="modal-actions">
                  <button type="submit">Save Email</button>
                  <button type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={formikPassword.handleSubmit}>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={formikPassword.values.password}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                  />
                  {formikPassword.touched.password && formikPassword.errors.password ? (
                    <div>{formikPassword.errors.password}</div>
                  ) : null}
                </label>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formikPassword.values.confirmPassword}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                  />
                  {formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword ? (
                    <div>{formikPassword.errors.confirmPassword}</div>
                  ) : null}
                </label>
                <div className="modal-actions">
                  <button type="submit">Change Password</button>
                  <button type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
