import axiosAuth from "./axiosInstance";

const API_URL = "/platforms";

export const getPlatformsRequest = () =>
    axiosAuth.get(API_URL);

export const uploadPlatformRequest = (formData) =>
    axiosAuth.post(`${API_URL}/crearPlataforma`, formData);

export const updatePlatformRequest = (id, platform) =>
    axiosAuth.put(`${API_URL}/actualizarPlataforma/${id}`, platform);

export const activatePlatformRequest = (id, status) =>
    axiosAuth.put(`${API_URL}/desactivar/${id}`, {isActive: status});