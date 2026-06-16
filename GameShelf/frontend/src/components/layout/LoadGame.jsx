import { useEffect } from "react";

const LoadGame = ({ launchingGame, setLaunchingGame }) => {

    useEffect(() => {
        if (!launchingGame) return;

        const timer = setTimeout(() => {
            setLaunchingGame(null);
        }, 3500);

        return () => clearTimeout(timer);
    }, [launchingGame, setLaunchingGame]);

    if (!launchingGame) return null;

    return (
        <div className="fixed inset-0 z-9999 bg-[#050608] flex items-center justify-center overflow-hidden">

            <img
                src={launchingGame.gameId.portada}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-2xl scale-110"
            />
            
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6">

                <div className="relative mb-8">
                    <img
                        src={launchingGame.gameId.portada}
                        alt={launchingGame.gameId.nombre}
                        className="w-105 rounded-2xl shadow-2xl border border-white/10"
                    />

                    <div className="absolute inset-0 rounded-2xl ring-1 ring-violet-500/20" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.35em] text-violet-400 font-bold mb-2">
                    GameShelf Launcher
                </span>

                <h2 className="text-3xl font-extrabold text-white text-center">
                    {launchingGame.gameId.nombre}
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                    Preparando experiencia de juego...
                </p>

                <div className="w-full mt-8">
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-linear-to-r from-violet-600 to-cyan-400 rounded-full animate-[load_3.2s_linear_forwards]"
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Inicializando</span>
                        <span>Cargando recursos</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-8 text-gray-400">
                    <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">
                        Iniciando juego...
                    </span>
                </div>

            </div>
        </div>
    );
};

export default LoadGame;