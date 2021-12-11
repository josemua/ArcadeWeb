import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//public
import Home from "../Pages/public/Home";
import { NotFound } from "../Pages/public/NotFound";
import Registro from "Pages/public/Registro";
import Login from "Pages/public/Login";

import EditarUsuario from "../Pages/private/admin/EditarUsuario";
import ProjectList from "../Pages/private/ProjectList";
import DetallesProyecto from "../Pages/private/DetallesProyecto";
// import Perfil from "../Pages/private/Perfil";


//admin - lider
import UserList from "../Pages/private/admin/UserList";

//admin


//lider
import CrearProyecto from "../Pages/private/CrearProyecto";


//estudiante


//layouts
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";

const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<PrivateLayout />}>
          <Route path="usuarios" element={<UserList />} />
          <Route path="usuarios/editar/:_id" element={<EditarUsuario />} />
          <Route path="proyecto/:_id" element={<DetallesProyecto />} />
          <Route path="proyectos" element={<ProjectList />} />
          <Route path="proyectos/nuevo" element={<CrearProyecto />} />
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
