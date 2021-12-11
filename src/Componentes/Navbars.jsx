import React from "react";
import { useUser } from "context/user";
import { useAuth } from "context/auth";
import { Link } from 'react-router-dom';
import { Nav, NavDropdown } from "react-bootstrap";
import PrivateComponent from "./PrivateComponent";

const Navbars = () => {
  const {authToken} = useAuth();
  const { userData } = useUser();

  return (
    <nav className="barraNavegacion">
      <Link to="/">
      <img className="logoInicio" src="https://i.ibb.co/qjvKv9R/Logo.png" alt="Logo" border="0"/>
      </Link>
        {authToken ? (
          <>
        <div className="cajasnav">
            <Link to={`/user/usuarios/editar/${userData._id}`} className="linkNav">
            <i class='bx bx-user-circle'></i>
              <span className="nombres_links">Perfil</span>
            </Link>
        </div>
        <div className="cajasnav">
          <Link to="/user/proyectos" className="linkNav">
          <i className="bx bx-folder-open"></i>
              <span className="nombres_links">Proyectos</span>
          </Link>
        </div>
        <PrivateComponent roleList={["ADMINISTRADOR"]}>
          <div className="cajasnav">
            <Link to="/user/usuarios" className="linkNav">
              <i className="bx bxs-user-rectangle" />
                <span className="nombres_links">Usuarios</span>
            </Link>
          </div>
        </PrivateComponent>
        <PrivateComponent roleList={["LIDER"]}>
          <div className="cajasnav">
            <Link to="/user/inscripciones" className="linkNav">
            <i className="bx bx-edit" />
                <span className="nombres_links">Inscripciones</span>
            </Link>
          </div>
          <div className="cajasnav">
            <Link to="/user/proyectosLid" className="linkNav">
              <i class='bx bxs-copy-alt'></i>
              <span className="nombres_links">Mis proyectos</span>
            </Link>
          </div>
        </PrivateComponent>
        <PrivateComponent roleList={["ESTUDIANTE"]}>
          <div className="cajasnav">
            <Link to="/user/avances" className="linkNav">
              <i className="bx bx-calendar-check" />
                <span className="nombres_links">Avances</span>
            </Link>
          </div>
        </PrivateComponent>
          <Nav>
            <NavDropdown title={userData.nombre} id="navbarScrollingDropdown">
              <NavDropdown.Item href="user/proyectos">
                <i className="bx bx-folder-open" />
                Proyectos
              </NavDropdown.Item>
              <NavDropdown.Item href="/user/inscripciones">
                <i className="bx bx-edit" />
                Inscripciones
              </NavDropdown.Item>
              <NavDropdown.Item href="/user/avances">
                <i className="bx bx-calendar-check" />
                Avances
              </NavDropdown.Item>
              <NavDropdown.Item href={`/user/usuarios/editar/${userData._id}`}>
                <i className="bx bxs-user-rectangle" />
                Editar Perfil
              </NavDropdown.Item>
              <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/user/usuarios">
                <i className="bx bxs-user-rectangle" />
                Usuarios
              </NavDropdown.Item>
              </PrivateComponent>
            </NavDropdown>
          </Nav>
          </>
        ) : null}
        {authToken ? (
          <Nav className="me-auto iconNavbar">
          <Nav.Link onClick={() => localStorage.setItem("token", null)} href="/login" className="iconNavbar">
            <i className="bx bx-log-out" />
            Cerrar Sesión
          </Nav.Link>
          </Nav>
        ) : (
          <>  
            <div className="cajasnav">
              <Link to="/" className="linkNav">
                <i className="bx bxs-home"></i>
                <span className="nombres_links">Inicio</span>
              </Link>
            </div>
          <div className="cajasnav">
            <Link to="/login" className="linkNav">
            <i className="bx bx-log-in"></i>
              <span className="nombres_links">Log-In</span>
            </Link>
          </div>
          <div className="cajasnav">
          <Link to="/registro" className="linkNav">
            <i class='bx bx-file'></i>
            <span className="nombres_links">Registrarse</span>
          </Link>
          </div>
          </>
        )}
    </nav>
  );
};

export default Navbars;
