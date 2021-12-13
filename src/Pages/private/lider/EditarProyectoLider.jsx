import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import useFormData from 'hooks/useFormData';
import { Link, useParams } from 'react-router-dom';
import { Col, Form, Row, Table } from 'react-bootstrap';
import Loading from 'Componentes/Loading';
import { toast } from 'react-toastify';
import { CREAR_OBJETIVO } from 'graphql/proyectos/mutations';
import { ELIMINAR_OBJETIVO } from 'graphql/proyectos/mutations';

const initialValueObjective = {
    tipo: "",
    descripcion: "",
  };

const EditarProyectoLider = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { id } = useParams();
    const [newObjective, setNewObjective] = useState(initialValueObjective);
    
    const {
      data: queryData,
      error: queryError,
      loading: queryLoading,
    } = useQuery(GET_PROYECTO, {
      variables: { id },
    });
  
    const [
      editarProyecto,
      { data: editarProyectoData, loading: editarProyectoLoading, error: editarProyectoError },
    ] = useMutation(EDITAR_PROYECTO);
  
    const [
        crearObjetivo,
        { data: crearObjetivoData, loading: crearObjetivoLoading, error: crearObjetivoError },
      ] = useMutation(CREAR_OBJETIVO);

      const [
        eliminarObjetivo,
        { data: eliminarObjetivoData, loading: eliminarObjetivoLoading, error: eliminarObjetivoError },
      ] = useMutation(ELIMINAR_OBJETIVO);


  const onValueNewObjectiveChange = (e) => {
    setNewObjective({ ...newObjective, [e.target.name]: e.target.value });
  };

  const addObjective = (newObjective) => {
    crearObjetivo({
        variables: { id, campos: {newObjective} },
      });
    setNewObjective(initialValueObjective);
  };


  const submitForm = (e) => {
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);
    editarProyecto({
      variables: { id, campos: {...formData} },
    });
  };

  const onClickEliminar = (_id) => {
    eliminarObjetivo({
      variables: {idProyecto: id, idObjetivo: _id},
    });
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
    }, [editarProyectoData, crearObjetivoData, eliminarObjetivoData]);
  
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
      if (queryError) {
        toast.error("Error consultando el proyecto");
      }
    }, [queryError, editarProyectoError, crearObjetivoError, eliminarObjetivoError]);
  
    if (queryLoading || editarProyectoLoading || crearObjetivoLoading || eliminarObjetivoLoading) return <Loading />;
  
    return (
      <div className="contenedor">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        <h2 className="titulo">Datos Basicos</h2>
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
          </div>
        </Form>
<br/>
        <h2 className="titulo">Objetivos</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="centrado">
            <th>Tipo</th>
            {Array.from({ length: 1 }).map((_, descripcion, eliminar) => [
              <th key={descripcion}>Descripcion</th>,
              <th key={eliminar}>Eliminar</th>,
            ])}
          </tr>
        </thead>
        <tbody>
          {queryData.Proyecto.objetivos ? (
            <>
              {queryData.Proyecto.objetivos.map((o) => {
                return (
                  <tr key={o._id}>
                    <td>{o.tipo}</td>
                    <td>{o.descripcion}</td>
                    <td className="centrado">
                  <button>
                    <i
                      onClick={(e) => onClickEliminar(o._id)}
                      className="bx bx-message-alt-x iconoTabla"
                    />
                  </button>
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

            
              <Form className='contentForm'>
                    <Form.Group className='centrado'>
                        <Form.Label>Tipo</Form.Label>
                      <Form.Select
                        name="tipo"
                        onChange={(value) => onValueNewObjectiveChange(value)}>
                        <option>Selecciona uno...</option>
                        <option value="GENERAL">General</option>
                        <option value="ESPECIFICO">Especifico</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className='centrado'>
                        <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        onChange={(e) => onValueNewObjectiveChange(e)}
                        as="textarea"
                        name="descripcion"/>
                    </Form.Group>
                    <div>
                        <button>
                            agregar
                        </button>
                    </div>
              </Form>

      </div>
    )
}

export default EditarProyectoLider
