import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const APROBAR_USUARIO = gql`
mutation AprobarUsuario($id: String!) {
  aprobarUsuario(_id: $id) {
    _id
    nombre
    apellido
    identificacion
    correo
    rol
    estado
  }
}
`;

export { EDITAR_USUARIO, APROBAR_USUARIO };
