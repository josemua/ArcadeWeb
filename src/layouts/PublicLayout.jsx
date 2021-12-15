import React, { useEffect, useState } from "react";
import Navbar from "../Componentes/Navbars";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import Loading from "Componentes/Loading";
import { useAuth } from "context/auth";
import "react-toastify/dist/ReactToastify.css";

const PublicLayout = () => {
  const navigate = useNavigate();
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
    try {
    if (mutationData) {
      if (mutationData.refreshToken.token) {
        setToken(mutationData.refreshToken.token);
      } 
      setLoadingAuth(false);
    }
  } catch (error) {
      navigate("/login");
      toast.error("No pudimos verificar tu identidad, vuelve a logearte");
    }
  }, [mutationData, setToken, loadingAuth, navigate]);


  useEffect(() => {
    if (mutationError) {
      toast.error("Error validando el token");
    }
  }, [mutationError]);

  if (mutationLoading || loadingAuth) return <Loading />;

  return (
    <div className="fondo">
      <Navbar />
      <div className="contentPage">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default PublicLayout;
