import React from "react";

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "../services/PrivateRoute";

import Login from "../components/login";
import Register from "../components/register";
import Main from "../components/main";
import HomePage from "../components/HomePage";
import ShowCar from "../components/ShowCar";
import Dashboard from "../components/Dashboard";

import AddVehicles from "../components/vehicles/AddVehicles";
import EditVehicles from "../components/vehicles/EditVehicles";
import Vehicles from "../components/vehicles/Vehicles";

import { isAuthenticated } from "../services/auth";
import { logout } from "../services/auth";
import { getToken } from "../services/auth";

import "../styles.css";

import "react-pro-sidebar/dist/css/styles.css";

function Private() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
}

function Logout() {
  logout(getToken());
  return <Navigate to="/login" />;
}

const Rota = () => (
  <HashRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<HomePage />}></Route>

      <Route
        path="/login"
        element={!isAuthenticated() ? <Private /> : <Login />}
      ></Route>
      <Route
        path="/car-ads-front"
        element={!isAuthenticated() ? <Private /> : <Login />}
      ></Route>
      <Route
        path="/car-ads-front/dashboard"
        element={!isAuthenticated() ? <Private /> : <Dashboard />}
      ></Route>
      <Route path="/homepage/veiculos/:id" element={<ShowCar />}></Route>
      <Route
        path="/main"
        element={!isAuthenticated() ? <Private /> : <Main />}
      ></Route>
      <Route
        path="/anuncios"
        element={!isAuthenticated() ? <Private /> : <Vehicles />}
      />
      <Route
        path="/anuncios/adicionar"
        element={!isAuthenticated() ? <Private /> : <AddVehicles />}
      />
      <Route
        path="/anuncios/editar/:id"
        element={!isAuthenticated() ? <Private /> : <EditVehicles />}
      />

      <Route path="/logout" element={<Logout />} />
    </Routes>
  </HashRouter>
);

export default Rota;
