import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from '../main'

export const HomePage = () => {
    const [openModal, setOpenModal] = useState(true);

    async function handleDeslogar(){
        console.log(auth.currentUser)
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
                            <li> Nome </li> 
                            <li> E-mail </li> 
                            <button type="button" onClick={() => {handleDeslogar()}}>Desconectar</button>
                        </div>
                    </ul> 
                </nav>
                <h1>Seja Bem-Vindo(a)</h1>
            </div>
        </>

    )
}
