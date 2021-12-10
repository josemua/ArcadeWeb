import { gql } from '@apollo/client';


const GET_PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider{
        _id
        nombre
        apellido
      }
    }
  }
`;

const GET_PROYECTO = gql`
  query filtrarProyecto($idProyecto: String!) {
    filtrarProyecto(_id: $idProyecto) {
      _id
      nombre
    }
  }
`;

export { GET_PROYECTOS, GET_PROYECTO };