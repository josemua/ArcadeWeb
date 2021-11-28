import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/mutations";
import { useAuth } from 'context/auth';
import { Col, Form, Row } from "react-bootstrap";
import Loading from "../../Componentes/Loading";
import useFormData from "hooks/useFormData";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();
  const { setToken } = useAuth();

  const submitForm = (e) => {
    e.preventDefault();
    login({
      variables: { ...formData },
    });
  };

  const [
    login,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);

  useEffect(() => {
    if (mutationData) {
      if (mutationData.login.token) {
        setToken(mutationData.login.token);
        navigate("/");}
    }
  }, [mutationData, setToken, navigate]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error buscando al usuario");
    }
  }, [mutationError]);

  if (mutationLoading) return <Loading />;

  return (
    <div className="contentForm">
      <h1 className="titulo">Inicia Sesión</h1>
      <Form
        className="contenedor"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <br />
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Correo
          </Form.Label>
          <Col sm="6">
            <Form.Control type="text" name="correo" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Password
          </Form.Label>
          <Col sm="6">
            <Form.Control type="password" name="password" required />
          </Col>
        </Form.Group>
        <div className="ordenBotones">
          <button onClick={submitForm} className="botonEnviar">
            <i className="bx bx-edit-alt" />
            Ingresar
          </button>
          <Link className="iconRegresar" to="/">
            <i className="bx bx-arrow-back" />
            Regresar
          </Link>
        </div>
        <div className="centrado">
          ¿No tienes una cuenta?
          <Link to="/registro">
            <span className="text-blue-700">Inicia sesión</span>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
