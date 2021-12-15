import React, { useEffect, useState } from "react";
import { useUser } from "context/user";
import { useMutation, useQuery } from "@apollo/client";
import { FILTRAR_AVANCES } from "graphql/avances/queries";
import { EDITAR_AVANCE } from "graphql/avances/mutations";
import { toast } from "react-toastify";
import Loading from "Componentes/Loading";
import PrivateComponent from "Componentes/PrivateComponent";
import { Button, Form, Modal } from "react-bootstrap";

const AvanceList = () => {
  const { userData } = useUser();
  const [idAvance, setIdAvance] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(FILTRAR_AVANCES, {
    variables: { idEstudiante: userData._id },
  });

  const [
    editarAvance,
    {
      data: editarAvanceData,
      loading: editarAvanceLoading,
      error: editarAvanceError,
    },
  ] = useMutation(EDITAR_AVANCE);

  const prepareEditAvance = (idAvance, descripcion) => {
    setIdAvance(idAvance);
    setDescripcion(descripcion)
    handleShow(true);
  };

  const enviarAvanceEditado = () => {
    editarAvance({
      variables: {
        id: idAvance,
        campos: { descripcion: descripcion },
      },
    });
    setShow(false);
    setIdAvance("");
    setDescripcion("");
  };

  useEffect(() => {
    if (editarAvanceData) {
      toast.success("Avance editado exitosamente");
    }
  }, [editarAvanceData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
    if (editarAvanceError) {
      toast.error("Error creando la observación");
    }
  }, [queryError, editarAvanceError]);

  if (queryLoading || editarAvanceLoading) return <Loading />;

  return (
    <div className="contenedor">
      <h2 className="titulo">Avances y Observaciones:</h2>
      <div className="formulario">
        {queryData.filtrarAvance.map(
          ({ fecha, descripcion, observaciones, creadoPor, _id }, i) => (
            <div key={i}>
              <div className="contentForm">
                <h4 className="centrado">Avance</h4>
                <p>Fecha: {fecha.split("T")[0]}</p>
                <p>Descripción: {descripcion}</p>
                <p>creado por: {creadoPor.correo}</p>
                <PrivateComponent roleList={["ESTUDIANTE"]}>
                  <button
                    className="iconRegresar"
                    onClick={(e) => prepareEditAvance(_id, descripcion)}
                  >
                    Editar Avance
                    <i className="bx bx-edit-alt" />
                  </button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar Avance</Modal.Title>
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
                      <Button variant="primary" onClick={enviarAvanceEditado}>
                        Editar Avance
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
    </div>
  );
};

export default AvanceList;
