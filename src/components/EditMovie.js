import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, FormLabel, FormCheck } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditMovie = () => {
  const url = "http://localhost:3001/movies";

  const genreUrl = "http://localhost:3001/genres";

  const navigate = useNavigate();

  const [id, setId] = useState(-1);

  const [list, setList] = useState([]);

  const [genreList, setGenreList] = useState([]);

  const [genreState, setGenre] = useState([]);

  const [data, setData] = useState({
    name: "",
    image: "",
    resume: "",
    date: "",
  });

  const getData = async () => {
    const response = await axios.get(url);
    return response;
  };

  useEffect(() => {
    getData().then((response) => {
      setList(response.data);
    });
  }, []);

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleSelect = ({ target }) => {
    const selectedOption = list.find((obj) => obj.name === target.value);
    setData({
      name: selectedOption.name,
      image: selectedOption.image,
      resume: selectedOption.resume,
      date: selectedOption.date,
      genres: selectedOption.genres,
    });
    setId(selectedOption.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //evita que se recargue toda la pag cuando realizamos la accion
    const res = await axios.put(`${url}/${id}`, data);
    if (res.status === 200) {
      Swal.fire(
        "Película editada!",
        `La película se ha editado correctamente`,
        "success"
      );
      navigate("/");
    } else {
      Swal.fire("Error!", `Hubo un problema editando la película`, "error");
    }
  };

  const handleSwitchChange = (e) => {
    if (e.target.checked === true) {
      setGenreList([...genreList, e.target.name]);
      setData({
        ...data,
        genres: [...genreList],
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    setData({
      ...data,
      genres: [...genreList],
    });
  }, [genreList]);

  const getGenre = async () => {
    const response = await axios.get(genreUrl);
    return response;
  };

  useEffect(() => {
    getGenre().then((response) => {
      setGenre(response.data);
    });
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FormLabel>Seleccionar película a editar</FormLabel>
          <Form.Select
            aria-label="Default select example"
            onChange={handleSelect}
          >
            {list.map((movie, i) => (
              <option key={i}>{movie.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
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
            onChange={handleChange}
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
              referen="genres"
              id={`id${genre.id}`}
              onClick={handleSwitchChange}
            />
          ))}
        </Form.Group>
        <button className="btn btn-success mt-3">Editar</button>
      </Form>
    </div>
  );
};

export default EditMovie;
