import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import Sidebar from "../layout/Sidebar";
import CardItem from "../common/CardItem";
import { useDevelopers } from "../../hooks/developers/useDevelopers";
import { useTheme } from "../../hooks/useTheme";

const Developers = () => {
    useDocumentTitle("Desarrolladores | GameShelf");
    const { developers, loading } = useDevelopers();
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className={`border-b px-6 py-6 ${isDark ? "border-white/4" : "border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-500">Explorar</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight">Desarrolladores</h1>
                <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    Explorá juegos por los estudios y equipos que los crearon.
                </p>
            </div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-5">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={`rounded-xl overflow-hidden animate-pulse ${isDark ? "bg-[#1a1d27]" : "bg-gray-200"}`}>
                                    <div className={`h-18 ${isDark ? "bg-white/4" : "bg-gray-300"}`} />
                                    <div className="p-3 space-y-2">
                                        <div className={`h-3 rounded w-3/4 ${isDark ? "bg-white/4" : "bg-gray-300"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center mb-4">
                                <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                    <span className="text-violet-500 font-semibold">{developers.length}</span> desarrolladores
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                {developers.map(developer => (
                                    <CardItem key={developer._id} item={developer} type="developers" developersColorLogo={true} />
                                ))}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Developers;