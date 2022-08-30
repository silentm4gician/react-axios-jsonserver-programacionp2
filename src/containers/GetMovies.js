import React from "react";
import { Container } from "react-bootstrap";
import MovieList from "../components/MovieList";

const GetMovies = () => {
  return (
    <Container>
      <h1 className="text-center">Catálogo de películas</h1>
      <MovieList />
    </Container>
  );
};

export default GetMovies;
