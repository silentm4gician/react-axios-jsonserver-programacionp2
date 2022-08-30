import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, FormLabel, FormCheck } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {

  const navigate = useNavigate();

  const url = "http://localhost:3001/movies";

  const genreUrl = "http://localhost:3001/genres";

  const [genreList, setGenreList] = useState([]);

  const [genreState, setGenreState] = useState([]);

  const [data, setData] = useState({
    name: "",
    image: "",
    resume: "",
    date: "",
    genres: "",
  }); 

  const handleChange = ({ target }) => 
  {
    setData({
      ...data,
      [target.name]: target.value, //propiedad dinamica
    });
  };

  const getGenre = async () => 
  {
    const response = await axios.get(genreUrl);
    return response;
  };

  useEffect(() => 
  {
    getGenre().then((response) => 
    {
      setGenreState(response.data);
    });
  }, []);

  const handleSwitchChange = (e) => 
  {
    if (e.target.checked === true) 
    {
      if (!genreList.includes(e.target.name)) 
      {
        setGenreList([...genreList, e.target.name]);
        setData({
          ...data,
          genres: [...genreList],
        });
      } else {
        return;
      }
    } else {
      return;
    }
  };

  useEffect(() => 
  {
    setData({
      ...data,
      genres: [...genreList],
    });
  }, [genreList]);

  const handleSubmit = async (e) => 
  {
    e.preventDefault(); //evita que se renderice toda la pag

    const response = await axios.post(url, data);
    if (response.status === 201) //created
    {
      Swal.fire(
        "Película añadida!",
        `La película ${response.data.name} se ha añadido correctamente`,
        "success"
      );
      navigate("/");
    } else 
    {
      Swal.fire(
        "Error!",
        `Hubo un problema añadiendo la película ${response.data.name} al catálogo`,
        "error"
      );
    }
  };
  

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="name"
            placeholder="Ingresar nombre de pelicula"
            value={data.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="resume"
            placeholder="Ingresar sinopsis"
            value={data.resume}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="image"
            placeholder="Ingresar url de imágen"
            value={data.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormLabel>Ingresar fecha de estreno:</FormLabel>
          <Form.Control
            type="date"
            name="date"
            placeholder="Ingresar fecha"
            value={data.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <FormLabel>Seleccionar género de la película</FormLabel>
          {genreState.map((genre, i) => (
            <FormCheck
              key={i}
              label={genre.genre}
              name={genre.genre}
              type="switch"
              id={genre.id}
              onClick={handleSwitchChange}
            />
          ))}
        </Form.Group>
        <button className="btn btn-success mt-3">Añadir</button>
      </Form>
    </div>
  );
};

export default AddMovie;
