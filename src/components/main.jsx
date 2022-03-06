import React from "react";

import api from "../services/Api";
import { logout } from "../services/auth";
import { getToken } from "../services/auth";

export default function Main({ history }) {
  const handleLogout = () => {
    //const response = await api.delete(`/logout`, {});
    logout(getToken());
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <div>
      <h1 align="center">Main</h1>
      <div>
        <button type="button" onClick={() => handleLogout()}>
          Sair
        </button>
      </div>

      <div>
        <div>
          JSON Web Tokens are an open, industry standard RFC 7519 method for
          representing claims securely between two parties. JWT.IO allows you to
          decode, verify and generate JWT.
        </div>
      </div>
    </div>
  );
}
