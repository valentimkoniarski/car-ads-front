import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../services/Api";

import Navbar from "./Navbar";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { Container, Typography, Box } from "@material-ui/core";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function ShowCar() {
  const [anuncio, setAnuncio] = useState([{}]);

  const [fotos, setFotos] = useState([]);

  const { id } = useParams();

  const carregar = async () => {
    const response = await api.get(`veiculos/home/${id}`);

    console.log(response.data);

    setAnuncio(response.data);
    setFotos(response.data.fotos);
  };

  useEffect(() => {
    carregar();
  }, []);

 

  return (
    <div
      style={{
        backgroundColor: "#dedfe0",
        width: "100%",
        height: "120%",
      }}
    >
      <Navbar />
      <Container
        style={{
          marginTop: "120px",
        }}
      >
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={fotos.length}
          visibleSlides={1}
          isIntrinsicHeight={true}
          isPlaying={true}
          interval={3000}
          infinite={true}
        >
          <Slider>
            {fotos.map((foto, index) => (
              <Slide index={index}>
                <img
                  style={{
                    width: "1200px",
                    height: "650px",
                    objectFit: "cover",
                    display: "block",
                    margin: "auto",
                    borderRadius: "10px",
                  }}
                  src={foto.fotos}
                  alt="foto"
                />
              </Slide>
            ))}
          </Slider>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
              width: "100%",
            }}
          >
            <ButtonBack
              style={{
                color: "#4f92ff",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <FaArrowLeft />
            </ButtonBack>
            <ButtonNext
              style={{
                color: "#4f92ff",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <FaArrowRight />
            </ButtonNext>
          </div>
        </CarouselProvider>

        <Box
          style={{
            marginTop: "50px",
            backgroundColor: "white",
            padding: "50px",

            borderRadius: "10px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {anuncio.marca}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {anuncio.modelo}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {anuncio.ano}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {anuncio.preco}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {anuncio.descricao}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default ShowCar;
