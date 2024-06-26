"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Login } from "@/service/Auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingBar from "../Reusables/LoadingBar";

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

const LoginForm: React.FC<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ loading, setLoading }) => {
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
    // Handle form submission here
    setLoading(true);
    try {
      const loginResult = await Login({
        username: values.username,
        password: values.password,
      });
      if (loginResult) {
        toast.success("Successfully logged in!");
        router.push("/home");
        setLoading(false);
      }
    } catch (e) {
      toast.error("Failed to login! Check your credentials!");
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
        <Form className="flex flex-col justify-center items-center  gap-8">
          <div className="flex flex-col justify-center items-center gap-2">
            <label htmlFor="username" className="text-lg font-bold">
              Username
            </label>
            <Field
              type="username"
              name="username"
              className="text-black rounded-md px-3 py-1 border shadow-lg shadow-black hover:border-black"
              placeholder="Username"
            />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <label htmlFor="password" className="text-lg font-bold">
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="text-black rounded-md px-3 py-1 border shadow-lg shadow-black hover:border-black"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" />
          </div>

          <button
            type="submit"
            className="px-10 py-2 border rounded-md hover:bg-blue-500 text-lg font-bold"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
