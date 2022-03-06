import React from "react";

import { Route, Navigate } from "react-router-dom";

import { isAuthenticated } from "./auth";
import Main from "../components/main";

const PrivateRoute = () => (
  <Route
    render={({ location }) =>
      isAuthenticated() ? (
        <Main />
      ) : (
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
      )
    }
  />
);

export default PrivateRoute;
