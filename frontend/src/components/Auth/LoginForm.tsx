"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Login } from "@/service/Auth.service";
import { useRouter } from "next/navigation";

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
    // Handle form submission here

    try {
      const loginResult = await Login({
        username: values.username,
        password: values.password,
      });
      console.log(loginResult);
      if (loginResult) {
        router.push("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="username">Username</label>
            <Field type="username" name="username" className="text-black" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className="flex flex-col justify-center items-center">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className="text-black" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
