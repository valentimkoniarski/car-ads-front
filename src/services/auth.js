// Será responsável em gerenciar o token recebido da api e armazenar no localStorage.
import api from "./Api";

export const TOKEN_KEY = "@montreal-Token";
export const EMAIL_KEY = "@email";
export const USER_KEY = "@user";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getEmail = () => localStorage.getItem(EMAIL_KEY);

export const getUserId = () => localStorage.getItem(USER_KEY);

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(USER_KEY);
};

export const salvaEmail = (email) => {
  localStorage.setItem(EMAIL_KEY, email);
};

const userId = async () => {
  if (!isAuthenticated()) {
    return;
  }

  await api.get("/veiculos/user").then((response) => {
    localStorage.setItem(USER_KEY, response.data.id);
  });
};

userId();
