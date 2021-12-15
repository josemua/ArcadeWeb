import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "Componentes/Loading";
import { toast } from "react-toastify";
import PrivateRoutes from "Componentes/PrivateRoutes";
import { Table } from "react-bootstrap";
import { APROBAR_PROYECTO } from "graphql/proyectos/mutations";
import { INACTIVAR_PROYECTO } from "graphql/proyectos/mutations";
import { TERMINAR_PROYECTO } from "graphql/proyectos/mutations";
import { REACTIVAR_PROYECTO } from "graphql/proyectos/mutations";

const EditarProyectoAdmin = () => {
  const { id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { id },
  });

  const [
    aprobarProyecto,
    {
      data: aprobarProyectoData,
      loading: aprobarProyectoLoading,
      error: aprobarProyectoError,
    },
  ] = useMutation(APROBAR_PROYECTO, {
    variables: { id },
  });

  const [
    inactivarProyecto,
    {
      data: inactivarProyectoData,
      loading: inactivarProyectoLoading,
      error: inactivarProyectoError,
    },
  ] = useMutation(INACTIVAR_PROYECTO, {
    variables: { id },
  });

  const [
    terminarProyecto,
    {
      data: terminarProyectoData,
      loading: terminarProyectoLoading,
      error: terminarProyectoError,
    },
  ] = useMutation(TERMINAR_PROYECTO, {
    variables: { id },
  });

  const [
    reactivarProyecto,
    {
      data: reactivarProyectoData,
      loading: reactivarProyectoLoading,
      error: reactivarProyectoError,
    },
  ] = useMutation(REACTIVAR_PROYECTO, {
    variables: { id },
  });

  const onClickAprobar = (id) => {
    aprobarProyecto({
      variables: { id },
    });
  };

  const onClickInactivar = (id) => {
    inactivarProyecto({
      variables: { id },
    });
  };

  const onClickTerminar = (id) => {
    terminarProyecto({
      variables: { id },
    });
  };

  const onClickReactivar = (id) => {
    reactivarProyecto({
      variables: { id },
    });
    window.location.reload();
  };

  useEffect(() => {
    if (queryData) {
      toast.success("Proyecto cargado", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
    if (aprobarProyectoData) {
      toast.success("Proyecto Aprobado", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
    if (inactivarProyectoData) {
      toast.success("Estado del proyecto es ahora: INACTIVO", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
    if (terminarProyectoData) {
      toast.success("Estado del proyecto es ahora: TERMINADO", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
    if (reactivarProyectoData) {
      toast.success("Estado del proyecto es ahora: ACTIVO", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  }, [
    queryData,
    aprobarProyectoData,
    inactivarProyectoData,
    terminarProyectoData,
    reactivarProyectoData,
  ]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
    if (aprobarProyectoError) {
      toast.error("Error Aprobando el proyecto");
    }
    if (inactivarProyectoError) {
      toast.error("Error desactivando el proyecto");
    }
    if (terminarProyectoError) {
      toast.error("Error terminando el proyecto");
    }
    if (reactivarProyectoError) {
      toast.error("Error reactivando el proyecto");
    }
  }, [
    queryError,
    aprobarProyectoError,
    inactivarProyectoError,
    terminarProyectoError,
    reactivarProyectoError,
  ]);

  if (
    queryLoading ||
    aprobarProyectoLoading ||
    inactivarProyectoLoading ||
    terminarProyectoLoading ||
    reactivarProyectoLoading
  )
    return <Loading />;

  return (
    <div className="contenedor">
      <PrivateRoutes roleList={["ADMINISTRADOR"]}>
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
                <td>No encontramos el proyecto</td>
              </tr>
            )}
          </tbody>
        </Table>

        <h2 className="titulo">Inscripciones:</h2>
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr className="centrado">
              <th>Estado</th>
              {Array.from({ length: 1 }).map(
                (
                  _,
                  fechaIngreso,
                  fechaEgreso,
                  estudianteNombre,
                  estudianteApellido,
                  estudianteCorreo
                ) => [
                  <th key={fechaIngreso}>Fecha de ingreso</th>,
                  <th key={fechaEgreso}>Fecha de egreso</th>,
                  <th key={estudianteNombre}>Nombre</th>,
                  <th key={estudianteApellido}>Apellido</th>,
                  <th key={estudianteCorreo}>Correo del estudiante</th>
                ]
              )}
            </tr>
          </thead>
          <tbody>
            {queryData && queryData.Proyecto.inscripciones ? (
              <>
              {queryData.Proyecto.inscripciones.map((i) =>{
                return(
                <tr key={i._id}>
                  <td>{i.estado}</td>
                  {i.fechaIngreso ? (
                    <td>{i.fechaIngreso.split("T")[0]}</td>
                  ) : (
                    <td>{i.fechaIngreso}</td>
                  )}
                  {i.fechaEgreso ? (
                    <td>{i.fechaEgreso.split("T")[0]}</td>
                  ) : (
                    <td>{i.fechaEgreso}</td>
                  )}
                  <td>{i.estudiante.nombre}</td>
                  <td>{i.estudiante.apellido}</td>
                  <td>{i.estudiante.correo}</td>
                </tr>
                );
              })}
              </>
            ) : (
              <tr>
                <td></td>
                <td></td>
                <td>Proyecto sin</td>
                <td>Inscripciones</td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </Table>

        <br />
        <h2 className="titulo">Acciones:</h2>
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr className="centrado">
              <th>Terminar</th>
              {Array.from({ length: 1 }).map(
                (_, inactivar, aprobar, reactivar) => [
                  <th key={inactivar}>Inactivar</th>,
                  <th key={reactivar}>Reactivar</th>,
                  <th key={aprobar}>Aprobar</th>,
                ]
              )}
            </tr>
          </thead>
          <tbody>
            {queryData.Proyecto.fase === "TERMINADO" ? (
              <tr>
                <td className="centrado">Proyecto terminado</td>
                <td className="centrado">Proyecto terminado</td>
                <td className="centrado">Proyecto terminado</td>
                <td className="centrado">Proyecto terminado</td>
              </tr>
            ) : (
              <tr>
                <td className="centrado">
                    <i
                      onClick={(e) => onClickTerminar(id)}
                      className="bx bxs-message-alt-x iconoTabla"
                    />
                </td>
                <td className="centrado">
                    <i
                      onClick={(e) => onClickInactivar(id)}
                      className="bx bxs-message-alt-minus iconoTabla"
                    />
                </td>

                <td className="centrado">
                    <i
                      onClick={(e) => onClickReactivar(id)}
                      className="bx bxs-message-alt-add iconoTabla"
                    />
                </td>
                <td className="centrado">
                    <i
                      onClick={(e) => onClickAprobar(id)}
                      className="bx bxs-message-alt-check iconoTabla"
                    />   
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </PrivateRoutes>
    </div>
  );
};

export default EditarProyectoAdmin;
