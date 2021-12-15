import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="cajaHome">
      <img className="logoInicio2" src="https://i.ibb.co/6R25wQ5/arcade-Mesa-de-trabajo-1-Mesa-de-trabajo-1.png" alt="arcade-Mesa-de-trabajo-1-Mesa-de-trabajo-1" border="0"/>
      <div className="cajaMensajes">
        <span className="mensajePrincipal">
          Hola, Bienvenid@ a ArcadeFile, la página web para gestionar tus proyectos
        </span>
        <div className="cajaPreguntas">
          <div className="cajitaPreguntas">
            <span className="mensajePregunta">
            ¿ya estas registrad@?
            </span>
            <Link to="/login" className="loginInicio">
              <i className="bx bx-log-in"></i>
              <span >Ingresa</span>
            </Link>
          </div>
          <div className="cajitaPreguntas">
            <span className="mensajePregunta">
            ¿Nuev@ en la App?
            </span>
            <Link to="/registro" className="loginInicio">
              <i class='bx bx-file'></i>
              <span >Regístrate</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
