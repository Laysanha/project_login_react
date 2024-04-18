
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { auth } from '../main'

export const Login = () => {
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault();
        try{
            const userDoc = await getUserByEmail(email);    
            
            console.log(auth.currentUser)

            if (userDoc?.exists() && userDoc.data()){
                signInWithEmailAndPassword(auth, email, password)
                .finally(() => {
                    navigate("/homepage");
                })
                .catch ((error) => {
                    console.log(error);
                })  
            } else {
                console.log("Usuário não encontrado ou dados não disponíveis.");
            }
            
        } catch (error) { console.log(error); }        
    }

    async function getUserByEmail(email: string) {        
        const db = getFirestore()
        const usersRef = collection(db, "users");

        try {
            const querySnapshot = await getDocs(query(usersRef, where("email", "==", email)));
                    
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]
                return userDoc
            } else {return null}
         } catch (error) {
            console.log(error);
        }
    }
    
    async function handleGoogle(e){
        e.preventDefault();
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then((result) => {
            result.user
            navigate("/homepage")
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1>Login</h1>
                <form action="">
                    <input 
                        type="text" 
                        placeholder="E-mail"
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <input 
                        type="text" 
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <button type="button" onClick={((e) => {handleLogin(e)})}>Entrar</button>
                    <p>-----------------------------</p>
                    <button type="button" onClick={((e) => {handleGoogle(e)})}>Google</button>
                    <p>-----------------------------</p>
                </form>
                <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
            <Link to="/">Voltar</Link>
        </div>
    )
};