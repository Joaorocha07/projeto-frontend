import './styles.css';

import React, { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if(!senha && !email) {
            return setErro("Insira os campos Senha e E-mail!");
        }

        if(!email) {
            return setErro("Insira o campo E-mail!");
        }

        if(!senha) {
            return setErro("Insira o campo Senha!");
        }

        setErro();

        console.log("handleLogin", { email, senha });
        login(email, senha);
    }

    const handleCadastrar = (event) => {
        event.preventDefault();
        navigate("/cadastro");
    }

    return (
        <div className="container-login">
            <div className="area-login box">
                <div className="first-column">
                    <h2 className="title title-first">Seja bem vindo!</h2>
                    <p className="text text-first">Você não tem o cadastro</p>
                    <p className="text text-first">Crie sua conta agora!</p>
                    <button className="btn btn-cadastrar" onClick={handleCadastrar}>Cadastrar</button>
                </div>

                <div className="second-column">
                    <h2 className="title title-second">Entre em sua conta</h2>

                    <p className="text text-second">Insira seus dados a-baixo para logar em sua conta!</p>

                    <form className="form">

                        <label className='label-input' htmlFor="email">
                            <FontAwesomeIcon icon={faEnvelope} className="icon-modify"/>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                placeholder="E-mail" 
                                value={email} 
                                onChange={(event) => setEmail(event.target.value)} 
                            />
                        </label>

                        <label className='label-input' htmlFor="senha">
                            <FontAwesomeIcon icon={faLock} className='icon-modify' />
                            <input 
                                type="password" 
                                name="senha" 
                                id="senha"
                                placeholder="Senha" 
                                value={senha} 
                                onChange={(event) => setSenha(event.target.value)} 
                            />
                        </label>

                        {erro && <div className="error-message">{erro}</div>}

                        <button className="btn btn-login" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;