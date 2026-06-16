const LoadingOverlay = ({ open, message }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-9999 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#161922] border border-white/10 rounded-2xl p-8 w-64 text-center shadow-xl">

                {/* Spinner */}
                <div className="relative w-10 h-10 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full border-[3px] border-violet-500/20 border-t-violet-500 animate-spin" />
                    <div
                        className="absolute inset-2.5 rounded-full border-2 border-cyan-500/20 border-t-cyan-400/60 animate-spin"
                        style={{ animationDirection: "reverse", animationDuration: "0.7s" }}
                    />
                </div>

                {/* Mensaje */}
                <p className="text-sm text-white/70 leading-relaxed">
                    {message}
                </p>

                {/* Dots */}
                <div className="flex gap-1.5 justify-center mt-4">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-violet-500/50 animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;