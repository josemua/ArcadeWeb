import React from "react";
import { useUser } from "context/user";
import { useAuth } from "context/auth";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import PrivateComponent from "./PrivateComponent";


//import logoInicio from "logo2.png"


const Navbars = () => {
  const {authToken} = useAuth();
  const { userData } = useUser();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img className="Logo" src="" alt="logo" />
        </Navbar.Brand>
        <Nav className="me-auto iconNavbar">
          <Nav.Link href="/">
            <i className="bx bxs-home"></i>
            Inicio
          </Nav.Link>
          <Nav.Link href="/proyectos" className="iconNavbar">
            <i className="bx bx-folder-open"></i>
            Proyectos
          </Nav.Link>
        </Nav>
        {authToken ? (
          <Nav>
            <NavDropdown title={userData.correo} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/proyectos">
                <i className="bx bx-folder-open" />
                Proyectos
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/inscripciones">
                <i className="bx bx-edit" />
                Inscripciones
              </NavDropdown.Item>
              <NavDropdown.Item href="proyectos/avances/:id">
                <i className="bx bx-calendar-check" />
                Avances
              </NavDropdown.Item>
              <NavDropdown.Item href={`/admin/usuarios/editar/${userData._id}`}>
                <i className="bx bxs-user-rectangle" />
                Editar Perfil
              </NavDropdown.Item>
              <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin/usuarios">
                <i className="bx bxs-user-rectangle" />
                Usuarios
              </NavDropdown.Item>
              </PrivateComponent>
            </NavDropdown>
          </Nav>
        ) : null}
        {authToken ? (
          <Nav className="me-auto iconNavbar">
          <Nav.Link onClick={() => localStorage.setItem("token", null)} href="/login" className="iconNavbar">
            <i className="bx bx-log-out" />
            Cerrar Sesión
          </Nav.Link>
          </Nav>
        ) : (
          <Nav className="me-auto iconNavbar">
            <Nav.Link href="/login" className="iconNavbar">
              <i className="bx bx-log-in"></i>
              Log-In
            </Nav.Link>
            <Nav.Link href="/registro" className="iconNavbar">
              <i className="bx bx-edit"></i>
              Registrarse
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Navbars;
