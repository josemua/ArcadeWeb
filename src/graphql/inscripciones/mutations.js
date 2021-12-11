import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation crearInscripcion(
    $proyecto: String!
    $estudiante: String!
  ) {
    crearInscripcion(
        proyecto: $proyecto
        estudiante: $estudiante
    ) {
      estudiante{
        _id
      }
    }
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
