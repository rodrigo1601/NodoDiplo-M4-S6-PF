import axiosAuth from "./axiosInstance";

const API_URL = "/genres";

export const getGenresRequest = () =>
    axiosAuth.get(API_URL);

export const uploadGenreRequest = (formData) =>
    axiosAuth.post(`${API_URL}/crearGenero`, formData);

export const updateGenreRequest = (id, genre) =>
    axiosAuth.put(`${API_URL}/actualizarGenero/${id}`, genre);

export const activateGenreRequest = (id, status) =>
    axiosAuth.put(`${API_URL}/desactivar/${id}`, {isActive: status});