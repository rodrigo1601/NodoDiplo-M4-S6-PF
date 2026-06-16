const AdminPageSkeleton = () => {
    const rows = (n) =>
        Array.from({ length: n }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 h-12 border-b border-white/4 last:border-b-0">
                <div className="w-7 h-7 rounded-full bg-white/6 animate-pulse shrink-0" />
                <div
                    className="h-3 bg-white/6 animate-pulse rounded"
                    style={{ width: `${[38, 52, 30][i % 3]}%` }}
                />
                <div className="flex-1" />
                <div className="h-3 w-14 bg-white/6 animate-pulse rounded" />
            </div>
        ));

    return (
        <div className="min-h-screen bg-[#0a0c10] p-6 space-y-8 font-sans">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <div className="h-6 w-40 bg-white/6 animate-pulse rounded-lg" />
                    <div className="h-3 w-56 bg-white/4 animate-pulse rounded" />
                </div>
                <div className="h-8 w-32 bg-white/6 animate-pulse rounded-lg" />
            </div>

            {/* Activos */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-3 w-12 bg-white/6 animate-pulse rounded" />
                    <div className="h-3 w-16 bg-white/4 animate-pulse rounded" />
                </div>
                <div className="rounded-xl border border-white/6 bg-white/2 overflow-hidden">
                    {rows(3)}
                </div>
            </section>

            {/* Inactivos */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-3 w-16 bg-white/5 animate-pulse rounded" />
                    <div className="h-3 w-14 bg-white/4 animate-pulse rounded" />
                </div>
                <div className="rounded-xl border border-white/6 bg-white/2 overflow-hidden">
                    {rows(1)}
                </div>
            </section>
        </div>
    );
};

export default AdminPageSkeleton;