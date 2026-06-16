import axiosAuth from "./axiosInstance";

const API_URL = "/games";

export const getGamesRequest = () =>
    axiosAuth.get(API_URL);

export const getGameSlugRequest = (slug) =>
    axiosAuth.get(`${API_URL}/juegoPorSlug/${slug}`)

export const getGamesTypeAndSlugRequest = (type, slug) =>
    axiosAuth.get(`${API_URL}/juegosPorTypeYSlug/${type}/${slug}`)

export const uploadGameRequest = (formData) =>
    axiosAuth.post(`${API_URL}/crearJuego`, formData);

export const updateGameRequest = (id, game) =>
    axiosAuth.put(`${API_URL}/actualizarJuego/${id}`, game);

export const activateGameRequest = (id, status) =>
    axiosAuth.put(`${API_URL}/desactivar/${id}`, {isActive: status});