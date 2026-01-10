import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/repo",
})

api.interceptors.request.use(
    (config) => {
        const access = localStorage.getItem("access");
        if (access && config.headers) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api
