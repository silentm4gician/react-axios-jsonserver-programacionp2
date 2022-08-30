import React from "react";
import { Container } from "react-bootstrap";
import EditMovie from "../components/EditMovie";
import "../components/styles/style.css";

const UpdateMovie = () => {
  return (
    <Container className="si">
      <h2 className="text-center">Editar pelicula</h2>
      <EditMovie />
    </Container>
  );
};

export default UpdateMovie;
