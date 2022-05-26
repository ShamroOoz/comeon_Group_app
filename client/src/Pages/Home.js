import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Notfound from "../components/Notfound";
import Mainscreen from "../components/Mainscreen";
import Playscreen from "../components/Playscreen";

const Home = () => {
  return (
    <Routes>
      <Route path="home" element={<Layout />}>
        <Route index element={<Mainscreen />} />
        <Route path="play/:gameName" element={<Playscreen />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default Home;
