import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate } from "react-router-dom";

export const Protected = ({ children }: PropsWithChildren) => {
    const user = useContext(AuthContext)
  
    if (!user){
        return <Navigate to="/login" replace></Navigate>
    } else {
        return children
    }
}