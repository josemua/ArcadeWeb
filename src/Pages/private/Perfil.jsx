import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USUARIO } from "../../graphql/usuarios/queries";
import { toast } from "react-toastify";
import { EDITAR_USUARIO } from "../../graphql/usuarios/mutations";
import { Col, Form, Row } from "react-bootstrap";
import Loading from "../../Componentes/Loading";
import useFormData from "../../hooks/useFormData";
import PrivateComponent from "Componentes/PrivateComponent";
import { useUser } from "context/user";

const Perfil = () => {
  const { userData } = useUser();
  const { form, formData, updateFormData } = useFormData(null);
  const _id = userData._id;
  const [edit, setEdit] = useState(false);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id: _id },
  });

  const submitForm = (e) => {
    e.preventDefault();
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
    <div className="contenedor">
    <Form
      className="formulario"
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
    >
    <Form.Label className="titulo">Perfil</Form.Label>
    {edit ? (
      <div className="grid grid-cols-2 gap-5">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Rol
          </Form.Label>
        <Col sx="auto">
          <Form.Control
            type="text"
            name="rol"
            plaintext
            readOnly
            defaultValue={queryData.Usuario.rol}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Nombre
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            type="text"
            name="nombre"
            defaultValue={queryData.Usuario.nombre}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Apellido
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            type="text"
            name="apellido"
            defaultValue={queryData.Usuario.apellido}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Correo
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            type="text"
            name="correo"
            defaultValue={queryData.Usuario.correo}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          I.D
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            type="text"
            name="identificacion"
            defaultValue={queryData.Usuario.identificacion}
          />
        </Col>
      </Form.Group>
              <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Estado
        </Form.Label>
        <Col Col sx="auto">
        <Form.Control
            type="text"
            name="estado"
            defaultValue={queryData.Usuario.estado}
          />
        </Col>
      </Form.Group>
      <div className="ordenBotones">
        <button onClick={submitForm} className="botonEnviar">
          <i className="bx bx-edit-alt" />
          Confirmar
        </button>
        <button onClick={() => setEdit(!edit)} className="botonEnviar">
          <i className="bx bx-arrow-back" />
          Cancelar
          </button>
        </div>
      </div>
    ): (
      <div className="grid grid-cols-2 gap-5">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Rol
          </Form.Label>
        <Col sx="auto">
          <Form.Control
            type="text"
            plaintext
            readOnly
            defaultValue={queryData.Usuario.rol}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Nombre
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            type="text"
            disabled
            defaultValue={queryData.Usuario.nombre}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Apellido
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            disabled
            defaultValue={queryData.Usuario.apellido}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Correo
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            disabled
            defaultValue={queryData.Usuario.correo}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          I.D
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            disabled
            defaultValue={queryData.Usuario.identificacion}
          />
        </Col>
      </Form.Group>
              <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Estado
        </Form.Label>
        <Col Col sx="auto">
          <Form.Control
            disabled
            defaultValue={queryData.Usuario.estado}
          />
        </Col>
      </Form.Group>
      <div className="ordenBotones">
        <button onClick={() => setEdit(!edit)} className="botonEnviar">
          <i className="bx bx-edit-alt" />
          Editar
        </button>
        </div>
      </div>
    )}
    </Form>
  </div>
  );
};

export default Perfil;