import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (login, mail, password, name, surname, universityId) => {
    const {data} = await $host.post('/api/user/registratiion', {login, mail, password, name, surname, universityId});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token)
}

export const login = async(loginOrMail, password) => {
    const {data} = await $host.post('/api/user/login', {loginOrMail, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token)
}