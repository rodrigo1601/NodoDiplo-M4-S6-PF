import { useState, useMemo } from "react";

import { AuthContext } from "./AuthContext";

import { loginRequest, registerRequest, updateUserRequest  } from "../../services/userService";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loadingAuth, setLoadingAuth] = useState(false);

    const isAdmin = user?.role === 1;

    const isAdult = useMemo(() => {
        if (!user?.birthDate) return false;

        const birthDate = new Date(user.birthDate);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age >= 18;
    }, [user]);

    const login = async (data) => {
        try {

            setLoadingAuth(true);

            const res = await loginRequest(data);

            const {usuario, token} = res.data;
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(usuario));

            setUser(usuario);

            return { success: true, user: usuario.username };
        } catch (error) {
            console.error("Error en login:", error);
            return { success: false, message: error.response?.data?.mensaje || "Credenciales incorrectas" };
        }finally{
            setLoadingAuth(false);
        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const register = async (userData) => {
        try {

            const formData = new FormData();
            
            formData.append("username", userData.username);
            formData.append("bio", userData.bio);
            formData.append("birthDate", userData.birthDate);
            formData.append("email", userData.email);
            formData.append("password", userData.password);
            formData.append("isActive", true);

            if (userData.avatar?.[0]){
                formData.append("avatar", userData.avatar[0])
            }

            const res = await registerRequest(formData);

            const { usuario, token } = res.data;
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(usuario));
            
            setUser(usuario);
            return { success: true };
        } catch (error) {
            console.error("Error en registro:", error);
            return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
        }
    };

    const updateUser = async (id, userData) => {
        try {

            setLoadingAuth(true);

            const formData = new FormData();

            formData.append("username", userData.username);
            formData.append("bio", userData.bio);
            formData.append("birthDate", userData.birthDate);
            formData.append("email", userData.email);
            formData.append("password", userData.password);
            formData.append("newPassword", userData.newPassword);

            if (userData.avatar?.[0]){
                formData.append("avatar", userData.avatar[0])
            }

            const res = await updateUserRequest(id, formData);
            
            const {usuario} = res.data;
            
            localStorage.setItem("user", JSON.stringify(usuario));
            setUser(usuario);
            return { success: true };
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return { success: false, message: error.response?.data?.mensaje || "Error al actualizar usuario" };
        }finally{
            setLoadingAuth(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAdmin,
            loadingAuth,
            isAdult,
            login,
            logout,
            register,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};