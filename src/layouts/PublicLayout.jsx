import React from "react";
import Navbar from "../Componentes/Navbars";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="fondo">
      <Navbar/>
      <div className="contentPage">
      <Outlet/>
      </div> 
    </div>
  );
};

export default PublicLayout;
