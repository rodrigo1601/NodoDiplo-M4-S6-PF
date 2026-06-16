import { useEffect, useState } from "react";

import { DeveloperContext } from "./DeveloperContext";

import { getDevelopersRequest, uploadDeveloperRequest, updateDeveloperRequest, activateDeveloperRequest } from "../../services/developersService";

export const DeveloperProvider = ({ children }) => {

    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState("");

    useEffect(() => {

        const fetchDevelopers = async () => {
            try {
                const res = await getDevelopersRequest();

                setDevelopers(res.data.desarrolladores);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDevelopers();

    }, []);

    const activeDevelopers = developers.filter(d => d.isActive);
    const allDevelopers = developers;

    const createDeveloper = async (data) => {
            try {

                setActionLoading(true);
                setActionMessage("Creando desarrollador...");
                const formData = new FormData();

                formData.append("nombre", data.nombre);
                formData.append("slug", data.slug);
                formData.append("logo", data.logo[0]);

                const res = await uploadDeveloperRequest(formData);
    
                const { desarrollador } = res.data;

                setDevelopers(prev => [...prev, desarrollador]);

                return { success: true };
            } catch (error) {
                console.error("Error en registro:", error);
                return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
            } finally {
                setActionLoading(false);
            }
    };

    const updateDeveloper = async (id, data) => {
            try {

                setActionLoading(true);
                setActionMessage("Actualizando desarrollador...");
                const formData = new FormData();

                formData.append("nombre", data.nombre);
                formData.append("slug", data.slug);
                formData.append("isActive", data.isActive);

                if (data.logo?.[0]){
                    formData.append("logo", data.logo[0]);
                }
                
                const res = await updateDeveloperRequest(id, formData);
    
                const { desarrollador } = res.data;

                setDevelopers(prev =>
                    prev.map(dev =>
                        dev._id === desarrollador._id
                            ? desarrollador
                            : dev
                    )
                );


                return { success: true };
            } catch (error) {
                console.error("Error en registro:", error);
                return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
            } finally{
                setActionLoading(false);
            }
    };

    const activateDeveloper = async (id, status) => {
                    try {
        
                        setActionMessage(status ? "Activando desarrollador..." : "Desactivando desarrollador...");
                        setActionLoading(true);
                        const formData = new FormData();
        
                        formData.append("isActive", status);
                        
                        const res = await activateDeveloperRequest(id, status);
            
                        const { desarrollador } = res.data;
        
                        setDevelopers(prev =>
                            prev.map(developer =>
                                developer._id === desarrollador._id
                                    ? desarrollador
                                    : developer
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

    return (
        <DeveloperContext.Provider value={{
            developers: activeDevelopers,
            allDevelopers,
            loading,
            actionLoading,
            actionMessage,
            createDeveloper,
            updateDeveloper,
            activateDeveloper
        }}>
            {children}
        </DeveloperContext.Provider>
    );
};