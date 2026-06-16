import { useTheme } from "../../hooks/useTheme";

const LoadingSpinner = ({ size = "md" }) => {
    const { isDark } = useTheme();

    const sizes = {
        sm: { outer: "w-6 h-6", border: "border-2", inner: "inset-[6px]" },
        md: { outer: "w-10 h-10", border: "border-[3px]", inner: "inset-[9px]" },
        lg: { outer: "w-14 h-14", border: "border-[3px]", inner: "inset-[12px]" },
    };

    const s = sizes[size] ?? sizes.md;

    return (
        <div className="flex justify-center items-center p-8">
            <div className={`relative ${s.outer}`}>
                {/* Anillo exterior — violet */}
                <div
                    className={`absolute inset-0 rounded-full ${s.border} animate-spin
                        ${isDark
                            ? "border-violet-500/20 border-t-violet-500"
                            : "border-violet-400/30 border-t-violet-500"
                        }`}
                />
                {/* Anillo interior — cyan, sentido contrario */}
                <div
                    className={`absolute ${s.inner} rounded-full border-2 animate-spin
                        ${isDark
                            ? "border-cyan-500/20 border-t-cyan-400/70"
                            : "border-cyan-400/30 border-t-cyan-500/80"
                        }`}
                    style={{ animationDirection: "reverse", animationDuration: "0.75s" }}
                />
            </div>
        </div>
    );
};

export default LoadingSpinner;