import axios from "axios";

export const Login = () => {
  try {
    axios
      .post("http://localhost:5000/api/auth/login", {
        username: "admin",
        password: "admin",
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  } catch (e) {
    console.log(e);
  }
};

export const Register = () => {
  try {
    axios
      .post("http://localhost:5000/api/auth/register", {
        username: "admin",
        password: "admin",
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  } catch (e) {
    console.log(e);
  }
};

export const Logout = () => {
  try {
    axios.post("http://localhost:5000/api/auth/logout").then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  } catch (e) {
    console.log(e);
  }
};
