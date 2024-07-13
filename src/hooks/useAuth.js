import { authContext } from "../auth/AuthContext"
import { useContext } from "react"

export function useAuth() {
    const context = useContext(authContext);
    if (!context){
        throw new Error("the component is not inside the provide authcontext")
    }
    const {   errorMessage,setPassword, password, email,setEmail,login, register, user, setUser } = context

    return{

    user,
    setUser,
    login,
    register,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage

    }
}

