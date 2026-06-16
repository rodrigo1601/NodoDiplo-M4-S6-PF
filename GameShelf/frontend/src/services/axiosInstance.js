import axios from "axios";

const axiosAuth = axios.create({
    baseURL: "https://nododiplo-m4-s6-pf.onrender.com/api"
   // baseURL: "http://localhost:3000/api"
});

axiosAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosAuth;