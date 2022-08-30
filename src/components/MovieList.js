import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Row from "react-bootstrap/esm/Row";

const MovieList = () => {
  const url = "http://localhost:3001/movies";

  const getData = async () => {
    const response = await axios.get(url);
    return response;
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    getData().then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <Row xs={1} md={3}>
      {list.map((movie, index) => (
        <MovieCard movie={movie} key={index} />
      ))}
    </Row>
  );
};

export default MovieList;
