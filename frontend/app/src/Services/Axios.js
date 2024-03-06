import Axios from "axios";

const Https = Axios.create({
  baseURL: "https://localhost:7183/",
});

const Login = {
  username: "username_teste",
  password: "username_teste@1234",
};

export { Https, Login };
