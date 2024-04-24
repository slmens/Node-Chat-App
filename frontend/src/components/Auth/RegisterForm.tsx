import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface RegistrationFormValues {
  fullName: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: RegistrationFormValues = {
  fullName: "",
  username: "",
  password: "",
  passwordConfirm: "",
};

const RegistrationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const RegistrationForm: React.FC = () => {
  const handleSubmit = (values: RegistrationFormValues) => {
    // Handle form submission here
    console.log("Form submitted with values:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="fullName">Full Name</label>
            <Field type="text" name="fullName" className="text-black" />
            <ErrorMessage name="fullName" component="div" />
          </div>

          <div className="flex flex-col justify-center items-center">
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" className="text-black" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className="flex flex-col justify-center items-center">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className="text-black" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div className="flex flex-col justify-center items-center">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <Field
              type="password"
              name="passwordConfirm"
              className="text-black"
            />
            <ErrorMessage name="passwordConfirm" component="div" />
          </div>

          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
