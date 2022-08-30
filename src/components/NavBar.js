import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/catalogo">WaliMovies</Navbar.Brand>
        <Nav>
          <Link to="/catalogo" className="nav-link">
            Catálogo
          </Link>
          <Link to="/eliminar" className="nav-link">
            Eliminar
          </Link>
          <Link to="/anadir" className="nav-link">
            Añadir
          </Link>
          <Link to="/editar" className="nav-link">
            Editar
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
