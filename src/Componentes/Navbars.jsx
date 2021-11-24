import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
//import logoInicio from "logo2.png"

const Navbars = () => {


  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img className="Logo" src="" alt="logo" />
        </Navbar.Brand>
        <Nav className="me-auto iconNavbar">
          <Nav.Link href="/">
            <i class='bx bxs-home'></i>
            Inicio</Nav.Link>
          <Nav.Link href="/proyectos" className="iconNavbar">
            <i class='bx bx-folder-open'></i>
            Proyectos</Nav.Link>
          <Nav.Link href="/usuarios" className="me-auto iconNavbar">
          <i class='bx bxs-user-rectangle'></i>
            Usuarios</Nav.Link>
        </Nav>
        {/* {isAuthenticated ? (
          <NavDropdown title={name} id="navbarScrollingDropdown">
            <NavDropdown.Item href="/proyectos">Proyectos</NavDropdown.Item>
            <NavDropdown.Item href="/admin/usuarios">Usuarios</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/admin/inscripciones">Inscripciones</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/admin/avances">Avances</NavDropdown.Item>
          </NavDropdown>
        ) : null}
        {isAuthenticated ? (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="btn btn-primary"
          >
            {textButton}
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="btn btn-primary"
          >
            {textButton}
          </button>
        )} */}
      </Container>
    </Navbar>
  );
};

export default Navbars;
