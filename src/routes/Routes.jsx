import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//public
import Home from "../Pages/public/Home";
import { NotFound } from "../Pages/public/NotFound";
import ProjectList from "../Pages/public/ProjectList";
//private
import UserList from "../Pages/admin/UserList";
import EditarUsuario from "../Pages/admin/EditarUsuario";

//layouts
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";

const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<PrivateLayout />}>
        </Route>
          <Route path="/" element={<PublicLayout />}>
          <Route path="" element={<Home />} />
          <Route path="usuarios" element={<UserList />} />
          <Route path="usuarios/editar/:_id" element={< EditarUsuario/>} />
          <Route path="proyectos" element={<ProjectList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Rutas;
