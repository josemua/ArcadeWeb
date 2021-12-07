import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation CrearInscripcion(
    $estado: Enum_EstadoInscripcion!
    $proyecto: String!
    $estudiante: String!
  ) {
    crearInscripcion(
        estado: $estado
        proyecto: $proyecto
        estudiante: $estudiante
    ) 
  }
`;

const APROBAR_INSCRIPCION = gql`
mutation AprobarInscripcion($id: String!) {
  AprobarInscripcion(_id: $id) {
    inscripcion
  }
}
`;

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION };
