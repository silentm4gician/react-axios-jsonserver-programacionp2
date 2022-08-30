import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DeleteMovie = () => {
  const url = "http://localhost:3001/movies";

  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios.get(url);
    return response;
  };

  const [list, setList] = useState([]);

  const [select, setSelect] = useState(-1);

  useEffect(() => {
    getData().then((response) => {
      setList(response.data);
    });
  }, []);

  const handleSelect = ({ target }) => {
    const selectedOption = list.find((obj) => obj.name === target.value);
    setSelect(selectedOption.id);
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Seguro desea eliminar la película?",
      text: "No podrá revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/${select}`).then((res) => {
          if (res.status === 200) {
            Swal.fire(
              "Pelicula eliminada",
              "La pelicula se ha eliminado correctamente",
              "success"
            );
            navigate("/catalogo");
          } else {
            Swal.fire(
              "Error!",
              "Hubo un problema eliminando la película del catálogo",
              "error"
            );
          }
        });
      }
    });
  };

  return (
    <div>
      <Form.Select aria-label="Default select example" onChange={handleSelect}>
        {list.map((movie, i) => (
          <option key={i}>{movie.name}</option>
        ))}
      </Form.Select>
      <Button
        className="button-center d-flex justify-content-center button-style mt-3"
        style={{
          width: "8rem",
          fontSize: "14px",
          margin: "auto",
          marginBottom: "5px",
        }}
        variant="danger"
        onClick={handleDelete}
      >
        ELIMINAR
      </Button>
    </div>
  );
};

export default DeleteMovie;
