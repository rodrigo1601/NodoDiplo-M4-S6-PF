import axiosAuth from "./axiosInstance";

const API_URL = "/developers";

export const getDevelopersRequest = () =>
    axiosAuth.get(API_URL);

export const uploadDeveloperRequest = (formData) =>
    axiosAuth.post(`${API_URL}/crearDesarrollador`, formData);

export const updateDeveloperRequest = (id, developer) =>
    axiosAuth.put(`${API_URL}/actualizarDesarrollador/${id}`, developer);

export const activateDeveloperRequest = (id, status) =>
    axiosAuth.put(`${API_URL}/desactivar/${id}`, {isActive: status});