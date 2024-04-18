import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../main'
import { Navigate } from "react-router-dom";

export const HomePage = () => {
    const [openModal, setOpenModal] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(!user){
                return <Navigate to="/login"/>
           }
        })
        return unsubscribe
    })

    async function handleDeslogar(){
        try {
            await signOut(auth);
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
