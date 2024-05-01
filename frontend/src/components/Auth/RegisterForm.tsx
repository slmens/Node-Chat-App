import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Register } from "@/service/Auth.service";

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
  const router = useRouter();

  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      const registerResult = await Register({
        fullname: values.fullName,
        username: values.username,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      });

      if (registerResult) {
        router.push("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col gap-7 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-1">
            <label htmlFor="fullName" className="text-lg font-bold">
              Full Name
            </label>
            <Field
              type="text"
              name="fullName"
              className="text-black rounded-md px-3 py-1 border shadow-lg shadow-black hover:border-black"
              placeholder="Full Name"
            />
            <ErrorMessage name="fullName" component="div" />
          </div>

          <div className="flex flex-col justify-center items-center gap-1">
            <label htmlFor="username" className="text-lg font-bold">
              Username
            </label>
            <Field
              type="text"
              name="username"
              className="text-black rounded-md px-3 py-1 border shadow-lg shadow-black hover:border-black"
              placeholder="Username"
            />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className="flex flex-col justify-center items-center gap-1">
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

          <div className="flex flex-col justify-center items-center gap-1">
            <label htmlFor="passwordConfirm" className="text-lg font-bold">
              Confirm Password
            </label>
            <Field
              type="password"
              name="passwordConfirm"
              className="text-black rounded-md px-3 py-1 border shadow-lg shadow-black hover:border-black"
              placeholder="Confirm Password"
            />
            <ErrorMessage name="passwordConfirm" component="div" />
          </div>

          <button
            type="submit"
            className="px-10 py-2 border rounded-md hover:bg-blue-500 text-lg font-bold"
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
