import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import api from "../services/Api";
import { login } from "../services/auth";
import { salvaEmail } from "../services/auth";
import { getEmail } from "../services/auth";

import { TextField, Button, Container } from "@material-ui/core";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erros, setErros] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();

    await api
      .post("/auth", { email, senha })
      .then((response) => {
        login(response.data.token);

        salvaEmail(email);

        window.location.href =
          "http://valentimkoniarski.github.io/car-ads-front/#/anuncios";
      })

      .catch((error) => {
        if (error.response.status != 200 || error.response.status != 201) {
          setErros(["Senha ou Login incorretos"]);
        } else {
          setErros([]);
        }
      });
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        width: "40%",
        backgroundColor: "#f5f5f5",
        marginTop: "50px",
      }}
    >
      <div>
        <h1>Car Ads Login</h1>
      </div>

      <form onSubmit={handleLogin}>
        <TextField
          id="idUsername"
          label="E-mail"
          placeholder="Informe seu email"
          required
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="idPassword"
          label="Senha"
          type="password"
          placeholder="Informe sua senha"
          required
          variant="outlined"
          margin="normal"
          fullWidth
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "25px" }}
        >
          Entrar
        </Button>

        <Link
          to="/register"
          style={{ marginTop: "25px", textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "25px" }}
          >
            Cadastrar
          </Button>
        </Link>

        {erros.length > 0 && (
          <Alert severity="error" style={{ marginTop: "25px" }}>
            <ul>
              {erros.map((erro) => (
                <li key={erro}>{erro}</li>
              ))}
            </ul>
          </Alert>
        )}
      </form>
    </Container>
  );
}

export default Login;
