import React from "react";
import Navbar from "../Componentes/Navbars";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {


//  return isAuthenticated ? (
  return (
    <>
      <Navbar />
      <div className="fondo">
        Este es el private Layout
      <Outlet />
      </div>
    </>
  // ) : (
  //   <div>
  //     <h1>No estas autorizado para hacer eso ¯\_(ツ)_/¯ </h1>
  //   </div>
  );
};

export default PrivateLayout;
