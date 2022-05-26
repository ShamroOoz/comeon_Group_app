import { Routes, Route, Navigate } from "react-router-dom";
import { useServices } from "./Context/ServicesContext";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

//
const App = () => {
  const { user } = useServices();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" replace={true} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace={true} />}
        />
        <Route
          path="/*"
          element={user ? <Home /> : <Navigate to="/" replace={true} />}
        />
      </Routes>
    </>
  );
};

export default App;
