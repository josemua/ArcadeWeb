import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";


const Navbars = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const [textButton, setTextButton] = useState("Login");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setTextButton("Logout");
      setName(user.name);
    } else {
      setTextButton("Login");
      setName("");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      localStorage.setItem("token", accessToken);
    };
    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img className="Logo" src="https://i.ibb.co/V98ydJq/logo.png" alt="logo" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/proyectos">Proyectos</Nav.Link>
        </Nav>
        {isAuthenticated ? (
          <NavDropdown title={name} id="navbarScrollingDropdown">
            <NavDropdown.Item href="/proyectos">Proyectos</NavDropdown.Item>
            <NavDropdown.Item href="/usuarios">Usuarios</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/inscripciones">Inscripciones</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/avances">Avances</NavDropdown.Item>
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
        )}
      </Container>
    </Navbar>
  );
};

export default Navbars;
