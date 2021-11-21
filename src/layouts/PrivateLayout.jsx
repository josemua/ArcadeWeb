import React from "react";
import { useAuth0  } from "@auth0/auth0-react";
import Navbar from "../componentes/Navbars";
import PrivateRoutes from "../componentes/PrivateRoutes";
import Loading from "../componentes/Loading";

const PrivateLayout = ({ children }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <PrivateRoutes>
        <Navbar />
        Este es el private Layout
        <div className="flex w-full">{children}</div>
      </PrivateRoutes>
    </div>
  );
};

export default PrivateLayout;
