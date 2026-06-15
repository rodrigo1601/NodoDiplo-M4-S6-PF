import toast from "react-hot-toast";

const baseStyle = {
    fontFamily: "sans-serif",
    fontSize: "13px",
    fontWeight: "500",
    borderRadius: "10px",
    padding: "10px 14px",
};

export const notifySuccess = (message) =>
    toast.success(message, {
        duration: 3000,
        style: {
            ...baseStyle,
            background: "#1a1d27",
            color: "#a78bfa",
            border: "1px solid rgba(139,92,246,0.25)",
        },
        iconTheme: { primary: "#7c3aed", secondary: "#1a1d27" },
    });

export const notifyError = (message) =>
    toast.error(message, {
        duration: 4000,
        style: {
            ...baseStyle,
            background: "#1a1d27",
            color: "#f87171",
            border: "1px solid rgba(239,68,68,0.25)",
        },
        iconTheme: { primary: "#ef4444", secondary: "#1a1d27" },
    });

export const notifyInfo = (message) =>
    toast(message, {
        duration: 3000,
        style: {
            ...baseStyle,
            background: "#1a1d27",
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.07)",
        },
    });

export const notifyLoading = (message) =>
    toast.loading(message, {
        style: {
            ...baseStyle,
            background: "#1a1d27",
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.07)",
        },
    });

export const dismissToast = (id) => toast.dismiss(id);