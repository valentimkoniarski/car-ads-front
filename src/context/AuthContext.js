import React, { useState, useEffect } from "react";

const AuthContext = React.createContext();

// essa função seria usado caso vocês quisessem salvar
// o usuário logado em algum storage (async storage por ex)
// e recupera-lo após o aplicativo ser reiniciado
// ai esse método deveria recuperar um usuário previamente
// logado e devolve-lo pro Context indicar o login
//
// aqui ele está retornando apenas null indicando sempre
// um novo login
function restoreLoginFromStorage() {
  return null;
}

function AuthProvider(props) {

  const [component, setComponent] = useState();



  // deslogando o usuário e seu token
  const logout = () => {
    //setData(null);
  };

  // essa função recebe os dados do usuário logado
  // para deixa-lo disponível em toda aplicação
  // através do Context
  const Login = (userData) => {
    setComponent(userData);
  };

  return (
    <>
      <AuthContext.Provider value={{ component, logout, Login }} {...props} />
    </>
  );
}

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };
