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
        correo
        rol
      }
    }
  }
`;

const GET_PROYECTO = gql`
  query Proyecto($id: String!) {
  Proyecto(_id: $id) {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      nombre
      apellido
      correo
      rol
    }
    objetivos {
      _id
      descripcion
      tipo
    }
    avances {
      _id
      fecha
      descripcion
      creadoPor {
        _id
        nombre
        apellido
        correo
      }
      observaciones {
        _id
        descripcion
        fecha
      }
    }
    inscripciones {
      _id
      estado
      fechaIngreso
      fechaEgreso
      estudiante {
        _id
        nombre
        apellido
        correo
      }
    }
  }
}
`;

const GET_PROYECTOS_LIDERADOS = gql`
query FiltrarProyecto($lider: String!) {
  filtrarProyecto(lider: $lider) {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      correo
    }
    objetivos {
      _id
      descripcion
      tipo
    }
    avances {
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
    inscripciones {
      _id
      estado
      fechaIngreso
      fechaEgreso
      estudiante {
        _id
        nombre
        apellido
        correo
      }
    }
  }
}
`;

export { GET_PROYECTOS, GET_PROYECTO, GET_PROYECTOS_LIDERADOS };