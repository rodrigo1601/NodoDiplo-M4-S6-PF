import axios from "axios";

const API_URL = "http://localhost:3000/api/games";

export const getGamesRequest = () =>
    axios.get(API_URL);

export const getGameSlugRequest = (slug) =>
    axios.get(`${API_URL}/juegoPorSlug/${slug}`)

export const getGamesTypeAndSlugRequest = (type, slug) =>
    axios.get(`${API_URL}/juegosPorTypeYSlug/${type}/${slug}`)

export const uploadGameRequest = (formData) =>
    axios.post(`${API_URL}/crearJuego`, formData);

export const updateGameRequest = (id, game) =>
    axios.put(`${API_URL}/actualizarJuego/${id}`, game);