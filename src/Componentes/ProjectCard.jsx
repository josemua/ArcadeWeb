import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = (props) => {
    return (
        <div className="tarjetaProyecto">
            <div className="tituloProyecto">
                {props.titulo}
            </div>
            <div  className="liderProyecto">
                Lider: {props.lider}
            </div>
            <div  className="faseProyecto">
                Fase: {props.fase}
            </div>
            <div className="estadoProyecto">
                Estado: {props.estado}
            </div>
            <div className="inicioProyecto">
                Fecha inicio: {props.inicio}
            </div>
            <div  className="usuariosProyecto">
                Presupuesto: {props.presupuesto}
            </div>
            <div className="botonesProyecto">
                <Link to={`/user/proyecto/${props.id}`}>
                  <button>
                      Detalles
                  </button>
                </Link>
                <div className=''>
        </div>
        </div>
    </div>
  );
};

export default ProjectCard;
