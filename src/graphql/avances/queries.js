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
query FiltrarAvance($idProyecto: String!) {
  filtrarAvance(idProyecto: $idProyecto) {
    _id
    fecha
    descripcion
    observaciones {
      _id
      descripcion
      fecha
    }
    creadoPor {
      _id
      correo
    }
  }
}
`;

export { GET_AVANCES, FILTRAR_AVANCES };