import React, { useEffect, useState } from "react";
import Navbar from "../Componentes/Navbars";
import { Outlet } from "react-router-dom";
import { useAuth } from "context/auth";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import { toast } from "react-toastify";
import Loading from "Componentes/Loading";

const PublicLayout = () => {
  const {setToken} = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [
    refreshToken,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    if (mutationData) {
      if (mutationData.refreshToken.token) {
        setToken(mutationData.refreshToken.token);
      } 
      setLoadingAuth(false);
    }
  }, [mutationData, setToken, loadingAuth]);


  useEffect(() => {
    if (mutationError) {
      toast.error("Error validando el token");
    }
  }, [mutationError]);

  if (mutationLoading || loadingAuth) return <Loading />;

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
