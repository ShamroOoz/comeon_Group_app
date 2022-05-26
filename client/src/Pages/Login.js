import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useServices } from "../Context/ServicesContext";
import { validationChecker } from "../Utils/helpers";
import { ReactComponent as Logo } from "../logo.svg";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const { signin } = useServices();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState({});
  let navigate = useNavigate();

  let lprops = {
    loading,
    size: 15,
    color: "#fff",
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    let validateResult = validationChecker(user);
    if (Object.keys(validateResult).length !== 0) {
      setloading(false);
      return seterror(validateResult);
    }
    seterror({});
    try {
      await signin(user);
      setloading(false);
      navigate("/", { replace: true });
    } catch (err) {
      setloading(false);
      seterror({ ...error, message: err.msg });
    }
  };

  return (
    <section className="grid place-items-center h-screen">
      <div className="container px-4 mx-auto">
        <div className="max-w-sm mx-auto">
          <div className="mb-6 text-center">
            <a className="inline-block mb-6" href="/">
              <Logo className="h-16" />
            </a>
            <h3 className="mb-4 text-2xl md:text-3xl font-bold capitalize">
              Login
            </h3>
            <p className="text-lg text-pink-500 font-medium">
              {error.message && error.message}
            </p>
          </div>
          <form onSubmit={loginSubmit}>
            <div className="mb-6">
              <label
                className="block mb-2 ml-2 text-gray-800 font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                placeholder="abc"
                id="username"
                required
                name="username"
                value={user.username}
                onChange={onChangeInput}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 ml-2 text-ray-800 font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="password"
                placeholder="************"
                id="password"
                required
                name="password"
                value={user.password}
                onChange={onChangeInput}
              />
            </div>

            <button
              className="inline-block disabled:cursor-not-allowed disabled:opacity-50 py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loading {...lprops} /> : " Sign In"}
            </button>
            <p className="text-center">
              <span className="text-xs font-medium">
                Don&rsquo;t have an account?
              </span>
              <button className="inline-block text-xs font-medium text-green-900 hover:text-green-600 hover:underline">
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
