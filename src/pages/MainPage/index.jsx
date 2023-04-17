import React, { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import Menu from "../../components/Menu";
import "./styles.css";

const MainPage = () => {

    const { logout } = useContext(AuthContext);
    // const [loading, setLoading] = useState(true);
    // const [loadingErro, setLoadingErro] = useState(false)

    const handleSair = (event) => {
        event.preventDefault(event);
        console.log("Sair")
        logout();
    }

    return (
        <div className="container-menu">
            <Menu onSair={handleSair} />
        </div>
    )
}

export default MainPage;