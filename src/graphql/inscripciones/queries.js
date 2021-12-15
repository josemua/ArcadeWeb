import { gql } from '@apollo/client';


const GET_INSCRIPCIONES = gql`
  query Inscripciones {
    Inscripciones {
        _id
        estado
        fechaIngreso
        fechaEgreso
        proyecto
        estudiante
    }
  }
`;

const GET_MIS_INSCRIPCIONES = gql`
query MisInscripciones($estudiante: String!) {
  misInscripciones(estudiante: $estudiante) {
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      nombre
      estado
      fase
      lider {
        _id
        correo
      }
    }
  }
}
`;

export { GET_INSCRIPCIONES, GET_MIS_INSCRIPCIONES};