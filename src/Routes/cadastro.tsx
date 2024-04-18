import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidationMessage } from "../Components/ValidationMessage";
import { auth } from '../main'
import { set } from "firebase/database";

export const Cadastro = () => {
    const [nome, setNome] =  useState("");
    const [sobrenome, setSobrenome] =  useState("");
    const [nascimento, setNascimento] =  useState("");
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const [confirmaPassword, setConfirmaPassword] =  useState("");
    const [errorMessage, setErrorMessage] =  useState("");
    const [error, setError] =  useState(false);
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isNumberValid, setIsNumberValid] = useState(false);
    const [isSpecialCharValid, setIsSpecialCharValid] = useState(false);
    const [isUpperCaseValid, setIsUpperCaseValid] = useState(false);

    const navigate = useNavigate()
    const db = getFirestore()

    async function handleCadastro(e){
        e.preventDefault();
        
        const lengthValid = password.length >= 6
        const numberValid = /\d/.test(password)
        const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        const upperCaseValid = /[A-Z]/.test(password)

        
        if (setIsLengthValid && setIsNumberValid && setIsSpecialCharValid && setIsUpperCaseValid){
            setIsLengthValid(lengthValid)
            setIsNumberValid(numberValid)
            setIsSpecialCharValid(specialCharValid)
            setIsUpperCaseValid(upperCaseValid)
            
            if (password != confirmaPassword){
                setErrorMessage("As senhas não coincidem.")
                setError(true)
                return  
            }
    
            createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userId = user.uid;
                await storeUserInFirestore(userId, user.email, nome, sobrenome, nascimento, password)
                navigate("/login");
            }).catch((error) => {
                console.log(error);
            })
        }        
    }
    async function storeUserInFirestore(uid: string, email: string | null, nome: string, sobrenome: string, nascimento: string, hashPassword: string){
        const userReference = doc(db, "users", uid)
        await setDoc(userReference, {uid, email, nome, sobrenome, nascimento, hashPassword})
    }

    return (
        <div>
            <h1>Cadastro</h1>
                <form action="">
                    <input 
                        type="text" 
                        placeholder="Nome"
                        onChange={(e) => {setNome(e.target.value)}}
                    />
                    <input 
                        type="text" 
                        placeholder="Sobrenome"
                        onChange={(e) => {setSobrenome(e.target.value)}}
                    />
                    <input 
                        type="date" 
                        placeholder="data de nascimento"
                        onChange={(e) => {setNascimento(e.target.value)}}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <input 
                        type="text" 
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value)}}
                    />

                    <ul>
                        <ValidationMessage isValid={isLengthValid}>A senha deve ter pelo menos <b>6 caracteres.</b> </ValidationMessage>
                        <ValidationMessage isValid={isNumberValid}>A senha deve conter pelo menos um <b>número.</b></ValidationMessage>
                        <ValidationMessage isValid={isSpecialCharValid}>A senha deve conter pelo menos um <b>caractere especial.</b></ValidationMessage>
                        <ValidationMessage isValid={isUpperCaseValid}>A senha deve conter pelo menos uma <b>letra maiúscula.</b></ValidationMessage>
                    </ul>

                    <input 
                        type="text" 
                        placeholder="ConfirmaPassword"
                        onChange={(e) => {setConfirmaPassword(e.target.value)}}
                    />
                    {error && <p>{errorMessage}</p>}
                    <button type="button" onClick={((e) => {handleCadastro(e)})}>Cadastrar-se</button>
                </form>
            <p>Não tem uma conta? <Link to="/login">Logar-se</Link></p>
            <Link to="/">Voltar</Link>
        </div>
    )
};