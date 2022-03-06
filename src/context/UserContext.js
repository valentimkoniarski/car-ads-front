import React from "react";
import { useAuth } from "./AuthContext";

const UserContext = React.createContext();

function UserProvider(props) {
  const { component } = useAuth();
  const isLogged = !!component;

  return <UserContext.Provider value={{ isLogged, user: component }} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };