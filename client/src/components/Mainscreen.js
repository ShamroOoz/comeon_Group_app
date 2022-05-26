import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { useServices } from "../Context/ServicesContext";

const Mainscreen = () => {
  const { setparam, params } = useServices();
  const handleparamchange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setparam((prevparams) => {
      return { ...prevparams, [param]: value };
    });
  };

  return (
    <section>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize">
          Games
        </h1>

        <div className="max-w-2xl mx-auto my-6 text-center text-gray-500">
          <div className="relative mx-auto md:w-80">
            <SearchIcon className="absolute w-5 h-5 transform -translate-y-1/2 top-1/2 left-4" />
            <input
              className="w-full py-3 pl-12 pr-4 leading-tight text-gray-900 placeholder-gray-500 border rounded-lg border-coolGray-200 shadow-xsm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="search"
              name="search"
              placeholder="Search"
              value={params.search || ""}
              onChange={handleparamchange}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center p-1 border border-green-500/50 rounded-xl">
            <button className="px-4 py-2 text-sm font-medium text-white capitalize bg-green-500 md:py-3 rounded-xl md:px-12">
              All
            </button>
            <button className="px-4 py-2 mx-4 text-sm font-medium text-green-500 capitalize md:py-3 focus:outline-none hover:bg-green-600 hover:text-white rounded-xl md:mx-8 md:px-12">
              Video Slots
            </button>
            <button className="px-4 py-2 text-sm font-medium text-green-500 capitalize md:py-3 focus:outline-none hover:bg-green-600 hover:text-white rounded-xl md:px-12">
              Slot Machines
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-3 border-2 border-gray-100 rounded-lg shadow-md">
          <div className="lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
              <div className="lg:w-1/2">
                <div className="h-64 bg-cover lg:rounded-lg lg:h-full"></div>
              </div>

              <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
                  Build Your New
                  <span className="text-blue-600 dark:text-blue-400">Idea</span>
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem modi reprehenderit vitae exercitationem aliquid dolores
                  ullam temporibus enim expedita aperiam mollitia iure
                  consectetur dicta tenetur, porro consequuntur saepe
                  accusantium consequatur.
                </p>

                <div className="mt-8">
                  <a
                    href="/"
                    className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700"
                  >
                    Start Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mainscreen;
