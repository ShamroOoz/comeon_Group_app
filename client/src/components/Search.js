import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { useServices } from "../Context/ServicesContext";

const Search = () => {
  const { setparam, params } = useServices();

  const handleparamchange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setparam((prevparams) => {
      return { ...prevparams, [param]: value };
    });
  };
  return (
    <div className="max-w-2xl mx-auto my-3 text-center text-gray-500">
      <div className="relative mx-auto md:w-80">
        <SearchIcon className="absolute w-5 h-5 transform -translate-y-1/2 top-1/2 left-4" />
        <input
          className="w-full py-3 pl-12 pr-4 leading-tight text-gray-900 placeholder-gray-500 border rounded-lg border-coolGray-200 shadow-xsm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="search"
          name="search"
          placeholder="Search Game"
          value={params.search || ""}
          onChange={handleparamchange}
        />
      </div>
    </div>
  );
};

export default Search;
