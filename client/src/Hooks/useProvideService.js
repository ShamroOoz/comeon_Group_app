import { fetchFromAPI } from "../Utils/helpers";
import { useState, useEffect, useReducer } from "react";
import { reducer } from "../Reducer/Reduce";
import axios from "axios";
import { initialState, API } from "../Utils/helpers";

export const useProvideService = (params) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      return await fetchFromAPI("users/verify", {
        method: "GET",
      }).then((response) => {
        setUser(response.player);
        return response?.success && setLoading(false);
      });
    };
    let token = getIdToken();
    token
      ? fetchData().catch(async (err) => {
          setUser(null);
          localStorage.clear();
          console.error(err);
          return setLoading(false);
        })
      : setLoading(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getGames = async () => {
      dispatch({ type: "MAKE_REQUEST" });
      const headers = {
        "Content-Type": "application/json",
      };
      const token = localStorage.getItem("userToken");
      if (token) {
        headers["Authorization"] = token;
      }
      try {
        const { data } = await axios.get(API + "/games/getGames", {
          signal: controller.signal,
          headers,
          params: {
            ...params,
          },
        });
        console.log(data);
        dispatch({ type: "GET_DATA", payload: data.games });
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error);
        dispatch({ type: "ERROR" });
      }
    };

    user && getGames();
    return () => {
      controller.abort();
    };
  }, [params, user]);

  const getIdToken = () => {
    return localStorage.getItem("userToken");
  };

  const signin = async (body) => {
    return await fetchFromAPI("users/login", {
      method: "POST",
      body,
    }).then(({ data }) => {
      setUser(data.player);
      localStorage.setItem("userToken", data.token);
      return data.player;
    });
  };

  const signout = async (body) => {
    setLoading(true);
    return await fetchFromAPI("users/logout", {
      method: "POST",
      body,
    }).then((response) => {
      setUser(null);
      localStorage.clear();
      return response?.success && setLoading(false);
    });
  };

  return {
    user,
    loading,
    signin,
    signout,
    state,
  };
};
