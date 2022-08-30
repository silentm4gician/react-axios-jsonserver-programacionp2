import React from "react";
import { Card, Button } from "react-bootstrap";
import "./styles/style.css";

const MovieCard = ({ movie }) => {

  const handleClick = (e) => 
  {
    window.location.href = `https://ww1.cuevana3.me/?s=${e.target.name}`; 
  }

  return (
    <div className="d-flex justify-content-center col-3">
      <Card className="card mb-3 border-0">
        <img src={movie.image} alt="403 FORBIDDEN" className="image-card" />
        <Card.Body>
          <Card.Title className="text-center titulo">
            {movie.name}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px" }}>{movie.resume}</Card.Text>
          <Card.Text style={{ fontSize: "11px" }}>
            Fecha de estreno: {movie.date}
          </Card.Text>
          <Card.Text style={{ fontSize: "11px" }}>
            Generos:{" "}
            {movie.genres.map((genre, i) => {
              if (i === movie.genres.length - 1) {
                return `${genre}.`;
              } else {
                return `${genre}, `;
              }
            })}
          </Card.Text>
        </Card.Body>
        <Button
          className="button-center d-flex justify-content-center button-style"
          style={{
            width: "8rem",
            fontSize: "14px",
            margin: "auto",
            marginBottom: "12px",
          }}
          name = {movie.name}
          onClick = {handleClick}
        >
          VER
        </Button>
      </Card>
    </div>
  );
};

export default MovieCard;
