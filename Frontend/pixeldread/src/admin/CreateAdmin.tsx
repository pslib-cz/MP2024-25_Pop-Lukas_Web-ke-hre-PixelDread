import React, { useState, useContext } from "react";
import { api_url } from "../BlogContext";
import { BlogContext } from "../BlogContext";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";

const CreateAdmin = () => {
  const { state } = useContext(BlogContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum is 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, setErrors }: any) => {
    const { email, password } = values;
    const secured = "abcXYZ";

    try {
      const response = await fetch(`${api_url}/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        body: JSON.stringify({ email, password, secured }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error("Registration failed. Please try again.");
      }

      setSuccessMessage(`User: ${email} successfully registered!`);
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ email: err.message });
      } else {
        setErrors({ email: "An unknown error occurred." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="register-form">
            <div className={`form-group ${errors.email && touched.email ? "has-error" : ""}`}>
              <label htmlFor="email">Email:</label>
              <div>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                  />
                )}
                
              </Field>
              </div>
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className={`form-group ${errors.password && touched.password ? "has-error" : ""}`}>
              <label htmlFor="password">Password:</label>
              <div className="password-field" style={{ position: "relative" }}>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={`form-control ${
                        errors.password && touched.password ? "is-invalid" : ""
                      }`}
                    />
                  )}
                </Field>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    padding: "0",
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><g fill="currentColor"><path d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/><path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566a7.003 7.003 0 0 1 13.238.006a.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28M11 8a3 3 0 1 1-6 0a3 3 0 0 1 6 0" clip-rule="evenodd"/></g></svg>  
                  : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/></svg>}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div
              className={`form-group ${
                errors.confirmPassword && touched.confirmPassword ? "has-error" : ""
              }`}
            >
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="password-field" style={{ position: "relative" }}>
                <Field name="confirmPassword">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      className={`form-control ${
                        errors.confirmPassword && touched.confirmPassword ? "is-invalid" : ""
                      }`}
                    />
                  )}
                </Field>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    padding: "0",
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><g fill="currentColor"><path d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/><path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566a7.003 7.003 0 0 1 13.238.006a.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28M11 8a3 3 0 1 1-6 0a3 3 0 0 1 6 0" clip-rule="evenodd"/></g></svg>
                   : 
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/></svg>}
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            {successMessage && <p className="success-message">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAdmin;
