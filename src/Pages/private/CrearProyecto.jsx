import React, { useEffect, useState } from "react";
import useFormData from "../../hooks/useFormData";
import { useMutation } from "@apollo/client";
import { CREAR_PROYECTO } from "../../graphql/proyectos/mutations";
import { toast } from "react-toastify";
import Loading from "../../Componentes/Loading";
import { Col, Form, Row, Table } from "react-bootstrap";
import { useUser } from "../../context/user";
import { Link } from "react-router-dom";
import PrivateRoutes from "../../Componentes/PrivateRoutes";

const initialValueObjective = {
  tipo: "",
  descripcion: "",
};

const CrearProyecto = () => {
  const { userData } = useUser();
  const { form, formData, updateFormData } = useFormData();

  const [objetivos, setobjetivos] = useState([]);
  const [newObjective, setNewObjective] = useState(initialValueObjective);

  const [creatingObjectiveState, setCreatingObjectiveState] =
    useState("minimizado");

  

  const changeStateCreateObjectiveForm = (state) => {
    setCreatingObjectiveState(state);
  };

  const onValueNewObjectiveChange = (e) => {
    setNewObjective({ ...newObjective, [e.target.name]: e.target.value });
  };

  const addObjective = (newObjective) => {
    objetivos.push(newObjective);
    setNewObjective(initialValueObjective);
    changeStateCreateObjectiveForm("minimizado");
  };

  const deleteObjective = (_descripcion) => {
    let newobjetivos = objetivos.filter((object) => object.descripcion !== _descripcion);
    setobjetivos(newobjetivos);
  };

  const submitForm = (e) => {
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);
    CrearProyecto({
        variables: { objetivos, ...formData },
      });
    setobjetivos([]);
    changeStateCreateObjectiveForm("minimizado");
  };

  const [
    CrearProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_PROYECTO);

  useEffect(() => {
    if (mutationData) {
      toast.success("Proyecto creado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error creando el proyecto");
    }
  }, [mutationError]);

  if (mutationLoading) return <Loading />;

  return (
    <PrivateRoutes roleList={["LIDER"]}>
    <div className="contenedor">
      <Form
        className="formulario"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <Form.Label className="titulo">Liderar proyecto</Form.Label>
        <br />
        <div className="grid grid-cols-2 gap-5">
          <Form.Group as={Row} className="mb-3" controlId="formNombre">
            <Form.Label column sm="3">
              Nombre
            </Form.Label>
            <Col xs="auto">
              <Form.Control type="text" name="nombre" required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPresupuesto">
            <Form.Label column sm="3">
              Presupuesto
            </Form.Label>
            <Col xs="auto">
              <Form.Control as="input" type="number" name="presupuesto" required />
            </Col>
          </Form.Group>
        </div>
        <br />
        <Form.Label className="centrado">
          Correo del lider : {userData.correo}
        </Form.Label>
        <Form.Group controlId="formLider">
          <Col sx="auto">
            <Form.Control
              type="text"
              name="lider"
              plaintext
              hidden
              defaultValue={userData._id}
            />
          </Col>
        </Form.Group>

        <Table>
          <thead>
            <tr>
              <th>
                Tipo{" "}
                {creatingObjectiveState === "desplegado" && (
                  <>
                    :
                    <Form.Group >
                      <Form.Select
                        name="tipo"
                        onChange={(value) => onValueNewObjectiveChange(value)}>
                        <option>Selecciona uno...</option>
                        <option value="GENERAL">General</option>
                        <option value="ESPECIFICO">Especifico</option>
                      </Form.Select>
                    </Form.Group>
                  </>
                )}
              </th>
              <th>
                Descripción:{" "}
                {creatingObjectiveState === "desplegado" && (
                  <>
                    :
                    <Form.Group>
                      <Form.Control
                        onChange={(e) => onValueNewObjectiveChange(e)}
                        as="textarea"
                        placeholder="Descripcion"
                        name="descripcion"
                      />
                    </Form.Group>
                  </>
                )}
              </th>
              <th>
                {creatingObjectiveState === "minimizado" && (
                  <button
                    variant="contained"
                    onClick={() => changeStateCreateObjectiveForm("desplegado")}
                  >
                    Agregar
                  </button>
                )}
                {creatingObjectiveState === "desplegado" && (
                  <button
                    variant="contained"
                    onClick={() => addObjective(newObjective)}
                  >
                    +
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {objetivos.map((objetivo) => (
              <tr key={objetivo.descripcion}>
                <td>{objetivo.tipo}</td>
                <td>{objetivo.descripcion}</td>
                <td>
                  <button
                    variant="contained"
                    onClick={() => deleteObjective(objetivo.descripcion)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="ordenBotones">
          <button
            onClick={submitForm}
            className="botonEnviar"
          >
            <i className="bx bx-edit-alt" />
            Crear
          </button>
          <Link className="iconRegresar" to="/">
            <i className="bx bx-arrow-back" />
            Regresar
          </Link>
        </div>
      </Form>
    </div>
      </PrivateRoutes>
  );
};

export default CrearProyecto;
