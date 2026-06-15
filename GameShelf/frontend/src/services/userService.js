import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const getUsersRequest = () =>
    axios.get(API_URL);

export const getUserByIdRequest = (id) =>
    axios.get(`${API_URL}/usuariosPorId/${id}`);

export const registerRequest = (user) =>
    axios.post(`${API_URL}/register`, user);

export const loginRequest = (credentials) =>
    axios.post(`${API_URL}/login`, credentials);

export const createUserRequest = (user) =>
    axios.post(`${API_URL}/crearUsuario`, user);

export const updateUserRequest = (id, user) =>
    axios.put(`${API_URL}/actualizarUsuario/${id}`, user);

export const updateUserByAdminRequest = (id, user) =>
    axios.put(`${API_URL}/actualizarUsuarioPorAdmin/${id}`, user);

export const activateUserRequest = (id, status) =>
    axios.put(`${API_URL}/desactivar/${id}`, {isActive: status});

export const deleteUserRequest = (id) =>
    axios.delete(`${API_URL}/eliminarUsuario/${id}`);