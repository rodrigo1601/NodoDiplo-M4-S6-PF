import axios from "axios";

const API_URL = "https://nododiplo-m4-s6-pf.onrender.com/api/developers";

export const getDevelopersRequest = () =>
    axios.get(API_URL);

export const uploadDeveloperRequest = (formData) =>
    axios.post(`${API_URL}/crearDesarrollador`, formData);

export const updateDeveloperRequest = (id, developer) =>
    axios.put(`${API_URL}/actualizarDesarrollador/${id}`, developer);

export const activateDeveloperRequest = (id, status) =>
    axios.put(`${API_URL}/desactivar/${id}`, {isActive: status});