import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BlogContext } from "../BlogContext";
import { useContext } from "react";
import Categories from "./Categories";
import CategoryAdder from "../components/CategoryAdder";
import { event } from "jquery";

// Validation Schemas
const Step1Schema = Yup.object({
  name: Yup.string().required("Name is required"),
  Categories: Yup.array().min(1, "At least one category is required"),
});

const Step2Schema = Yup.object({
  content1: Yup.string().required("Content is required"),
});

const Step3Schema = Yup.object({
  content2: Yup.string().required("Content is required"),
});



// Final Combined Values Type


interface FormValues {
  name: string;
  content1: string;
  content2: string;
}

const CreateContent: React.FC = () => {
  const [step, setStep] = useState(1);

  const initialValues: FormValues = {
    name: "",
    content1: "",
    content2: "",
  };

  const nextStep = () => {setStep((prev) => prev + 1)
  }
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (values: FormValues) => {
    console.log("Final Submitted Values:", values);
    alert("Content created successfully!");
  };

  return (
    <div>
      <h1>Create new content</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={
          step === 1
            ? Step1Schema
            : step === 2
            ? Step2Schema
            : step === 3
            ? Step3Schema
            : null
        }
        onSubmit={(values, { setTouched }) => {
          if (step < 5) {
            setTouched({});
            nextStep();
          } else {
            handleSubmit(values);
          }
        }}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            {step === 1 && (
              <div>
                <div>
                  <label htmlFor="title">Name</label>
                  <Field id="name" name="name" placeholder="Enter name" />
                  <div className="errorInput">
                    <ErrorMessage name="title" />
                  </div>
                </div>
                <button type="button" onClick={nextStep} disabled={!isValid}>
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <div>
                  <label htmlFor="content1">Content Section 1</label>
                  <Field id="content1" name="content1" placeholder="Enter content for section 1" />
                  <div className="errorInput">
                    <ErrorMessage name="content1" />
                  </div>
                </div>
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={nextStep} disabled={!isValid}>
                  Next
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <div>
                  <label htmlFor="content2">Content Section 2</label>
                  <Field id="content2" name="content2" placeholder="Enter content for section 2" />
                  <div className="errorInput">
                    <ErrorMessage name="content2" />
                  </div>
                </div>
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={nextStep} disabled={!isValid}>
                  Next
                </button>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2>Preview</h2>
                <div>
                  <strong>Title:</strong> {initialValues.name || "N/A"}
                </div>
                <div>
                  <strong>Content Section 1:</strong> {initialValues.content1 || "N/A"}
                </div>
                <div>
                  <strong>Content Section 2:</strong> {initialValues.content2 || "N/A"}
                </div>
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2>Success</h2>
                <p>Your content has been successfully created!</p>
                <button type="button" onClick={() => setStep(1)}>
                  Create Another
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateContent;
