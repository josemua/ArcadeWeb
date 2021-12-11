import ProjectCard from "Componentes/ProjectCard";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "../../graphql/proyectos/queries";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Loading from "../../Componentes/Loading";
import React, { useEffect } from "react";

const ProjectLid = () => {
  const { data, error, loading } = useQuery(GET_PROYECTOS);

  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los proyectos');
    }
  }, [error]);

  if (loading) return <Loading/>;


  return (
    <div className="contenedorTodoProyecto">
      <h2 className="titulo">Mis proyectos:</h2>
    <div className="contenedorProyectos">
      {data &&
        data.Proyectos.map((u) => {
              return (
                <ProjectCard titulo={u.nombre} inicio= {u.fechaInicio} lider={u.lider.nombre + " " + u.lider.apellido} usuarios={u.usuarios} estado={u.estado} fase={u.fase} id={u._id}></ProjectCard>
              );
            })}
      </div>
      </div>
  );
};

export default ProjectLid;
