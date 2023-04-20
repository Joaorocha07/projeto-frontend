import './styles.css';

import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import { parseISO, differenceInYears } from "date-fns";

import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';

const CadastroPage  = () => {

    const { cadastrar } = useContext(AuthContext);

    const navigate = useNavigate();
    const [senhaConfirm, setsenhaConfirm]       = useState("");
    const [dataNascimento, setDataNascimento]   = useState("");
    const [nome, setNome]                       = useState("");
    const [email, setEmail]                     = useState("");
    const [senha, setSenha]                     = useState("");
    const [erro, setErro]                       = useState("");

    const handleCadastrar = async(event) => {
        event.preventDefault();

        if(nome.length < 8) {
            return setErro("Insira o nome e o sobrenome!");
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if(!emailRegex.test(email)) {
            return setErro("Insira um e-mail válido!");
        }

        if(senha.length < 8) {
            return setErro("A senha deve ter pelo menos 8 caracteres");
        }        

        if(senha !== senhaConfirm) {
            return setErro("As senhas não conferem!");
        }

        const birthYear = new Date(dataNascimento).getFullYear();
        if (birthYear < 1900) {
            return setErro("Data de nascimento inválida!");
        }

        const MINIMO_IDADE = 12;
        const parsedDate = parseISO(dataNascimento);
        const idade = differenceInYears(new Date(), parsedDate);
      
        if (idade < MINIMO_IDADE) {
          return setErro("Você precisa ter pelo menos 12 anos para cadastrar");
        }

        if(!senhaConfirm || !dataNascimento || !nome || !email || !senha) {
            return setErro("Insira todos os campos!");
        }

        setErro();

        console.log("handleCadastrar", { nome, email, senha, senhaConfirm, dataNascimento });        
    
        cadastrar(email, senha, senhaConfirm, dataNascimento, nome);
    }

    const handleLogar = (event) => {
        event.preventDefault();
        navigate("/login");
    }

    return (
        <div className="container-cadastro">
            <div className="area-cadastro box">

                <div className="first-column">
                    <h2 className="title title-first">Seja bem vindo!</h2>
                    <p className="text text-first">Você já tem uma conta</p>
                    <p className="text text-first">Faça login em sua conta</p>
                    <button className="btn btn-cadastrar" onClick={handleLogar}>Logar</button>
                </div>

                <div className="second-column">
                    <h2 className="title title-second">Cadastre-se</h2>
                    <p className="text text-second">Insira seus dados a-baixo para criar uma conta!</p>

                    <form className="form">

                        <label className='label-input' htmlFor="nome">
                            <FontAwesomeIcon icon={faEnvelope} className="icon-modify"/>
                            <input 
                                type="text" 
                                name="nome" 
                                id="nome"
                                placeholder="Nome" 
                                value={nome} 
                                onChange={(event) => setNome(event.target.value)} 
                            />
                        </label>
                        
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
                        
                        <label className='label-input' htmlFor="senhaConfirm">
                            <FontAwesomeIcon icon={faLock} className='icon-modify' />
                            <input 
                                type="password" 
                                name="senhaConfirm" 
                                id="senhaConfirm"
                                placeholder="Confirme a senha" 
                                value={senhaConfirm} 
                                onChange={(event) => setsenhaConfirm(event.target.value)} 
                            />
                        </label>

                        <label className='label-input' htmlFor="dataNascimento">
                            <FontAwesomeIcon icon={faEnvelope} className="icon-modify"/>
                            <input 
                                type="date" 
                                name="dataNascimento" 
                                id="dataNascimento"
                                placeholder="Data de nascimento" 
                                value={dataNascimento} 
                                onChange={(event) => setDataNascimento(event.target.value)} 
                            />
                        </label>

                        {erro && <div className="error-message">{erro}</div>}

                        <button className="btn btn-login" onClick={handleCadastrar}>Cadastre-se</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CadastroPage;