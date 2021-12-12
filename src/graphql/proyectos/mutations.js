import { gql } from '@apollo/client';

const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $lider: String!, $objetivos: [crearObjetivo]) {
    crearProyecto(nombre: $nombre, presupuesto: $presupuesto, lider: $lider, objetivos: $objetivos) {
      _id
    }
  }
`;

const APROBAR_PROYECTO = gql`
mutation AprobarProyecto($id: String!) {
  aprobarProyecto(_id: $id) {
    _id
    nombre
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`;


const INACTIVAR_PROYECTO = gql`
mutation inactivarProyecto($id: String!) {
  inactivarProyecto(_id: $id) {
    _id
    nombre
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`;

const TERMINAR_PROYECTO = gql`
mutation TerminarProyecto($id: String!) {
  terminarProyecto(_id: $id) {
    _id
    nombre
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`;

const REACTIVAR_PROYECTO = gql`
mutation ReactivarProyecto($id: String!) {
  reactivarProyecto(_id: $id) {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
  }
}
`;

export { CREAR_PROYECTO, APROBAR_PROYECTO, INACTIVAR_PROYECTO, TERMINAR_PROYECTO, REACTIVAR_PROYECTO };