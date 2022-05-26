import React, { useContext, createContext, useState } from "react";
import Loading from "../components/Loading";
import { useProvideService } from "../Hooks/useProvideService";
const servicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [params, setparam] = useState({});
  const { loading, ...services } = useProvideService(params);

  let lprops = {
    loading,
    size: 15,
    color: "#8EB50D",
  };
  if (loading)
    return (
      <div className="grid h-screen place-items-center">
        <Loading {...lprops} />
      </div>
    );

  return (
    <servicesContext.Provider value={{ ...services, setparam, params }}>
      {children}
    </servicesContext.Provider>
  );
};

export const useServices = () => {
  return useContext(servicesContext);
};
