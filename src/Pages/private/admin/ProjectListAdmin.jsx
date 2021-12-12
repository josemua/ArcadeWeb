import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "../../../graphql/proyectos/queries";
import { toast } from "react-toastify";
import Loading from "../../../Componentes/Loading";
import PrivateRoutes from "../../../Componentes/PrivateRoutes";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectListAdmin = () => {
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTOS);

  useEffect(() => {
    if (queryData) {
      toast.success("Proyectos cargados", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando los proyectos");
    }
  }, [queryError]);

  if (queryLoading)
    return <Loading />;
  return (
    <div className="contenedor">
      <PrivateRoutes roleList={["ADMINISTRADOR"]}>
        <h2 className="titulo">Datos Usuarios:</h2>
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
                  rol,
                  editar
                ) => [
                  <th key={presupuesto}>Presupuesto</th>,
                  <th key={fechaInicio}>Fecha de Inicio</th>,
                  <th key={fechaFin}>Fecha de Fin</th>,
                  <th key={estado}>Estado</th>,
                  <th key={fase}>Fase</th>,
                  <th key={lider}>Lider</th>,
                  <th key={rol}>Rol del Lider</th>,
                  <th key={editar}>Editar</th>,
                ]
              )}
            </tr>
          </thead>
          <tbody>
            {queryData && queryData.Proyectos ? (
              <>
                {queryData.Proyectos.map((p) => {
                  return (
                    <tr key={p._id}>
                      <td>{p.nombre}</td>
                      <td>{p.presupuesto}</td>
                      {p.fechaInicio ? (
                        <td>{p.fechaInicio.split("T")[0]}</td>
                      ) : (
                        <td>{p.fechaInicio}</td>
                      )}
                      {p.fechaFin ? (
                        <td>{p.fechaFin.split("T")[0]}</td>
                      ) : (
                        <td>{p.fechaFin}</td>
                      )}
                      <td>{p.estado}</td>
                      <td>{p.fase}</td>
                      <td>{p.lider.correo}</td>
                      <td>{p.lider.rol}</td>
                      <td className="centrado">
                        <Link to={`/user/proyectosAdmin/${p._id}`}>
                          <i className="bx bx-edit iconoTabla" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No Autorizado</div>
            )}
          </tbody>
        </Table>
      </PrivateRoutes>
    </div>
  );
};

export default ProjectListAdmin;
