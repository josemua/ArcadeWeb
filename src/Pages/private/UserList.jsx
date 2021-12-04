import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USUARIOS } from "../../graphql/usuarios/queries";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Componentes/Loading";
import PrivateRoutes from "Componentes/PrivateRoutes";
import { APROBAR_USUARIO } from "graphql/usuarios/mutations";

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
      toast.success("Usuarios cargados");
    }
    if (mutationData) {
      toast.success("Usuario Autorizado");
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
    <PrivateRoutes roleList={["ADMINISTRADOR"]}>
      <div className="contentTabla">
        <h2 className="titulo">Datos Usuarios:</h2>
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Aprobar</th>
            </tr>
          </thead>
          <tbody>
            {queryData && queryData.Usuarios ? (
              <>
                {queryData.Usuarios.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.correo}</td>
                      <td>{u.identificacion}</td>
                      <td>{u.rol}</td>
                      <td>{u.estado}</td>
                      <td className="centrado">
                        <Link to={`/admin/usuarios/editar/${u._id}`}>
                          <i className="bx bxs-edit iconoTabla"></i>
                        </Link>
                      </td>
                      <td className="centrado">
                      <button onClick={(e) => changeId(u._id)}>
                        <i className="bx bx-check iconoTabla" />
                      </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No Autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoutes>
  );
};

export default UserList;
