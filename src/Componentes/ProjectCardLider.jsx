import React from 'react';
import {Link } from "react-router-dom";
import PrivateComponent from "./PrivateComponent";

const ProjectCardLider = (props) => {
    
    return (
        <div className="tarjetaProyecto">
            <div className="tituloProyecto">
                {props.titulo}
            </div>
            <div  className="liderProyecto">
                Lider: {props.lider}
            </div>
            <div  className="faseProyecto">
                Fase: {props.usuarios}
            </div>
            <div className="estadoProyecto">
                Estado: {props.estado}
            </div>
            <div className="inicioProyecto">
                Fecha inicio: {props.inicio}
            </div>
            <div  className="usuariosProyecto">
            Cantidad de Usuarios: {props.usuarios}
            </div>
            <div className="botonesProyecto">
                <Link to={`/user/proyecto/${props.id}`}>
                  <button>
                      Detalles
                  </button>
                </Link>
                <div className=''>
                  <PrivateComponent roleList={["LIDER"]}>
                  <Link to={`/user/proyecto/editar/${props.id}`}>
                  <button>
                      Editar
                  </button>
                </Link>
              </PrivateComponent>
              </div>
        </div>
    </div>
  );
};

export default ProjectCardLider;
