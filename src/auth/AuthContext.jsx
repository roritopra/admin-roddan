import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const authContext = createContext();

export function AuthContext({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) setUser(currentUser);
      else {
        setUser(null);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("The email address is not formatted correctly.");
            break;
          case "auth/invalid-credential":
            setErrorMessage("Invalid email or password");
            break;
          default:
            setErrorMessage(error.message);
        }
      });
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("The email address is not formatted correctly.");
            break;
          case "auth/invalid-login-credentials":
            setErrorMessage("Invalid email or password");
            break;
          default:
            setErrorMessage(error.message);
        }
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const values = {
    user,
    setUser,
    login,
    register,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    logout,
  };

  return (
    <authContext.Provider value={values}>
      {!loading && children}
    </authContext.Provider>
  );
}
