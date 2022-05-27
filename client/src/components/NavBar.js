import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import { useServices } from "../Context/ServicesContext";
//Link Active Logic
const isActive = ({ isActive }) =>
  [
    "text-gray-800 transition-colors duration-200 transform dark:text-gray-200 border-b-2  hover:border-green-500  mx-1.5 sm:mx-6",
    isActive ? "border-green-500" : " ",
  ]
    .filter(Boolean)
    .join(" ");

const NavBar = () => {
  const { signout, user } = useServices();
  //logout
  const logoutSubmit = async () => {
    await signout({ username: user.name.split(" ")[0].toLowerCase() });
  };

  return (
    <nav className="flex items-center justify-center bg-white shadow dark:bg-gray-800">
      <Logo className="w-60 h-10  mx-1.5 sm:mx-6 cursor-pointer " />

      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <NavLink to="/home" className={isActive}>
          HOME
        </NavLink>

        <button
          type="button"
          className={isActive.toString()}
          onClick={() => logoutSubmit()}
        >
          LOG OUT
        </button>
      </div>

      <div className="hidden w-1/2 md:flex">
        <div className="flex flex-col items-center justify-center mx-8">
          <a
            href="/"
            className="block font-semibold text-gray-700 dark:text-gray-200"
          >
            {user?.name}
          </a>
          <span className="block text-xs text-gray-600 dark:text-gray-300">
            {user?.event}
          </span>
        </div>

        <img
          className="object-cover h-10 rounded-full"
          src={user?.avatar}
          alt="Avatar"
        />
      </div>
    </nav>
  );
};

export default NavBar;
