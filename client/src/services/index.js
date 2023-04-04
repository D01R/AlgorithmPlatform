import axios from 'axios';

const $host = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    }
});

const $authHost = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    }
});

const authIntercepter = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
}

$authHost.interceptors.request.use(authIntercepter);

export {
    $host,
    $authHost
}