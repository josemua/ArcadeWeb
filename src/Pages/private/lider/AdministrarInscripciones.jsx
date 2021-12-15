import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import { APROBAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { toast } from "react-toastify";
import Loading from "Componentes/Loading";
import PrivateRoutes from "Componentes/PrivateRoutes";
import { Table } from "react-bootstrap";
import { RECHAZAR_INSCRIPCION } from "graphql/inscripciones/mutations";

const AdministrarInscripciones = () => {
  const { id } = useParams();
  const [inscripcionId, setInscripcionId] = useState("");

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { id },
  });

  const [
    aprobarInscripcion,
    {
      data: aprobarInscripcionData,
      loading: aprobarInscripcionLoading,
      error: aprobarInscripcionError,
    },
  ] = useMutation(APROBAR_INSCRIPCION, {
    variables: { aprobarInscripcionId: inscripcionId },
  });

  const [
    rechazarInscripcion,
    {
      data: rechazarInscripcionData,
      loading: rechazarInscripcionLoading,
      error: rechazarInscripcionError,
    },
  ] = useMutation(RECHAZAR_INSCRIPCION, {
    variables: { rechazarInscripcionId: inscripcionId },
  });


  const onClickAprobar = (aprobarInscripcionId) => {
    setInscripcionId(aprobarInscripcionId);
    aprobarInscripcion({
      variables: { aprobarInscripcionId },
    });
    window.location.reload();
  };

  const onClickRechazar = (rechazarInscripcionId) => {
    setInscripcionId(rechazarInscripcionId);
    rechazarInscripcion({
      variables: { rechazarInscripcionId },
    });
    window.location.reload();
  };

  useEffect(() => {
    if (queryData) {
      toast.success("Usuarios cargados", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
    if (aprobarInscripcionData) {
      toast.success("Usuario Aceptado", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
    if (rechazarInscripcionData) {
        toast.success("Usuario Rechazado", {
          position: "bottom-center",
          autoClose: 2000,
        });
      }
  }, [queryData, aprobarInscripcionData, rechazarInscripcionData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando los usuarios");
    }
    if (aprobarInscripcionError) {
      toast.error("Error Aprobando el usuario");
    }
    if (rechazarInscripcionError) {
        toast.error("Error rechazando el usuario");
      }
  }, [queryError, aprobarInscripcionError, rechazarInscripcionError]);

  if (queryLoading || aprobarInscripcionLoading || rechazarInscripcionLoading) return <Loading />;
  return (
    <div className="contenedor">
      <PrivateRoutes roleList={["LIDER"]}>
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
                  estudianteCorreo,
                  aprobar,
                  rechazar
                ) => [
                  <th key={fechaIngreso}>Fecha de ingreso</th>,
                  <th key={fechaEgreso}>Fecha de egreso</th>,
                  <th key={estudianteNombre}>Nombre</th>,
                  <th key={estudianteApellido}>Apellido</th>,
                  <th key={estudianteCorreo}>Correo del estudiante</th>,
                  <th key={aprobar}>Aprobar</th>,
                  <th key={rechazar}>Rechazar</th>,
                ]
              )}
            </tr>
          </thead>
          <tbody>
            {queryData && queryData.Proyecto.inscripciones ? (
              <>
                {queryData.Proyecto.inscripciones.map((i) => {
                  return (
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

                      <td className="centrado">
                        <i
                          onClick={(e) => onClickAprobar(i._id)}
                          className="bx bxs-message-alt-check iconoTabla"
                        />
                      </td>
                      <td className="centrado">
                        <i
                          onClick={(e) => onClickRechazar(i._id)}
                          className="bx bxs-message-alt-x iconoTabla"
                        />
                      </td>
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
      </PrivateRoutes>
    </div>
  );
};

export default AdministrarInscripciones;
