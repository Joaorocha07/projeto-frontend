import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendar, faUser, faTrophy, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Menu = ({ onSair }) => {
    return (
        <div className="navigation">
                <ul>
                    <li className="list">
                        <a href="./">
                            <FontAwesomeIcon icon={faHome} />
                            <span className="title">Home</span>
                        </a>
                    </li>
                </ul>
                
                <ul>
                    <li className="list">
                        <a href="./">
                            <FontAwesomeIcon icon={faCalendar} />
                            <span className="title">Calendario</span>
                        </a>
                    </li>
                </ul>
                
                <ul>
                    <li className="list">
                        <a href="./">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="title">Perfil</span>
                        </a>
                    </li>
                </ul>
                
                <ul>
                    <li className="list">
                        <a href="./">
                            <FontAwesomeIcon icon={faTrophy} />
                            <span className="list">Metas</span>
                        </a>
                    </li>
                </ul>
                
                <ul>
                    <li className="list">
                        <a href="./">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <button className="btn-sair" onClick={onSair}>
                                <span className="list">Sair</span>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>
    )
}

export default Menu;
