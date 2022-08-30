import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import NewMovie from "../containers/NewMovie";
import UpdateMovie from "../containers/UpdateMovie";
import GetMovies from "../containers/GetMovies";
import DelMovies from "../containers/DelMovie";

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<GetMovies />} />
        <Route path="/anadir" element={<NewMovie />} />
        <Route path="/editar" element={<UpdateMovie />} />
        <Route path="/eliminar" element={<DelMovies />} />
        <Route path="/catalogo" element={<GetMovies />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
