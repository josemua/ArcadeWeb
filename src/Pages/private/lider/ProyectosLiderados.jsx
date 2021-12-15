import ProjectCard from "Componentes/ProjectCardLider";
import { useQuery } from "@apollo/client";
import { toast } from 'react-toastify';
import Loading from "../../../Componentes/Loading";
import React, { useEffect } from "react";
import { GET_PROYECTOS_LIDERADOS } from "graphql/proyectos/queries";
import { useUser } from "context/user";
import PrivateRoutes from "Componentes/PrivateRoutes";

const ProjectLid = () => {
  const {userData} = useUser();
  const lider = userData._id;
  console.log( lider );

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTOS_LIDERADOS, {
    variables: { lider },
  });
  

  useEffect(() => {
    if (queryData) {
      toast.success("Proyectos cargados exitosamente");
    }
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando los proyectos");
    }
  }, [queryError]);

  if (queryLoading) return <Loading />;


  return (
    <PrivateRoutes roleList={["LIDER"]}>
    <div className="contenedorTodoProyecto">
      <h2 className="titulo">Mis proyectos:</h2>
    <div className="contenedorProyectos">
      {queryData &&
        queryData.filtrarProyecto.map((u) => {
              return (
                <ProjectCard titulo={u.nombre} inicio= {u.fechaInicio} lider={u.lider.correo} usuarios={u.usuarios} estado={u.estado} fase={u.fase} presupuesto={u.presupuesto} id={u._id}></ProjectCard>
              );
            })}
      </div>
      </div>
      </PrivateRoutes>
  );
};

export default ProjectLid;
