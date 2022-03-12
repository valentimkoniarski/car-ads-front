import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "./Navbar";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import api from "../services/Api";

function HomePage() {
  const [anuncios, setAnuncios] = useState([{}]);
  const [fotos, setFotos] = useState([]);

  const [loadingApi, setLoadingApi] = useState(true);

  const carregar = async () => {
    const response = await api.get("/veiculos/home");
    setAnuncios(response.data);

    response.data.forEach((anuncio) => {
      anuncio.fotos.forEach((foto) => {
        const obj = {
          veiculo_id: anuncio.id,
          fotos: foto.fotos,
          principal: foto.principal,
        };

        setFotos((fotos) => [...fotos, obj]);
      });
    });

    setLoadingApi(false);
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <>
      <Navbar />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop="50px"
      >
        {loadingApi ? (
          <CircularProgress />
        ) : (
          <ImageList
            cols={3}
            rowHeight={164}
            sx={{ width: 1000 }}
            style={{
              margin: "auto",
              overflow: "hidden",
              padding: "50px",
            }}
          >
            {anuncios.map((anuncio) => (
              <div key={anuncio.id} style={{ padding: "40px" }}>
                <Link
                  to={`/homepage/veiculos/${anuncio.id}`}
                  key={anuncio.id}
                  style={{ marginTop: "25px", textDecoration: "none" }}
                >
                  <ImageListItem
                    key={anuncio.id}
                    style={{
                      width: "100%",
                      height: "100%",

                      overflow: "hidden",
                      borderRadius: "10px",
                    }}
                  >
                    {fotos.map((foto) => {
                      if (
                        foto.veiculo_id === anuncio.id &&
                        foto.principal === true
                      ) {
                        return (
                          <img height="100" src={foto.fotos} loading="lazy" />
                        );
                      }
                    })}

                    <div
                      style={{
                        backgroundColor: "#4f92ff",
                      }}
                    >
                      <ImageListItemBar
                        style={{
                          padding: "10px",
                        }}
                        title={anuncio.marca}
                        subtitle={
                          <div>
                            <div>{anuncio.descricao}</div>
                            <div>{anuncio.preco}</div>
                          </div>
                        }
                        position="below"
                      />
                    </div>
                  </ImageListItem>
                </Link>
              </div>
            ))}
          </ImageList>
        )}
      </Box>
    </>
  );
}

export default HomePage;
