import { useState, useMemo } from "react";

export const usePagination = (items = [], pageSize = 12) => {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

    // Si el filtro cambia y la página actual queda fuera de rango, resetear
    const safePage = Math.min(page, totalPages);

    const paginated = useMemo(() => {
        const start = (safePage - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }, [items, safePage, pageSize]);

    const goTo = (p) => setPage(Math.max(1, Math.min(p, totalPages)));
    const next = () => goTo(safePage + 1);
    const prev = () => goTo(safePage - 1);
    const reset = () => setPage(1);

    return {
        paginated,
        page: safePage,
        totalPages,
        totalItems: items.length,
        pageSize,
        goTo,
        next,
        prev,
        reset,
        hasNext: safePage < totalPages,
        hasPrev: safePage > 1,
    };
};