
import { useQuery, useMutation } from "@apollo/client";
import Loading from "Componentes/Loading";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import { Dialog, Tooltip } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { Table } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "context/user";
import { CREAR_INSCRIPCION } from "../../graphql/inscripciones/mutations";
import PrivateComponent from "../../Componentes/PrivateComponent";

const DetallesProyecto = () => {
  
  const { id } = useParams();
  const { userData } = useUser();
  const estudiante = userData._id;
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { id },
  });
    
    const [
      crearInscripcion,{ 
        data: mutationData, 
        loading: mutationLoading, 
        error: mutationError },
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

      const CreacionInscripcion = async () =>{
        crearInscripcion({
          variables: { 
            proyecto: id,
            estudiante: estudiante}
        }); 
        console.log({proyecto: id,
          estudiante: estudiante});
      }

  useEffect(() => {
    if (queryData) {
      toast.success("Proyecto cargado", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [queryError]);

  if (queryLoading) return <Loading />;

  return (
    <div className="contenedor">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2 className="titulo">Datos Proyecto:</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="centrado">
            <th>Nombre</th>
            {Array.from({ length: 1 }).map(
              (
                _,
                presupuesto,
                fechaInicio,
                fechaFin,
                estado,
                fase,
                lider,
                rol
              ) => [
                  <th key={presupuesto}>Presupuesto</th>,
                  <th key={fechaInicio}>Fecha de Inicio</th>,
                  <th key={fechaFin}>Fecha de Fin</th>,
                  <th key={estado}>Estado</th>,
                  <th key={fase}>Fase</th>,
                  <th key={lider}>Lider</th>,
                  <th key={rol}>Rol del Lider</th>,
                ]
            )}
          </tr>
        </thead>
        <tbody>
          {queryData && queryData.Proyecto ? (
            <>
              <tr>
                <td>{queryData.Proyecto.nombre}</td>
                <td>{queryData.Proyecto.presupuesto}</td>
                {queryData.Proyecto.fechaInicio ? (
                  <td>{queryData.Proyecto.fechaInicio.split("T")[0]}</td>
                ) : (
                  <td>{queryData.Proyecto.fechaInicio}</td>
                )}
                {queryData.Proyecto.fechaFin ? (
                  <td>{queryData.Proyecto.fechaFin.split("T")[0]}</td>
                ) : (
                  <td>{queryData.Proyecto.fechaFin}</td>
                )}
                <td>{queryData.Proyecto.estado}</td>
                <td>{queryData.Proyecto.fase}</td>
                <td>{queryData.Proyecto.lider.correo}</td>
                <td>{queryData.Proyecto.lider.rol}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td>No</td>
              <td></td>
              <td>encontramos</td>
              <td></td>
              <td>el</td>
              <td></td>
              <td>proyecto</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2 className="titulo">Objetivos:</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="centrado">
            <th>Tipo</th>
            {Array.from({ length: 1 }).map((_, descripcion) => [
              <th key={descripcion}>Descripcion</th>,
            ])}
          </tr>
        </thead>
        <tbody>
          {queryData.Proyecto.objetivos ? (
            <>
              {queryData.Proyecto.objetivos.map((o) => {
                return (
                  <tr key={o._id}>
                    <td>{o.tipo}</td>
                    <td>{o.descripcion}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td>Proyecto sin</td>
              <td>Objetivos</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/*       <h2 className="titulo">Avances:</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="centrado">
            <th>Fecha</th>
            {Array.from({ length: 1 }).map((_, descripcion, creadoPor) => [
              <th key={descripcion}>Descripcion</th>,
              <th key={creadoPor}>creado Por</th>,
            ])}
          </tr>
        </thead>
        <tbody>
          {queryData.Proyecto.avances ? (
            <>
              {queryData.Proyecto.avances.map((a) => {
                return (
                  <tr key={a._id}>
                    {a.fecha ? (
                      <td>{a.fecha.split("T")[0]}</td>
                    ) : (
                      <td>{a.fecha}</td>
                    )}
                    <td>{a.descripcion}</td>
                    <td>{a.creadoPor.correo}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td></td>
              <td>Proyecto sin Avances</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </Table> */}

      <h2 className="titulo">Avances y Observaciones:</h2>
      <div className="formulario">
        {queryData.Proyecto.avances.map(
          ({ fecha, descripcion, observaciones, creadoPor }, i) => (
            <div key={i}>
              <div className="contentForm">
                <h4 className="centrado">Avance</h4>
                <p>Fecha: {fecha.split("T")[0]}</p>
                <p>Descripción: {descripcion}</p>
                <p>creado por: {creadoPor.correo}</p>
                {observaciones.map((observacion, j) => (
                  <div key={j}>
                    <div className="observacion">
                      <h4 className="centrado">Observacion</h4>
                      <p>{observacion.fecha}</p>
                      <p>{observacion.descripcion}</p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )
        )}
        <Link to={`/user/proyectos/avances/lista`}>
          <i className="bx bx-edit-alt" />
        </Link>

      </div>


      <h2 className="titulo">Inscripciones:</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="centrado">
            <th>Inscritos</th>
          </tr>
        </thead>
        <tbody>
          {queryData.Proyecto.inscripciones ? (
            <>
              <tr>
                <td>{queryData.Proyecto.inscripciones.length}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td>Proyecto sin Inscripciones</td>
            </tr>
          )}
        </tbody>
      </Table>
      <PrivateComponent className="botonesProyecto" roleList={["ESTUDIANTE"]}>
          <button className="apuntador" onClick={() => CreacionInscripcion()}>
            Inscribirse al proyecto
          </button>
        </PrivateComponent>
    </div>
  );
};

export default DetallesProyecto;
