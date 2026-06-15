import axios from "axios";

const API_URL = "http://localhost:3000/api/genres";

export const getGenresRequest = () =>
    axios.get(API_URL);

export const uploadGenreRequest = (formData) =>
    axios.post(`${API_URL}/crearGenero`, formData);

export const updateGenreRequest = (id, genre) =>
    axios.put(`${API_URL}/actualizarGenero/${id}`, genre);

export const activateGenreRequest = (id, status) =>
    axios.put(`${API_URL}/desactivar/${id}`, {isActive: status});