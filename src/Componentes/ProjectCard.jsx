import React, { useEffect, useState, useRef } from 'react';
import { Dialog, Tooltip } from '@material-ui/core';
import { CREAR_INSCRIPCION } from "../graphql/inscripciones/mutations";
import useFormData from "../hooks/useFormData";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import PrivateComponent from "./PrivateComponent";

const ProjectCard = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const CrearInscripcion = async () =>{

    const [
      ,{ data:  mutationData, error: mutationError },
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
    }
    return (
        <div className="tarjetaProyecto">
            <div className="tituloProyecto">
                {props.titulo}
            </div>
            <div className="estadoProyecto">
                Estado: {props.estado}
            </div>
            <div  className="liderProyecto">
                Lider: {props.lider}
            </div>
            {/* <div className="objetivosProyecto">
                {props.objetivos}
            </div> */}
            <div  className="usuariosProyecto">
              <span>Usuarios</span>
                {props.usuarios}
            </div>
            <div className="botonesProyecto">
                <button>
                    Detalles
                </button>
                <div className=''>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
              <Tooltip title='Eliminar producto' arrow>
                    <button className="apuntador" onClick={() => setOpenDialog(true)}>
                      Registrarse
                    </button>
                  </Tooltip>
              </PrivateComponent>
              
        </div>
          <Dialog open={openDialog} >
            <div className='cuadroDialogo'>
              <h1 className='textoIncripcion'>
                ¿Está segur@ de solicitar inscribirse en este proyecto?
              </h1>
              <div className='opcionesIncripcion'>
                <button onClick={() => CrearInscripcion()} className='botonSi'> 
                  Sí
                </button>
                <button onClick={() => setOpenDialog(false)} className='botonNo'>
                  No
                </button>
              </div>
            </div>
          </Dialog>
        </div>
    </div>
  );
};

export default ProjectCard;
