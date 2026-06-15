const getPageRange = (current, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
};

const AdminPagination = ({ page, totalPages, totalItems, pageSize, goTo, next, prev, hasNext, hasPrev }) => {
    if (totalPages <= 1) return null;

    const pages = getPageRange(page, totalPages);
    const from = (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, totalItems);

    return (
        <div className="flex items-center justify-between mt-4 px-1 flex-wrap gap-3">
            <span className="text-xs text-gray-600">
                Showing <span className="text-gray-400 font-semibold">{from}–{to}</span> of{" "}
                <span className="text-cyan-500 font-semibold">{totalItems}</span>
            </span>

            <div className="flex items-center gap-1">
                <button
                    onClick={prev}
                    disabled={!hasPrev}
                    className="text-[11px] px-2.5 py-1.5 rounded-md border border-white/[0.07] text-gray-500
                               hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10
                               disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/[0.07]
                               disabled:hover:text-gray-500 disabled:hover:bg-transparent transition-all"
                >
                    ← Prev
                </button>

                {pages.map((p, i) =>
                    p === "..." ? (
                        <span key={`ellipsis-${i}`} className="text-[11px] text-gray-600 px-1">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => goTo(p)}
                            className={`text-[11px] w-7 h-7 rounded-md border transition-all
                                ${p === page
                                    ? "border-cyan-500/40 text-cyan-400 bg-cyan-500/10"
                                    : "border-white/[0.07] text-gray-500 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10"
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    onClick={next}
                    disabled={!hasNext}
                    className="text-[11px] px-2.5 py-1.5 rounded-md border border-white/[0.07] text-gray-500
                               hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10
                               disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/[0.07]
                               disabled:hover:text-gray-500 disabled:hover:bg-transparent transition-all"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default AdminPagination;