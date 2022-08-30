import React from "react";
import { Container } from "react-bootstrap";
import DeleteMovie from "../components/DeleteMovie";

const DelMovies = () => {
  return (
    <Container>
      <h2 className="text-center">Eliminar pelicula</h2>
      <DeleteMovie />
    </Container>
  );
};

export default DelMovies;
