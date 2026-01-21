import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL_AUTH || "http://localhost:8082";

export const register = (data) => {
    return axios.post(`${BASE_URL}/register`, data);
};

export const login = (data) => {
    return axios.post(`${BASE_URL}/login`, data);
};