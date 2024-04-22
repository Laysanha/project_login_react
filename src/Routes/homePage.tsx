import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from '../main'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

export const HomePage = () => {
    const [openModal, setOpenModal] = useState(true);
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);
    async function handleDeslogar(){
        try {
            await signOut(auth);
            localStorage.removeItem('user')
        } catch (err) {
            console.log(err);
        }
    }

    function handleCloseModal() { 
        setOpenModal(false);
    }
    
    return(
        <>
            <Dialog open={openModal}>
                <DialogTitle>{"Teste"}</DialogTitle>       
                <DialogContent>
                    <DialogContentText>
                        {"Teste Content"}
                    </DialogContentText>
                </DialogContent>       
                <DialogActions>
                    <button onClick={handleCloseModal}>Ok</button>
                </DialogActions>
            </Dialog>
            <div>
                <nav> 
                    <ul>
                        <li> Projeto React </li> 
                        <div>
                            <button type="button" onClick={() => {handleDeslogar()}}>Desconectar</button>
                        </div>
                    </ul> 
                </nav>
                <h1>Seja Bem-Vindo(a)</h1>
            </div>
        </>

    )
}
