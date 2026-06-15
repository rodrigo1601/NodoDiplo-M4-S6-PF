import { useTheme } from "../../hooks/useTheme";

const LoadingSpinner = () => {
    const { isDark } = useTheme();
    return (
        <div className="flex justify-center items-center p-8">
            <div className={`w-8 h-8 border-[3px] border-t-transparent rounded-full animate-spin
                ${isDark ? "border-violet-500/40 border-t-transparent" : "border-violet-400/40"}`}
                style={{ borderTopColor: "transparent" }}
            />
        </div>
    );
};

export default LoadingSpinner;