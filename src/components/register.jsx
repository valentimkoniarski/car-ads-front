import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/Api";
import { login } from "../services/auth";

import { TextField, Button, Container } from "@material-ui/core";

import Alert from "@mui/material/Alert";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmar, setSenhaConfirmar] = useState("");

  const [erros, setErros] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== senhaConfirmar) {
      setErros(["Senhas não conferem"]);
      return;
    }

    if (senha.length < 6) {
      setErros(["Senha deve ter no mínimo 6 caracteres"]);
      return;
    }

    setErros([]);

    await api
      .post("/auth/register", { nome, email, senha })
      .then((response) => {
        login(response.data.token);
        window.location.href =
          "http://valentimkoniarski.github.io/car-ads-front/#/login";
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

      <form onSubmit={handleRegister}>
        <TextField
          id="idUsername"
          label="E-mail"
          placeholder="Informe seu email"
          required
          variant="outlined"
          margin="normal"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={erros.includes("email")}
          helperText={erros.includes("email") ? "Email já cadastrado" : ""}
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
          error={erros.includes("senha")}
          helperText={
            erros.includes("senha")
              ? "Senha deve ter no mínimo 6 caracteres"
              : ""
          }
        />
        <TextField
          id="idPassword"
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
          required
          variant="outlined"
          margin="normal"
          fullWidth
          value={senhaConfirmar}
          onChange={(e) => setSenhaConfirmar(e.target.value)}
          error={erros.includes("senhaConfirmar")}
          helperText={
            erros.includes("senhaConfirmar") ? "Senhas não conferem" : ""
          }
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "25px" }}
        >
          Cadastrar
        </Button>

        <Link to="/login" style={{ marginTop: "25px", textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "25px" }}
          >
            Já possui uma conta?
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

export default Register;
