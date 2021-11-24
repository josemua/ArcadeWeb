import React from "react";
import Navbar from "../Componentes/Navbars";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <Navbar/>
      Este es el public Layout
      <Outlet/>
    </div>
  );
};

export default PublicLayout;
