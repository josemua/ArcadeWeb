import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTRO } from "../../graphql/auth/mutations";
import { Col, Form, Row } from "react-bootstrap";
import Loading from "../../Componentes/Loading";
import useFormData from "../../hooks/useFormData";
import { useNavigate } from "react-router-dom";
import { useAuth } from 'context/auth';

const Registro = () => {
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    registro({
      variables: formData ,
    });
  };

  const [
    registro,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(REGISTRO);

  useEffect(() => {
    if (mutationData) {
      if (mutationData.registro.token) {
        setToken(mutationData.registro.token);
        navigate('/');
      }
    }
  }, [mutationData, setToken, navigate]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error creando el usuario");
    }
  }, [mutationError]);

  if (mutationLoading) return <Loading />;

  return (
    <div className="contenedor">
      <Form
        className="formulario"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
      <Form.Label className="titulo">
      Regístrate
  </Form.Label>
        <br/>
        <div className="grid grid-cols-2 gap-5">
          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="3">
              Nombre
            </Form.Label>
            <Col xs="auto">
              <Form.Control type="text" name="nombre" required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="3">
              Apellido
            </Form.Label>
            <Col xs="auto">
              <Form.Control type="text" name="apellido" required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="3">
              I.D
            </Form.Label>
            <Col xs="auto">
              <Form.Control type="text" name="identificacion" required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="3">
              Correo
            </Form.Label>
            <Col xs="auto">
              <Form.Control type="text" name="correo" required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col xs="auto">
              <Form.Control type="password" name="password" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="3">
              Rol
            </Form.Label>
            <Col xs="auto">
              <Form.Select required name="rol">
                <option itemType="Enum_Rol" value="ESTUDIANTE">
                  Estudiante
                </option>
                <option itemType="Enum_Rol" value="LIDER">
                  Lider
                </option>
                <option itemType="Enum_Rol" value="ADMINISTRADOR">
                  Admin
                </option>
              </Form.Select>
            </Col>
          </Form.Group>
        </div>

        <div className="ordenBotones">
          <button onClick={submitForm} className="botonEnviar">
            <i className="bx bx-edit-alt" />
            Registrarse
          </button>
          <Link className="iconRegresar" to="/">
            <i className="bx bx-arrow-back" />
            Regresar
          </Link>
        </div>
        <div className="centrado">
          ¿Ya tienes una cuenta?
          <Link to="/login">
            <span className="text-blue-700">Inicia sesión</span>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Registro;
