import React, { useState } from "react";
import { useServices } from "../Context/ServicesContext";
import Search from "./Search";
import Loading from "./Loading";
import Categories from "./Categories";
import Games from "./Games";

const Mainscreen = () => {
  const {
    state: { games, categories, loading, error },
    setparam,
  } = useServices();
  const [isActive, setisActive] = useState(0);

  let lprops = {
    loading,
    size: 15,
    color: "#8EB50D",
  };

  const filterListner = (id) => {
    setisActive(id);
    setparam((prevparams) => {
      return { ...prevparams, filter: id };
    });
  };
  return (
    <section>
      <div className="container px-6 py-5 mx-auto">
        <Search />
        <div className="flex items-center justify-center">
          <div className="flex items-center p-1 border border-green-500/50 rounded-xl">
            {categories &&
              categories.map((cat) => (
                <Categories
                  key={cat.id}
                  {...cat}
                  filterListner={filterListner}
                  isActive={isActive}
                />
              ))}
          </div>
        </div>

        {loading && (
          <div className="grid h-screen place-items-center">
            <Loading {...lprops} />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center">
            <div className="w-1/2 px-8 py-6 my-4 text-white bg-red-400 rounded">
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 mt-3 border-2 border-gray-100 rounded-lg shadow-md">
          <h1 className="mt-2 text-3xl font-semibold text-center text-gray-800 capitalize">
            Games
          </h1>
          {games.length > 0 ? (
            games.map((gms) => <Games key={gms.code} {...gms} />)
          ) : (
            <div className="flex items-center justify-center">
              <div className="w-1/2 px-8 py-6 my-4 text-white bg-red-400 rounded">
                <p>No result Found related to this REQUEST....</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Mainscreen;
