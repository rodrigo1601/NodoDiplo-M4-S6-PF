import { useTheme } from "../../hooks/useTheme";

const getPageRange = (current, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
};

const Pagination = ({ page, totalPages, totalItems, pageSize, goTo, next, prev, hasNext, hasPrev }) => {
    const { isDark } = useTheme();

    if (totalPages <= 1) return null;

    const pages = getPageRange(page, totalPages);
    const from = (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, totalItems);

    const btnBase = `text-[11px] px-2.5 py-1.5 rounded-md border transition-all cursor-pointer
        disabled:opacity-30 disabled:cursor-not-allowed`;

    const btnIdle = isDark
        ? "border-white/[0.07] text-gray-500 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10 disabled:hover:border-white/[0.07] disabled:hover:text-gray-500 disabled:hover:bg-transparent"
        : "border-gray-200 text-gray-400 hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 disabled:hover:bg-transparent";

    const pageBtn = (active) => isDark
        ? active
            ? "border-violet-500/40 text-violet-400 bg-violet-500/10"
            : "border-white/[0.07] text-gray-500 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10"
        : active
            ? "border-violet-400 text-violet-600 bg-violet-50"
            : "border-gray-200 text-gray-500 hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50";

    return (
        <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
            <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                Mostrando{" "}
                <span className={`font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>{from}–{to}</span>
                {" "}de{" "}
                <span className="text-violet-500 font-semibold">{totalItems}</span>
            </span>

            <div className="flex items-center gap-1">
                <button onClick={prev} disabled={!hasPrev} className={`${btnBase} ${btnIdle}`}>← Anterior</button>

                {pages.map((p, i) =>
                    p === "..." ? (
                        <span key={`e-${i}`} className={`text-[11px] px-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => goTo(p)}
                            className={`text-[11px] w-7 h-7 rounded-md border transition-all cursor-pointer ${pageBtn(p === page)}`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button onClick={next} disabled={!hasNext} className={`${btnBase} ${btnIdle}`}>Siguiente →</button>
            </div>
        </div>
    );
};

export default Pagination;