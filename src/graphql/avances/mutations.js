import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`
  mutation crearAvance(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: Usuario!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      fecha
      descripcion
    }
  }
`;

export { CREAR_AVANCE };
