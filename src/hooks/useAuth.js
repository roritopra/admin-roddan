import { authContext } from "../auth/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("the component is not inside the provide authcontext");
  }
  const {
    errorMessage,
    name,
    setName,
    lastName,
    setLastName,
    setPassword,
    password,
    email,
    setEmail,
    //providerLogin,
    login,
    register,
    user,
    setUser,
  } = context;

  return {
    user,
    setUser,
    name,
    setName,
    lastName,
    setLastName,
    login,
    register,
    email,
    setEmail,
    //providerLogin,
    password,
    setPassword,
    errorMessage,
  };
}
