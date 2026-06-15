export const getInputClass = (isDark) => `
    w-full border rounded-lg
    text-[13px] placeholder:text-gray-500
    px-3 py-2.5 outline-none transition-all font-sans
    focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500/50
    ${isDark
        ? "bg-[#0f1117] border-white/[0.08] text-gray-100"
        : "bg-white border-gray-200 text-gray-900 shadow-sm"
    }
`;
export const getLabelClass = (isDark) =>
    `block text-[12px] font-semibold mb-1.5 tracking-wide ${isDark ? "text-gray-400" : "text-gray-600"}`;
export const errorClass = "text-[11px] text-red-400 mt-1.5";
export const fieldClass = "flex flex-col";