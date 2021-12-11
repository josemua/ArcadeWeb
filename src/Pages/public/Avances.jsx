import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { Col, Form, Row } from "react-bootstrap";
import Loading from "../../Componentes/Loading";
import useFormData from "../../hooks/useFormData";
import { CREAR_AVANCE } from "graphql/avances/mutations";
import { useUser } from 'context/user';

const Avances = (props) => {

    const { userData } = useUser();

    const { form, formData, updateFormData } = useFormData();

    const submitForm = (e) => {
        e.preventDefault();
        /* crearAvance({
            variables: formData,
        }); */
        console.log(formData);
    };

    const [
        crearAvance,
        { data: mutationData, loading: mutationLoading, error: mutationError },
    ] = useMutation(CREAR_AVANCE);

    useEffect(() => {
        if (mutationData) {
            if (mutationData.registro.token) {
            }
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error("Error creando el avance");
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
                    Crear Avances
                </Form.Label>
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

                        <Form.Label column sm="3">
                            <b>creado por {userData.nombre}</b>
                        </Form.Label>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                        <Col xs="auto">
                            <Form.Control type="text" name="creadoPor" hidden defaultValue={userData._id} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                        <Col xs="auto">
                            <Form.Control type="text" name="proyecto" hidden defaultValue={props.id} />
                        </Col>
                    </Form.Group>

                </div>

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
        </div>
    );
};

export default Avances;