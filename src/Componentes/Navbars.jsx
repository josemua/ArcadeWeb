import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";


const Navbars = () => {


  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img className="Logo" src="https://i.ibb.co/V98ydJq/logo.png" alt="logo" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/proyectos">Proyectos</Nav.Link>
          <Nav.Link href="/usuarios">Usuarios</Nav.Link>
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
