/*
import Login from "./components/Login";
import Formulario from "./components/Formulario";
import Dashboard from "./components/Dashboard";
import Vehicles from "./components/vehicles/Vehicles";
import AddVehicles from "./components/vehicles/AddVehicles";
import UserSettings from "./components/settings/UserSettings";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Container } from "@material-ui/core";

function App() {
  const [lista, setLista] = useState([]);
  const [user, setUser] = useState();

  function enviar(dados) {
    setLista([...lista, dados.nome]);
  }

  return (
    <Container component="article" maxWidth="sm">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/formulario" element={<Formulario enviar={enviar} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/configuracoes" element={<Dashboard />} />
          <Route
            path="/dashboard/veiculos"
            element={<Dashboard componentRouter={<Vehicles />} />}
          />
          <Route
            path="/dashboard/veiculos/adicionar"
            element={<Dashboard componentRouter={<AddVehicles />} />}
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
*/

import React from "react";

import Rota from "./routes/rota";

const App = () => <Rota />;
export default App;
