import axiosAuth from "./axiosInstance";

const API_URL = "/userGames";

export const getUserGamesRequest = () =>
    axiosAuth.get(API_URL);

export const getUserGameByIdRequest = (id) =>
    axiosAuth.get(`${API_URL}/userGamesPorId/${id}`);

export const getUserGamesByUserRequest = (userId) =>
    axiosAuth.get(`${API_URL}/userGamesPorUsuario/${userId}`);

export const createUserGameRequest = (userGame) => 
    axiosAuth.post(`${API_URL}/crearUserGame`, userGame);

export const updateUserGameRequest = (id, userGame) =>
    axiosAuth.put(`${API_URL}/actualizarUserGame/${id}`, userGame);

export const deleteUserGameRequest = (id) =>
    axiosAuth.delete(`${API_URL}/eliminarUserGame/${id}`);