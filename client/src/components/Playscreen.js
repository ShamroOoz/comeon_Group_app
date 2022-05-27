/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../Utils/helpers";

const Playscreen = () => {
  let { gameName } = useParams();
  let navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFromAPI(`games/play/${gameName}`);
      setData(data);
    };
    fetchData().catch(() => {
      navigate(`/home/${gameName}`);
    });
  }, [gameName]);

  return (
    <section>
      <div className="container px-6 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-green-600 rounded-lg hover:bg-green-500 md:mx-0 md:w-auto focus:outline-none"
          >
            Go Back
          </button>
        </div>

        <div className="flex justify-center mt-10">
          <div className="container-fluid">
            {data && (
              <iframe
                className="responsive-iframe"
                title={gameName}
                src={data?.link}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playscreen;
