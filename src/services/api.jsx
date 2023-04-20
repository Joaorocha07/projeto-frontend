import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createSession = async(email, senha) => {
    return api.post('/sessions', { email, senha });
}

export const createUser = async(email, senha, senhaConfirm, dataNascimento, nome) => {
    return api.post('/usuarios', { email, senha, senhaConfirm, dataNascimento, nome });
  }
  

export const getUsuarios = async(userId, query) => {
    let url = `/users/${userId}/usuarios/`

    if(query !== '') {
        url += `?=${query}`
    }

    return api.get(url);

    // http://localhost:5000/users/ID/usuarios/?=xxx

};

