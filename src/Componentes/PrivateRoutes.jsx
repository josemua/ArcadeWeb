import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Outlet/>
  ) : (
    <div>
      <h1>No estas autorizado para hacer eso ¯\_(ツ)_/¯ </h1>
    </div>
  );
};

export default PrivateRoutes;
