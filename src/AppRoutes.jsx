import React, { useContext } from "react";

import { AuthProvider, AuthContext } from './contexts/auth';

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import CadastroPage from "./pages/CadastroPage";

const AppRoutes = () => {

    // Privando rotas que não estiver autenticadas / logadas
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if(loading) {
            return <div className="loading">Carregando...</div>
        }

        if(!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/cadastro" element={<CadastroPage />} />
                    <Route exact path="/" element={<Private><MainPage /></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;