import React from "react";
import PrivateRoutes from "Componentes/PrivateRoutes";
import { Table } from "react-bootstrap";
import { GET_AVANCES } from "../../graphql/avances/queries";

const AvanceList = () => {

    return (
        <div className="contenedor">
            <PrivateRoutes roleList={["ADMINISTRADOR", "LIDER"]}>
                <h2 className="titulo">Avances de Proyecto:</h2>

                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr className="centrado">
                            {Array.from({ length: 1 }).map((_, fecha, descripcion, observaciones, proyecto, creadoPor) => (
                                [<th key={fecha}>Fecha</th>,
                                <th key={descripcion}>Descripcion</th>,
                                <th key={observaciones}>Observaciones</th>,
                                <th key={proyecto}>Proyecto</th>,
                                <th key={creadoPor}>Creado Por</th>]
                            ))}
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>

            </PrivateRoutes>
        </div>

    )
}

export default AvanceList;