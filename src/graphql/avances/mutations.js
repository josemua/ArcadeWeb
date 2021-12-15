import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`
  mutation crearAvance(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
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

const EDITAR_AVANCE = gql`
mutation EditarAvance($id: String!, $campos: camposAvance!) {
  editarAvance(_id: $id, campos: $campos) {
    _id
    fecha
    descripcion
    observaciones {
      _id
      descripcion
      fecha
    }
    proyecto {
      _id
    }
    creadoPor {
      _id
    }
  }
}
`;

const CREAR_OBSERVACION = gql`
mutation CrearObservacion($idAvance: String!, $campos: camposObservacion!) {
  crearObservacion(idAvance: $idAvance, campos: $campos) {
    _id
    fecha
    descripcion
    observaciones {
      _id
      descripcion
      fecha
    }
    proyecto {
      _id
    }
    creadoPor {
      _id
    }
  }
}
`;

export { CREAR_AVANCE, CREAR_OBSERVACION, EDITAR_AVANCE };
