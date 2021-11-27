import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USUARIOS } from "../../graphql/usuarios/queries";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Loading from "../../Componentes/Loading";

const UserList = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  if (loading) return <Loading/>;


  return (
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
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Usuarios.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  <td>{u.rol}</td>
                  <td>{u.estado}</td>
                  <td className="centrado">
                  <Link to={`/usuarios/editar/${u._id}`}>
                    <i className='bx bxs-edit iconoTabla'></i>
                  </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
