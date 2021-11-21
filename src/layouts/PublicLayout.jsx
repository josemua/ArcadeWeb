import React from "react";
import { useAuth0  } from "@auth0/auth0-react";
import Navbar from "../componentes/Navbars";
import Loading from "../componentes/Loading";

const PublicLayout = ({ children }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar/>
      Este es el public Layout
      {children}
    </div>
  );
};

export default PublicLayout;
