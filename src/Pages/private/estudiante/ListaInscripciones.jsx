import React, { useEffect } from 'react'
import { useUser } from 'context/user';
import { useQuery } from '@apollo/client';
import { GET_MIS_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { toast } from 'react-toastify';
import Loading from 'Componentes/Loading';
import PrivateRoutes from 'Componentes/PrivateRoutes';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaInscripciones = () => {
    const {userData} = useUser();
  
    const {
      data: queryData,
      error: queryError,
      loading: queryLoading,
    } = useQuery(GET_MIS_INSCRIPCIONES, {
      variables: { estudiante: userData._id },
    });

  
    useEffect(() => {
      if (queryData) {
        toast.success("Usuarios cargados", {
          position: "bottom-center",
          autoClose: 2000,
        });
      }
    }, [queryData]);
  
    useEffect(() => {
      if (queryError) {
        toast.error("Error consultando los usuarios");
      }
    }, [queryError]);
  
    if (queryLoading) return <Loading />;
    return (
      <div className="contenedor">
        <PrivateRoutes roleList={["ESTUDIANTE"]}>
          <h2 className="titulo">Datos Inscripciones:</h2>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr className="centrado">
                <th>Estado</th>
                {Array.from({ length: 1 }).map(
                  (
                    _,
                    fechaIngreso,
                    fechaEgreso,
                    proyectoNombre,
                    proyectoEstado,
                    proyectoFase,
                    proyectoLider,
                    detalles,
                    avances
                  ) => [
                    <th key={fechaIngreso}>Fecha de Ingreso</th>,
                    <th key={fechaEgreso}>Fecha de Egreso</th>,
                    <th key={proyectoNombre}>Nombre del proyecto</th>,
                    <th key={proyectoEstado}>Estado</th>,
                    <th key={proyectoFase}>Fase</th>,
                    <th key={proyectoLider}>Correo del lider</th>,
                    <th key={detalles}>Detalles</th>,
                    <th key={avances}>Nuevo avance</th>,
                  ]
                )}
              </tr>
            </thead>
            <tbody>
              {queryData && queryData.misInscripciones ? (
                <>
                  {queryData.misInscripciones.map((i) => {
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
                        <td>{i.proyecto.nombre}</td>
                        <td>{i.proyecto.estado}</td>
                        <td>{i.proyecto.fase}</td>
                        <td>{i.proyecto.lider.correo}</td>
                        <td className="centrado">
                        <Link to={`/user/proyecto/${i.proyecto._id}`}>
                          <i
                            className="bx bx-search-alt iconoTabla"
                          />
                          </Link>
                        </td>

                            <td className="centrado">
                        {i.estado === "ACEPTADO" && i.fechaEgreso === null && (
                        <Link to={`/user/proyecto/avances/${i.proyecto._id}`}>
                          <i
                            className="bx bx-edit iconoTabla"
                            />
                          </Link>
                            )}
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Proyecto</td>
                  <td>Sin</td>
                  <td>Inscripciones</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </Table>
  
          
        </PrivateRoutes>
      </div>
    )
}

export default ListaInscripciones
