import { useEffect, useState } from "react";

import { UserContext } from "./UserContext";

import { getUsersRequest, createUserRequest, updateUserByAdminRequest, activateUserRequest  } from "../../services/userService";


export const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const res = await getUsersRequest();
                setUsers(res.data.usuarios);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    }, []);

    const activeUsers = users.filter(p => p.isActive);
    const allUsers = users;

    const createUser = async (data) => {
        try {
            
            const formData = new FormData();
            
            formData.append("username", data.username);
            formData.append("bio", data.bio);
            formData.append("birthDate", data.birthDate);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("isActive", true);

            if (data.avatar?.[0]){
                formData.append("avatar", data.avatar[0])
            }
            
            const res = await createUserRequest(formData);
                
            const { usuario } = res.data;

            setUsers(prev => [...prev, usuario]);
            
            return { success: true };
        } catch (error) {
            console.error("Error en registro:", error);
            return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
        }
    };

    const updateUser = async (id, userData) => {
            try {
    
                setLoading(true);
    
                const formData = new FormData();
                
                formData.append("username", userData.username);
                formData.append("bio", userData.bio);
                formData.append("birthDate", userData.birthDate);
                formData.append("email", userData.email);
                formData.append("isActive", userData.isActive);
                formData.append("password", userData.password);
                formData.append("newPassword", userData.newPassword);
    
                if (userData.avatar?.[0]){
                    formData.append("avatar", userData.avatar[0])
                }
    
                const res = await updateUserByAdminRequest(id, formData);
                
                const {usuario} = res.data;

                setUsers(prev => prev.map(user =>
                        user._id === usuario._id
                            ? usuario
                            : user
                        )
                    );

                return { success: true };
            } catch (error) {
                console.error("Error al actualizar usuario:", error);
                return { success: false, message: error.response?.data?.mensaje || "Error al actualizar usuario" };
            }finally{
                setLoading(false);
            }
    };

    const activateUser = async (id, status) => {
                        try {
            
                            const formData = new FormData();
            
                            formData.append("isActive", status);
                            
                            const res = await activateUserRequest(id, status);
                
                            const { usuario } = res.data;
            
                            setUsers(prev =>
                                prev.map(users =>
                                    users._id === usuario._id
                                        ? usuario
                                        : users
                                )
                            );
            
                            return { success: true };
                        } catch (error) {
                            console.error("Error en registro:", error);
                            return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                        }
    };

    return (
        <UserContext.Provider value={{
            users: activeUsers,
            allUsers,
            loading,
            createUser,
            updateUser,
            activateUser
        }}>
            {children}
        </UserContext.Provider>
    );
};