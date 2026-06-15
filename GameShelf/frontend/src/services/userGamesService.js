import axios from "axios";

const API_URL = "https://nododiplo-m4-s6-pf.onrender.com/api/userGames";

export const getUserGamesRequest = () =>
    axios.get(API_URL);

export const getUserGameByIdRequest = (id) =>
    axios.get(`${API_URL}/userGamesPorId/${id}`);

export const getUserGamesByUserRequest = (userId) =>
    axios.get(`${API_URL}/userGamesPorUsuario/${userId}`);

export const createUserGameRequest = (userGame) => 
    axios.post(`${API_URL}/crearUserGame`, userGame);

export const updateUserGameRequest = (id, userGame) =>
    axios.put(`${API_URL}/actualizarUserGame/${id}`, userGame);

export const deleteUserGameRequest = (id) =>
    axios.delete(`${API_URL}/eliminarUserGame/${id}`);