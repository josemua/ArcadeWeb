import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Loading from "../../Componentes/Loading";
import useFormData from "../../hooks/useFormData";
import { CREAR_AVANCE } from "graphql/avances/mutations";
import { useUser } from "context/user";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import PrivateComponent from "Componentes/PrivateComponent";
import { CREAR_OBSERVACION } from "graphql/avances/mutations";

const Avances = () => {
  const { id } = useParams();
  const [idAvance, setIdAvance] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { userData } = useUser();
  const { form, formData, updateFormData } = useFormData();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { id },
  });

  const [
    crearObservacion,
    {
      data: crearObservacionData,
      loading: crearObservacionLoading,
      error: crearObservacionError,
    },
  ] = useMutation(CREAR_OBSERVACION);

  const submitForm = (e) => {
    e.preventDefault();
    crearAvance({
      variables: { ...formData },
    });
  };

  const prepareObservation = (idAvance) => {
    setIdAvance(idAvance);
    handleShow(true);
  };

  const enviarObservacionEditada = () => {
    crearObservacion({
      variables: { idAvance: idAvance, campos: { descripcion: descripcion, fecha: new Date() } },
    });
    setShow(false);
    setIdAvance("");
    setDescripcion("");
  };

  const [
    crearAvance,
    { data: crearAvanceData, loading: crearAvanceLoading, error: crearAvanceError },
  ] = useMutation(CREAR_AVANCE);

  useEffect(() => {
    if (crearAvanceData) {
      toast.success("Avance creado exitosamente");
    }
    if (crearObservacionData) {
        toast.success("Observación creada exitosamente");
      }
  }, [crearAvanceData, crearObservacionData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
    if (crearAvanceError) {
      toast.error("Error creando el avance");
    }
    if (crearObservacionError) {
        toast.error("Error creando la observación");
      }
  }, [queryError, crearAvanceError, crearObservacionError]);

  if (queryLoading || crearAvanceLoading || crearObservacionLoading) return <Loading />;

  return (
    <div className="contenedor">
      <h2 className="titulo">Datos Proyecto:</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="centrado">
            <th>Nombre</th>
            {Array.from({ length: 1 }).map(
              (
                _,
                presupuesto,
                fechaInicio,
                fechaFin,
                estado,
                fase,
                lider,
                detalles
              ) => [
                <th key={presupuesto}>Presupuesto</th>,
                <th key={fechaInicio}>Fecha de Inicio</th>,
                <th key={fechaFin}>Fecha de Fin</th>,
                <th key={estado}>Estado</th>,
                <th key={fase}>Fase</th>,
                <th key={lider}>Lider</th>,
                <th key={detalles}>Detalles</th>,
              ]
            )}
          </tr>
        </thead>
        <tbody>
          {queryData && queryData.Proyecto ? (
            <>
              <tr>
                <td>{queryData.Proyecto.nombre}</td>
                <td>{queryData.Proyecto.presupuesto}</td>
                {queryData.Proyecto.fechaInicio ? (
                  <td>{queryData.Proyecto.fechaInicio.split("T")[0]}</td>
                ) : (
                  <td>{queryData.Proyecto.fechaInicio}</td>
                )}
                {queryData.Proyecto.fechaFin ? (
                  <td>{queryData.Proyecto.fechaFin.split("T")[0]}</td>
                ) : (
                  <td>{queryData.Proyecto.fechaFin}</td>
                )}
                <td>{queryData.Proyecto.estado}</td>
                <td>{queryData.Proyecto.fase}</td>
                <td>{queryData.Proyecto.lider.correo}</td>
                <td className="centrado">
                  <Link to={`/user/proyecto/${queryData.Proyecto._id}`}>
                    <i className="bx bx-search-alt iconoTabla" />
                  </Link>
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td>No encontramos el proyecto</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2 className="titulo">Avances y Observaciones:</h2>
      <div className="formulario">
        {queryData.Proyecto.avances.map(
          ({ fecha, descripcion, observaciones, creadoPor, _id }, i) => (
            <div key={i}>
              <div className="contentForm">
                <h4 className="centrado">Avance</h4>
                <p>Fecha: {fecha.split("T")[0]}</p>
                <p>Descripción: {descripcion}</p>
                <p>creado por: {creadoPor.correo}</p>
            <PrivateComponent roleList={["LIDER"]}>
                <button className="iconRegresar" onClick={(e) => prepareObservation(_id)}>Agregar Observación<i className="bx bx-edit-alt" /></button>
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Nueva Observación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form className="contentForm">
                            <Form.Group className="centrado">
                              <Form.Label>Descripcion</Form.Label>
                              <Form.Control
                                onChange={(e) => setDescripcion(e.target.value)}
                                as="textarea"
                                name="descripcion"
                                id="descripcion"
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Regresar
                          </Button>
                          <Button variant="primary" onClick={enviarObservacionEditada}>
                            Agregar Observacion
                          </Button>
                        </Modal.Footer>
                      </Modal>
            </PrivateComponent>
                {observaciones.map((observacion, j) => (
                  <div key={j}>
                    <div className="observacion">
                      <h4 className="centrado">Observacion</h4>
                      <p>{observacion.fecha}</p>
                      <p>{observacion.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <br />
      <br />
      <PrivateComponent roleList={["ESTUDIANTE"]}>
        {queryData.Proyecto.estado === "ACTIVO" && (
          <Form
            className="formulario"
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
          >
            <Form.Label className="titulo">Crear Avance</Form.Label>
            <br />
            <div className="grid grid-cols-2 gap-5">
              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label column sm="3">
                  <b>Descripcion</b>
                </Form.Label>
                <Col xs="auto">
                  <Form.Control type="text" name="descripcion" required />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label column sm="3">
                  <b>Fecha</b>
                </Form.Label>
                <Col xs="auto">
                  <Form.Control type="date" name="fecha" required />
                </Col>
              </Form.Group>
            </div>

            <Form.Label column sm="3">
              <b>
                creado por {userData.nombre} {userData.apellido}
              </b>
            </Form.Label>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
              <Col xs="auto">
                <Form.Control
                  type="text"
                  name="creadoPor"
                  hidden
                  defaultValue={userData._id}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
              <Col xs="auto">
                <Form.Control
                  type="text"
                  name="proyecto"
                  hidden
                  defaultValue={id}
                />
              </Col>
            </Form.Group>

            <div className="ordenBotones">
              <button onClick={submitForm} className="botonEnviar">
                <i className="bx bx-edit-alt" />
                Crear
              </button>
              <Link className="iconRegresar" to="cards">
                <i className="bx bx-arrow-back" />
                Regresar
              </Link>
            </div>
          </Form>
        )}
      </PrivateComponent>
    </div>
  );
};

export default Avances;
