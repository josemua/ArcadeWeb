import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//public
import Home from "../Pages/public/Home";
import { NotFound } from "../Pages/public/NotFound";
import Registro from "../Pages/public/Registro";
import Login from "../Pages/public/Login";
import ProjectList from "../Pages/public/ProjectList";

//private
import UserList from "../Pages/private/UserList";
import EditarUsuario from "../Pages/private/EditarUsuario";
import CrearProyecto from "../Pages/private/CrearProyecto";

//layouts
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";

const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route path="usuarios" element={<UserList />} />
          <Route path="usuarios/editar/:_id" element={<EditarUsuario />} />
          <Route path="proyectos/nuevo" element={<CrearProyecto />} />
        </Route>
        <Route path="/" element={<PublicLayout />}>
          <Route path="" element={<Home />} />
          <Route path="registro" element={<Registro />} />
          <Route path="login" element={<Login />} />
          <Route path="proyectos" element={<ProjectList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Rutas;
