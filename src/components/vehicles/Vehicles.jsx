import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
} from "@material-ui/core";

import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Aside from "../Aside";
import api from "../../services/Api";

function Vehicles() {
  const [arrayVehicles, setArrayVehicles] = useState([{}]);

  const styleTable = {
    width: "180%",
    margin: "auto",
    marginLeft: "-20%",
    marginTop: "5%",
  };

  const buttonStyle = {
    margin: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    marginBottom: "10px",
  };

  useEffect(() => {
    async function getVehicles() {
      const response = await api.get("/veiculos/anuncios");
      setArrayVehicles(response.data);
    }

    getVehicles();
  }, []);

  async function deleteVehicles(id) {
    const response = await api.delete(`/veiculos/${id}`);

    if (response.status === 204) {
      alert("Veículo deletado com sucesso!");
      window.location.reload();
    } else {
      alert("Erro ao deletar veículo!");
    }
  }

  return (
    <div className="App">
      <Aside />

      <Container>
        <Link to="/anuncios/adicionar" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" style={buttonStyle}>
            Adicionar Veículo
          </Button>
        </Link>

        <Table
          style={{
            margin: "auto",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Ano</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          {arrayVehicles.map((vehicle) => (
            <TableBody>
              <TableRow>
                <TableCell key={vehicle.id}>{vehicle.id}</TableCell>
                <TableCell key={vehicle.modelo}>{vehicle.modelo}</TableCell>
                <TableCell key={vehicle.marca}>{vehicle.marca}</TableCell>
                <TableCell key={vehicle.ano}>{vehicle.ano}</TableCell>
                <TableCell key={vehicle.preco}>{vehicle.preco}</TableCell>
                <TableCell>
                  <Button>
                    <Link
                      to={`/anuncios/editar/${vehicle.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <FaEdit />
                    </Link>
                  </Button>
                  <Button
                    onClick={() => {
                      deleteVehicles(vehicle.id);
                    }}
                  >
                    <FaTrashAlt />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </Container>
    </div>
  );
}

export default Vehicles;
