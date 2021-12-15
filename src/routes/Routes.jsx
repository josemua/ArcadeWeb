import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//public
import Home from "../Pages/public/Home";
import { NotFound } from "../Pages/public/NotFound";
import Registro from "../Pages/public/Registro";
import Login from "../Pages/public/Login";

//private
import UserList from "../Pages/private/admin/UserList";
import ProjectList from "../Pages/private/ProjectList";
import Avances from "../Pages/private/Avances";
import Cartas from "../Componentes/cartas";
import EditarUsuario from "../Pages/private/EditarUsuario";
import DetallesProyecto from "../Pages/private/DetallesProyecto";
import AvanceList from "Pages/private/AvanceList";
// import Perfil from "../Pages/private/Perfil";

//admin
import ProjectListAdmin from "../Pages/private/admin/ProjectListAdmin";
import EditarProyectoAdmin from "../Pages/private/admin/EditarProyectoAdmin";

//lider
import CrearProyecto from "../Pages/private/lider/CrearProyecto";
import ProyectosLiderados from "../Pages/private/lider/ProyectosLiderados";
import EditarProyectoLider from "../Pages/private/lider/EditarProyectoLider";
import AdministrarInscripciones from "Pages/private/lider/AdministrarInscripciones";

//estudiante

//layouts
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";

const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<PrivateLayout />}>
          <Route path="usuarios/editar/:_id" element={<EditarUsuario />} />
          <Route path="usuarios" element={<UserList />} />
          <Route path="proyectosAdmin" element={<ProjectListAdmin />} />
          <Route path="proyectosAdmin/:id" element={<EditarProyectoAdmin />} />
          <Route path="proyectosLiderados" element={<ProyectosLiderados />} />
          <Route path="proyectos" element={<ProjectList />} />
          <Route path="proyecto/:id" element={<DetallesProyecto/>} />
          <Route path="proyecto/editar/:id" element={<EditarProyectoLider />} />
          <Route path="proyecto/inscripciones/:id" element={<AdministrarInscripciones />} />
          <Route path="proyecto/nuevo" element={<CrearProyecto />} />
          <Route path="proyecto/:id" element={<DetallesProyecto/>} />
          <Route path="cartas" element={<Cartas />} />
          <Route path="proyectos/avances" element={<Avances />} />
          <Route path="proyectos/avances/lista" element={<AvanceList />} />
        </Route>
        <Route path="/" element={<PublicLayout />}>
          <Route path="" element={<Home />} />
          <Route path="registro" element={<Registro />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Rutas;