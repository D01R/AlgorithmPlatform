import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (stateForm) => {
    const {data} = await $host.post('/api/user/registration', stateForm);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token)
}

export const login = async(stateForm) => {
    const {data} = await $host.post('/api/user/login', stateForm);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token)
}