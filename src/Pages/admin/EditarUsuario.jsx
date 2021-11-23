import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USUARIO } from "../../graphql/usuarios/queries";
import { toast } from "react-toastify";
import { EDITAR_USUARIO } from "../../graphql/usuarios/mutations";
import { Col, Form, Row } from "react-bootstrap";
import Loading from "../../componentes/Loading";
import useFormData from "../../hooks/useFormData";

const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    // editarUsuario({
    //   variables: { _id, ...formData },
    // });
  };

  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO);

  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario modificado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el usuario");
    }

    if (queryError) {
      toast.error("Error consultando el usuario");
    }
  }, [queryError, mutationError]);

  if (queryLoading || mutationLoading) return <Loading />;

  return (
    <div>
      <Link className="link" to="/usuarios">
        volver a lista de usuarios
        <img
          src="https://i.ibb.co/BVfFWt3/User-Files-icon.png"
          alt="User-Files-icon"
        />
      </Link>
      <h1 className="titulo">Editar Usuario</h1>
      <Form
        className="contenedor"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <br />
        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Nombre
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="nombre"
              defaultValue={queryData.Usuario.nombre}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Apellido
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="apellido"
              defaultValue={queryData.Usuario.apellido}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Correo
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="correo"
              readOnly
              defaultValue={queryData.Usuario.correo}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Identificación
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="identificacion"
              readOnly
              defaultValue={queryData.Usuario.identificacion}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Rol
          </Form.Label>
          <Col sm="6">
            <Form.Select defaultValue={queryData.Usuario.rol} name="rol">
              <option value="ADMINISTRADOR">Admin</option>
              <option value="LIDER">Lider</option>
              <option value="ESTUDIANTE">Estudiante</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Estado
          </Form.Label>
          <Col sm="6">
            <Form.Select defaultValue={queryData.Usuario.estado} name="estado">
              <option value="PENDIENTE">Pendiente</option>
              <option value="AUTORIZADO">Autorizado</option>
              <option value="NO_AUTORIZADO">No autorizado</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <div className="centrado">
          <button onClick={submitForm}>Editar</button>
        </div>
      </Form>
    </div>
  );
};

export default EditarUsuario;
