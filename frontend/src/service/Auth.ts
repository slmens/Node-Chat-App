import axios from "axios";

export const Login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    axios
      .post("http://localhost:5000/api/auth/login", {
        username,
        password,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            localStorage.setItem("token", "loggedIn");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  } catch (e) {
    console.log(e);
  }
};

export const Register = async ({
  fullname,
  username,
  password,
  passwordConfirm,
}: {
  fullname: string;
  username: string;
  password: string;
  passwordConfirm: string;
}): Promise<boolean> => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/signup", {
      fullname,
      username,
      password,
      passwordConfirm,
    });

    if (response.status === 201) {
      localStorage.setItem("token", "loggedIn");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const Logout = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/logout");
    if (response.status === 200) {
      localStorage.removeItem("token");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
