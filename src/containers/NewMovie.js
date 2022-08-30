import React from "react";
import { Container } from "react-bootstrap";
import AddMovie from "../components/AddMovie";

const GetMovies = () => {
  return (
    <Container>
      <h2 className="text-center">Añadir pelicula</h2>
      <AddMovie />
    </Container>
  );
};

export default GetMovies;
