import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header"
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Header/>
      <Outlet/>
    </div>
  );
};

export default App;