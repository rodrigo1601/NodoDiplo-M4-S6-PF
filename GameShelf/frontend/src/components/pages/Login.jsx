import LoginForm from "../forms/user/loginForm";
import { useAuth } from "../../hooks/users/useAuth";
import { handleLogin } from "../../utils/handleUser";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const Login = () => {
    useDocumentTitle("Login | GameShelf");
    const navigate = useNavigate();
    const { login } = useAuth();
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 transition-colors ${isDark ? "bg-[#0f1117]" : "bg-gray-50"}`}>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                        GameShelf
                    </span>
                    <h1 className={`text-xl font-bold mt-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Bienvenido de vuelta
                    </h1>
                    <p className={`text-sm mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        Ingresa a tu cuenta
                    </p>
                </div>
                <div className={`border rounded-2xl p-7 ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200 shadow-sm"}`}>
                    <LoginForm onSubmit={(data) => handleLogin(data, login, navigate)} />
                    <p className={`text-center text-xs mt-5 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        No tenes cuenta?{" "}
                        <Link to="/register" className="text-violet-400 hover:text-violet-300 transition-colors">Creá una</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;