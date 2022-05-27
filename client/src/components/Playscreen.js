/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../Utils/helpers";

const Playscreen = () => {
  let { gameName } = useParams();
  let navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFromAPI(`games/play/${gameName}`);
      setData(data);
    };
    fetchData().catch(() => {
      navigate(`/home/${gameName}`);
    });
  }, [gameName]);

  return <div>Playscreen</div>;
};

export default Playscreen;
