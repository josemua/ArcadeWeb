import { gql } from '@apollo/client';


const GET_AVANCES = gql`
  query Avances {
    Avances {
      fecha
      descripcion
      observaciones
      proyecto
      creadoPor
    }
  }
`;

const FILTRAR_AVANCES = gql`
query FiltrarAvance($idEstudiante: String!) {
  filtrarAvance(idEstudiante: $idEstudiante) {
    _id
    fecha
    descripcion
    proyecto {
      _id
    }
    creadoPor {
      _id
    }
    observaciones {
      _id
      descripcion
      fecha
    }
  }
}
`;

export { GET_AVANCES, FILTRAR_AVANCES };