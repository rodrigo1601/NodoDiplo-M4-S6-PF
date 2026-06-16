import { useEffect, useState } from "react";

import { PlatformContext } from "./PlatformContext";

import { getPlatformsRequest, uploadPlatformRequest, updatePlatformRequest, activatePlatformRequest } from "../../services/platformsService";

export const PlatformProvider = ({ children }) => {

    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState("");

    useEffect(() => {

        const fetchPlatforms = async () => {
            try {
                const res = await getPlatformsRequest();
                setPlatforms(res.data.plataformas);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlatforms();

    }, []);

    const activePlatforms = platforms.filter(p => p.isActive);
    const allPlatforms = platforms;

    const createPlatform = async (data) => {
                    try {
        
                        setActionLoading(true);
                        setActionMessage("Creando plataforma...");
                        const formData = new FormData();
        
                        formData.append("nombre", data.nombre);
                        formData.append("slug", data.slug);
                        formData.append("descripcion", data.descripcion);
                        formData.append("logo", data.logo[0]);
                        formData.append("miniLogo", data.miniLogo);
        
                        const res = await uploadPlatformRequest(formData);
            
                        const { plataforma } = res.data;
        
                        setPlatforms(prev => [...prev, plataforma]);
        
                        return { success: true };
                    } catch (error) {
                        console.error("Error en registro:", error);
                        return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                    }finally{
                        setActionLoading(false);
                    }
    };

    const updatePlatform = async (id, data) => {
                    try {
        
                        setActionLoading(true);
                        setActionMessage("Actualizando plataforma...");
                        const formData = new FormData();
        
                        formData.append("nombre", data.nombre);
                        formData.append("slug", data.slug);
                        formData.append("descripcion", data.descripcion);
                        formData.append("isActive", data.isActive);
                        formData.append("miniLogo", data.miniLogo);
        
                        if (data.logo?.[0]){
                            formData.append("logo", data.logo[0]);
                        }
                        
                        const res = await updatePlatformRequest(id, formData);
            
                        const { plataforma } = res.data;
        
                        setPlatforms(prev =>
                            prev.map(platform =>
                                platform._id === plataforma._id
                                    ? plataforma
                                    : platform
                            )
                        );
        
        
                        return { success: true };
                    } catch (error) {
                        console.error("Error en registro:", error);
                        return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                    } finally {
                        setActionLoading(false);
                    }
    };

    const activatePlatform = async (id, status) => {

                    try {
        
                        setActionMessage(status ? "Activando plataforma..." : "Desactivando plataforma...");
                        setActionLoading(true);
                        const formData = new FormData();
        
                        formData.append("isActive", status);
                        
                        const res = await activatePlatformRequest(id, status);
            
                        const { plataforma } = res.data;
        
                        setPlatforms(prev =>
                            prev.map(genre =>
                                genre._id === plataforma._id
                                    ? plataforma
                                    : genre
                            )
                        );
        
                        return { success: true };
                    } catch (error) {
                        console.error("Error en registro:", error);
                        return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                    } finally{
                        setActionLoading(false)
                    }
    };

    return (
        <PlatformContext.Provider value={{
            platforms: activePlatforms,
            allPlatforms,
            loading,
            actionLoading,
            actionMessage,
            createPlatform,
            updatePlatform,
            activatePlatform
        }}>
            {children}
        </PlatformContext.Provider>
    );
};