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


export { GET_AVANCES, GET_USUARIO };