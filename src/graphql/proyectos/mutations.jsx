import { gql } from '@apollo/client';

const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $lider: String!, $objetivos: [crearObjetivo]) {
    crearProyecto(nombre: $nombre, presupuesto: $presupuesto, lider: $lider, objetivos: $objetivos) {
      _id
    }
  }
`;


export { CREAR_PROYECTO };