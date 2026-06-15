import axios from "axios";

const API_URL = "http://localhost:3000/api/platforms";

export const getPlatformsRequest = () =>
    axios.get(API_URL);

export const uploadPlatformRequest = (formData) =>
    axios.post(`${API_URL}/crearPlataforma`, formData);

export const updatePlatformRequest = (id, platform) =>
    axios.put(`${API_URL}/actualizarPlataforma/${id}`, platform);

export const activatePlatformRequest = (id, status) =>
    axios.put(`${API_URL}/desactivar/${id}`, {isActive: status});