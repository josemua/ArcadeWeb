import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h2 className="titulo">
        Bienvenidos a la App de gestión de proyectos ArcadeWeb
      </h2>
      {!isAuthenticated && (
        <>
          <p>Haz click en login para ingresar</p>
          <p>¡Registrate, es gratis!</p>
        </>
      )}
      {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};
