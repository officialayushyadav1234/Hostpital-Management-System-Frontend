// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./ElRouter/Router";

const App = () => {
  return <RouterProvider router={myRoutes} />;
};

export default App;
