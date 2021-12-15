import React, { useEffect, useState, useRef } from 'react';
import { Dialog, Tooltip } from '@material-ui/core';
import { CREAR_INSCRIPCION } from "../graphql/inscripciones/mutations";
import { useParams, Link } from "react-router-dom";
import { useUser } from "context/user";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import PrivateComponent from "./PrivateComponent";

const ProjectCard = (props) => {
  const { userData } = useUser();
    const proyecto = props.id;
    const estudiante = userData._id;

    const [openDialog, setOpenDialog] = useState(false);
    const CreacionInscripcion = async () =>{
      crearInscripcion({
        variables: {proyecto: proyecto, estudiante: estudiante}
      }); 
      console.log(proyecto, estudiante)
    }
    
    const [
      crearInscripcion,{ data: mutationData, loading: mutationLoading, error: mutationError },
    ] = useMutation(CREAR_INSCRIPCION);

    useEffect(() => {
      if (mutationData) {
        toast.success("Inscripcion creada correctamente");
      }
    }, [mutationData]);

    useEffect(() => {
      if (mutationError) {
        toast.error("Error creando la inscripcion");
      }
      }, [mutationError]);
    
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
