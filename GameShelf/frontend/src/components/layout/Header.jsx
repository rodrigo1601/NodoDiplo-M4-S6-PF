import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/users/useAuth";
import HeaderSearch from "./HeaderSearch";
import { handleLogout } from "../../utils/handleUser";
import ConfirmModal from "../common/ConfirmModal";
import { useTheme } from "../../hooks/useTheme";

const ThemeSwitch = ({ isDark, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="relative w-11 h-6 rounded-full border border-white/8 bg-[#1a1d27] transition-colors hover:border-violet-500/30 shrink-0"
        title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
        {/* Track */}
        <div className={`absolute inset-0.5 rounded-full transition-colors duration-300
            ${isDark ? "bg-violet-600/20" : "bg-amber-400/20"}`}
        />
        {/* Thumb */}
        <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300 flex items-center justify-center text-[11px]
            ${isDark
                ? "left-0.5 bg-[#252836]"
                : "left-[calc(100%-1.375rem)] bg-amber-400"
            }`}
        >
            
            <img src={isDark ? "/icons/sun.svg" : "/icons/moon.svg"} alt="" />
        </div>
    </button>
);

const Header = () => {
    const { isDark, toggleTheme } = useTheme();
    const { user, isAdmin, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const close = () => setOpen(false);

    return (
        <header className={`border-b font-sans transition-colors ${isDark ? "bg-[#0f1117] border-purple-900/25" : "bg-white border-gray-200"}`}>
            <div className="max-w-7xl mx-auto px-6 h-15 flex items-center justify-between gap-4">

                <Link to="/" className="text-[18px] font-extrabold tracking-tight bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent shrink-0">
                    GameShelf
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    <Link to="/" className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                        ${isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
                        Tienda
                    </Link>
                    {user && (
                        <Link to="/perfil/library" className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                            ${isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
                            Librería
                        </Link>
                    )}
                </nav>

                <HeaderSearch />

                <div className="flex items-center gap-3">
                    <ThemeSwitch isDark={isDark} toggleTheme={toggleTheme} />

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className={`flex items-center gap-2 border rounded-lg px-2 py-1.5 transition-colors
                                    ${isDark
                                        ? "bg-[#1a1d27] border-white/6 hover:bg-[#252836]"
                                        : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                                    }`}
                            >
                                <img
                                    src={user.avatar || "/avatardefault.svg"}
                                    alt={user.username}
                                    className="w-7 h-7 rounded-full object-cover ring-1 ring-violet-500/40"
                                />
                                <span className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                                    {user.username}
                                </span>
                                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>▾</span>
                            </button>

                            {open && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={close} />
                                    <div className={`absolute right-0 top-11 w-56 border rounded-xl shadow-2xl overflow-hidden z-50
                                        ${isDark
                                            ? "bg-[#1a1d27] border-white/[0.07]"
                                            : "bg-white border-gray-200"
                                        }`}>
                                        <div className={`px-4 py-3 border-b ${isDark ? "border-white/5" : "border-gray-100"}`}>
                                            <p className={`text-[13px] font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{user.username}</p>
                                            <p className={`text-[11px] truncate ${isDark ? "text-gray-600" : "text-gray-400"}`}>{user.email}</p>
                                        </div>

                                        {[
                                            { to: "/perfil",          label: "Perfil"          },
                                            { to: "/perfil/library",  label: "Librería"        },
                                            { to: "/perfil/wishlist", label: "Lista de deseos" },
                                        ].map(({ to, label }) => (
                                            <Link key={to} to={to} onClick={close}
                                                className={`block px-4 py-2.5 text-sm transition-colors
                                                    ${isDark
                                                        ? "text-gray-400 hover:bg-white/5 hover:text-white"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}>
                                                {label}
                                            </Link>
                                        ))}

                                        {isAdmin && (
                                            <Link to="/admin" onClick={close}
                                                className="block px-4 py-2.5 text-sm text-amber-500 hover:bg-amber-400/10 transition-colors">
                                                Panel de administración
                                            </Link>
                                        )}

                                        <div className={`border-t my-0.5 ${isDark ? "border-white/6" : "border-gray-100"}`} />

                                        <button
                                            onClick={() => setShowLogoutModal(true)}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer
                                                ${isDark
                                                    ? "text-gray-500 hover:bg-red-500/10 hover:text-red-400"
                                                    : "text-gray-400 hover:bg-red-50 hover:text-red-500"
                                                }`}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login"
                                className={`text-sm px-3 py-1.5 rounded-lg transition-colors
                                    ${isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
                                Iniciar sesión
                            </Link>
                            <Link to="/register"
                                className="text-sm px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold border border-violet-400/20 transition-colors">
                                Crear cuenta
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                open={showLogoutModal}
                title="Cerrar sesión"
                message="¿Seguro que deseas cerrar tu sesión?"
                confirmText="Cerrar sesión"
                cancelText="Cancelar"
                danger
                onCancel={() => setShowLogoutModal(false)}
                onConfirm={() => { setShowLogoutModal(false); handleLogout(logout, navigate); }}
            />
        </header>
    );
};

export default Header;