import React from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Games = ({ name, description, icon, code }) => {
  return (
    <div className="max-w-lg p-5 mx-3 rounded-lg shadow-lg md:flex md:mx-auto md:max-w-4xl">
      <img
        className="object-fill w-full rounded-lg md:w-1/5 "
        src={icon}
        alt={name}
      />
      <div className="w-full px-4 py-4 bg-white rounded-lg ">
        <div className="flex items-center">
          <h2 className="text-xl font-medium text-gray-800 ">{name}</h2>
        </div>
        <p className="my-4 text-sm text-gray-700">{description}</p>
        <div className="flex items-center justify-end">
          <Link
            to={`play/${code}`}
            className="flex px-6 py-2 text-sm font-medium leading-5 text-center text-white capitalize bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none"
          >
            Play now
            <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Games;
