import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USUARIO } from "../../../graphql/usuarios/queries";
import { toast } from "react-toastify";
import { EDITAR_USUARIO } from "../../../graphql/usuarios/mutations";
import { Col, Form, Row } from "react-bootstrap";
import Loading from "../../../Componentes/Loading";
import useFormData from "../../../hooks/useFormData";
import PrivateComponent from "Componentes/PrivateComponent";

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
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
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
    <div className="contentForm">
      <h1 className="titulo">Editar Usuario</h1>
      <Form
        className="contenedor"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Rol
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="rol"
              plaintext
              readOnly
              defaultValue={queryData.Usuario.rol}
            />
          </Col>
        </Form.Group>
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
              defaultValue={queryData.Usuario.correo}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            I.D
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="identificacion"
              defaultValue={queryData.Usuario.identificacion}
            />
          </Col>
        </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Estado
          </Form.Label>
          <Col sm="6">
            <Form.Select defaultValue={queryData.Usuario.estado} name="estado">
              <option value="AUTORIZADO">Autorizado</option>
              <PrivateComponent roleList={["ADMINISTRADOR"]}>
              <option value="PENDIENTE">Pendiente</option>
              <option value="NO_AUTORIZADO">No autorizado</option>
              </PrivateComponent>
            </Form.Select>
          </Col>
        </Form.Group>
        <div className="ordenBotones">
          <button onClick={submitForm} className="botonEnviar">
            <i className="bx bx-edit-alt" />
            Editar
          </button>
          <Link className="iconRegresar" to="/admin/usuarios">
            <i className="bx bx-arrow-back" />
            Regresar
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default EditarUsuario;
