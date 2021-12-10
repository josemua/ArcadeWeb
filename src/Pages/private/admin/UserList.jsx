import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USUARIOS } from "../../../graphql/usuarios/queries";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../Componentes/Loading";
import PrivateRoutes from "Componentes/PrivateRoutes";
import { APROBAR_USUARIO } from "graphql/usuarios/mutations";
import { Table } from "react-bootstrap";

const UserList = () => {
  const [id] = useState();
  const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_USUARIOS);

  const [
    aprobarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(APROBAR_USUARIO, {
    variables: { id },
  });

  const changeId = (id) => {
    aprobarUsuario({
      variables: { id },
    });
    window.location.reload();
  };

  useEffect(() => {
    if (queryData) {
      toast.success("Usuarios cargados",{
        position: "bottom-center",
        autoClose: 2000,
        });
    }
    if (mutationData) {
      toast.success("Usuario Autorizado",{
        position: "bottom-center",
        autoClose: 2000,
        });
    }
  }, [queryData, mutationData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando los usuarios");
    }
    if (mutationError) {
      toast.error("Error autorizando al usuario");
    }
  }, [queryError, mutationError]);

  if (queryLoading || mutationLoading) return <Loading />;

  return (
    <div className="contenedor">
    <PrivateRoutes roleList={["ADMINISTRADOR"]}>
      <h2 className="titulo">Datos Usuarios:</h2>
    <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="centrado">
            <th>Correo</th>
            {Array.from({ length: 1 }).map((_, nombre, apellido, identificación, rol, estado, editar, aprobar) => (
            [<th key={nombre}>Nombre</th>,
            <th key={apellido}>Apellido</th>,
            <th key={identificación}>Identificación</th>,
            <th key={rol}>Rol</th>,
            <th key={estado}>Estado</th>,
            <th key={editar}>Editar</th>,
            <th key={aprobar}>Aprobar</th>]
            ))}
            </tr>
          </thead>
          <tbody>
            {queryData && queryData.Usuarios ? (
              <>
                {queryData.Usuarios.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.correo}</td>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.identificacion}</td>
                      <td>{u.rol}</td>
                      <td>{u.estado}</td>
                      <td className="centrado">
                        <Link to={`/user/usuarios/editar/${u._id}`}>
                          <i className="bx bxs-edit iconoTabla"></i>
                        </Link>
                      </td>
                      <td className="centrado">
                        <i onClick={(e) => changeId(u._id)} className="bx bx-check iconoTabla" />
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

export default UserList;
