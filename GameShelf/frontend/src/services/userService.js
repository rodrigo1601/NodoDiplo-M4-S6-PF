import axiosAuth from "./axiosInstance";

const API_URL = "/users";

export const getUsersRequest = () =>
    axiosAuth.get(API_URL);

export const getUserByIdRequest = (id) =>
    axiosAuth.get(`${API_URL}/usuariosPorId/${id}`);

export const registerRequest = (user) =>
    axiosAuth.post(`${API_URL}/register`, user);

export const loginRequest = (credentials) =>
    axiosAuth.post(`${API_URL}/login`, credentials);

export const createUserRequest = (user) =>
    axiosAuth.post(`${API_URL}/crearUsuario`, user);

export const updateUserRequest = (id, user) =>
    axiosAuth.put(`${API_URL}/actualizarUsuario/${id}`, user);

export const updateUserByAdminRequest = (id, user) =>
    axiosAuth.put(`${API_URL}/actualizarUsuarioPorAdmin/${id}`, user);

export const activateUserRequest = (id, status) =>
    axiosAuth.put(`${API_URL}/desactivar/${id}`, {isActive: status});

export const deleteUserRequest = (id) =>
    axiosAuth.delete(`${API_URL}/eliminarUsuario/${id}`);