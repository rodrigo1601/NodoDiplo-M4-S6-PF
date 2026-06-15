import UserForm from "../forms/user/userForm";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth } from "../../hooks/users/useAuth";
import { handleRegister } from "../../utils/handleUser";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const Register = () => {
    useDocumentTitle("Register | GameShelf");
    const { register } = useAuth();
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors ${isDark ? "bg-[#0f1117]" : "bg-gray-50"}`}>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                        GameShelf
                    </span>
                    <h1 className={`text-xl font-bold mt-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Creá tu cuenta
                    </h1>
                    <p className={`text-sm mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        Unite y empezá a trackear tu librería
                    </p>
                </div>
                <div className={`border rounded-2xl p-7 ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200 shadow-sm"}`}>
                    <UserForm onSubmit={(data) => handleRegister(data, register)} label="Crear cuenta" mode="register" />
                    <p className={`text-center text-xs mt-5 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        Ya tenés cuenta?{" "}
                        <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors">Iniciá sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;