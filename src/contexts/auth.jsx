import React, { useState, createContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if(user && token) {
            setUser(JSON.parse(user));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    // Função para o usuario logar no sistema
    const login = async (email, senha) => {
        try {
          const resposta = await createSession(email, senha);
      
          localStorage.setItem('user', JSON.stringify(resposta.data.user));
          localStorage.setItem('token', resposta.data.token);
      
          api.defaults.headers.Authorization = `Bearer ${resposta.data.token}`;
      
          setUser(resposta.data.user);
      
          navigate('/');
        } catch (erro) {
          if (erro.response && erro.response.status === 401) {
            return alert('E-mail ou senha incorretos');
          } else {
            console.error(erro);
            return 'Erro no servidor';
          }
        }
      }
      


    // Função para o usuario sair do sistema
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        api.defaults.headers.Authorization = null;

        setUser(null);

        navigate('/login');
    }

    return (
        <AuthContext.Provider 
            value={{
                authenticated: !!user,
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
