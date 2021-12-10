import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO } from "../../graphql/proyectos/queries";
import { toast } from "react-toastify";
import { Col, Form, Row } from "react-bootstrap";
import Loading from "../../Componentes/Loading";

const DetallesProyecto = () => {
  const { idProyecto } = useParams();
  
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { idProyecto },
  });

  console.log(queryData);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el usuario");
    }
  }, [queryError]);

  if (queryLoading) return <Loading />;

  return (
    <div className="contenedor">
      <Form
        className="formulario"
      >
      <Form.Label className="titulo">Detalles Proyecto</Form.Label>

      <div className="grid grid-cols-2 gap-5">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Nombre
          </Form.Label>
          <Col sx="auto">
            <Form.Control
              type="text"
            />
          </Col>
        </Form.Group>
        
        <div className="ordenBotones">
            <Link className="iconRegresar" to="/user/proyectos">
            <i className="bx bx-arrow-back" />
            Regresar
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DetallesProyecto;
