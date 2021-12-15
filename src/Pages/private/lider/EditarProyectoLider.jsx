import React, { useEffect, useState } from "react";
import useFormData from "hooks/useFormData";
import { Link, useParams } from "react-router-dom";
import { Col, Form, Row, Table, Modal, Button } from "react-bootstrap";
import Loading from "Componentes/Loading";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import {
  ELIMINAR_OBJETIVO,
  EDITAR_OBJETIVO,
  CREAR_OBJETIVO,
  EDITAR_PROYECTO,
} from "graphql/proyectos/mutations";

const EditarProyectoLider = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [index, setIndex] = useState(0);
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);

  };
  const handleShow = () => setShow(true);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { id },
  });

  const [
    editarProyecto,
    {
      data: editarProyectoData,
      loading: editarProyectoLoading,
      error: editarProyectoError,
    },
  ] = useMutation(EDITAR_PROYECTO);

  const [
    crearObjetivo,
    {
      data: crearObjetivoData,
      loading: crearObjetivoLoading,
      error: crearObjetivoError,
    },
  ] = useMutation(CREAR_OBJETIVO);

  const [
    eliminarObjetivo,
    {
      data: eliminarObjetivoData,
      loading: eliminarObjetivoLoading,
      error: eliminarObjetivoError,
    },
  ] = useMutation(ELIMINAR_OBJETIVO);

  const [
    editarObjetivo,
    {
      data: editarObjetivoData,
      loading: editarObjetivoLoading,
      error: editarObjetivoError,
    },
  ] = useMutation(EDITAR_OBJETIVO);

  const submitForm = (e) => {
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);
    editarProyecto({
      variables: { id, campos: { ...formData } },
    });
  };

  const addObjective = (e) => {
    e.preventDefault();
    crearObjetivo({
      variables: {
        idProyecto: id,
        campos: { tipo: tipo, descripcion: descripcion },
      },
    });
    setTipo("");
    setDescripcion("");
  };

  const onClickEliminar = (_id) => {
    eliminarObjetivo({
      variables: { idProyecto: id, idObjetivo: _id },
    });
  };
  const prepareEdit = (_index, _tipo, _descripcion) => {
    setIndex(_index);
    setTipo(_tipo);
    setDescripcion(_descripcion);
    handleShow(true);
  };
  

  const enviarObjetivoEditado = () => {
    editarObjetivo({
      variables: { idProyecto: id, indexObjetivo: index, campos: { tipo: tipo, descripcion: descripcion } },
    });
    setShow(false);
    setTipo("");
    setDescripcion("");
    setIndex(0);
  };

  useEffect(() => {
    if (editarProyectoData) {
      toast.success("Petición enviada correctamente");
      toast.warning("Solo puedes editar proyectos en estado ACTIVO");
    }
    if (crearObjetivoData) {
      toast.success("Objetivo creado");
    }
    if (eliminarObjetivoData) {
      toast.success("Objetivo eliminado");
    }
    if (editarObjetivoData) {
      toast.success("Objetivo editado");
    }
  }, [
    editarProyectoData,
    crearObjetivoData,
    eliminarObjetivoData,
    editarObjetivoData,
  ]);

  useEffect(() => {
    if (editarProyectoError) {
      toast.error("Error modificando el proyecto");
    }
    if (crearObjetivoError) {
      toast.error("Error creando el objetivo");
    }
    if (eliminarObjetivoError) {
      toast.error("Error eliminando el objetivo");
    }
    if (editarObjetivoError) {
      toast.error("Error editando el objetivo");
    }
    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [
    queryError,
    editarProyectoError,
    crearObjetivoError,
    eliminarObjetivoError,
    editarObjetivoError,
  ]);

  if (
    queryLoading ||
    editarProyectoLoading ||
    crearObjetivoLoading ||
    eliminarObjetivoLoading ||
    editarObjetivoLoading
  )
    return <Loading />;

  return (
    <div className="contenedor">
      <br />
      <br />
      <br />
      <br />
      <br />
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
                rol
              ) => [
                <th key={presupuesto}>Presupuesto</th>,
                <th key={fechaInicio}>Fecha de Inicio</th>,
                <th key={fechaFin}>Fecha de Fin</th>,
                <th key={estado}>Estado</th>,
                <th key={fase}>Fase</th>,
                <th key={lider}>Lider</th>,
                <th key={rol}>Rol del Lider</th>,
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
                <td>{queryData.Proyecto.lider.rol}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td>No encontramos el proyecto</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2 className="titulo">Editar datos básicos</h2>
      <Form
        className="formulario"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <div className="grid grid-cols-2 gap-5">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Nombre
            </Form.Label>
            <Col Col sx="auto">
              <Form.Control
                type="text"
                name="nombre"
                defaultValue={queryData.Proyecto.nombre}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Presupuesto
            </Form.Label>
            <Col Col sx="auto">
              <Form.Control
                type="number"
                name="presupuesto"
                defaultValue={queryData.Proyecto.presupuesto}
              />
            </Col>
          </Form.Group>
            {queryData.Proyecto.estado === "ACTIVO" &&(
              <div className="ordenBotones">
            <button onClick={submitForm} className="botonEnviar">
              <i className="bx bx-edit-alt" />
              Editar
            </button>
            <Link className="iconRegresar" to="/user/proyectosLiderados">
              <i className="bx bx-arrow-back" />
              Regresar
            </Link>
          </div>
            )}
        </div>
      </Form>
      <br />
      <h2 className="titulo">Objetivos</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="centrado">
            <th>Tipo</th>
            {Array.from({ length: 1 }).map(
              (_, descripcion, eliminar, editar) => [
                <th key={descripcion}>Descripcion</th>,
                <th key={index}>Index</th>,
                <th key={eliminar}>Eliminar</th>,
                <th key={editar}>Editar</th>,
              ]
            )}
          </tr>
        </thead>
        <tbody>
          {queryData.Proyecto.objetivos ? (
            <>
              {queryData.Proyecto.objetivos.map((o, index) => {
                return (
                  <tr key={o._id}>
                    <td>{o.tipo}</td>
                    <td>{o.descripcion}</td>
                    <td>{index}</td>
                    <td className="centrado">
                    {queryData.Proyecto.estado === "ACTIVO" && (
                      <button>
                        <i
                          onClick={(e) => onClickEliminar(o._id)}
                          className="bx bx-message-alt-x iconoTabla"
                        />
                      </button>
                      )}
                    </td>
                    <td className="centrado">
                    {queryData.Proyecto.estado === "ACTIVO" && (
                      <button>
                        <i
                          onClick={(e) =>prepareEdit(index, o.tipo, o.descripcion)}
                          className="bx bx-message-alt-edit iconoTabla"
                          />
                      </button>
                          )}
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Editar Objetivo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form className="contentForm">
                            <Form.Group className="centrado">
                              <Form.Label>Tipo</Form.Label>
                              <Form.Select
                                name="tipo"
                                id="tipo"
                                defaultValue={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                              >
                                <option>Selecciona uno...</option>
                                <option value="GENERAL">General</option>
                                <option value="ESPECIFICO">Especifico</option>
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="centrado">
                              <Form.Label>Descripcion</Form.Label>
                              <Form.Control
                                defaultValue={descripcion}
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
                          <Button variant="primary" onClick={enviarObjetivoEditado}>
                            Editar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td>Proyecto sin</td>
              <td>Objetivos</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2 className="titulo">Agregar Objetivo</h2>
      <Form className="contentForm">
        <Form.Group className="centrado">
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            name="tipo"
            id="tipo"
            onChange={(e) => setTipo(e.target.value)}
          >
            <option>Selecciona uno...</option>
            <option value="GENERAL">General</option>
            <option value="ESPECIFICO">Especifico</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="centrado">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            onChange={(e) => setDescripcion(e.target.value)}
            as="textarea"
            name="descripcion"
            id="descripcion"
          />
        </Form.Group>
        {queryData.Proyecto.estado === "ACTIVO" && (
        <div className="ordenBotones">
          <button onClick={(e) => addObjective(e)} className="botonEnviar">
            <i className="bx bx-check" />
            Agregar
          </button>
        </div>
        )}
      </Form>
    </div>
  );
};

export default EditarProyectoLider;
