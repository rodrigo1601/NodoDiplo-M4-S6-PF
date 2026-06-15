import { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import GenreForm from "../../../forms/genre/GenreForm";
import { useGenres } from "../../../../hooks/genres/useGenres";
import { handleAddGenre, handleEditGenre, handleActivateGenre } from "../../../../utils/admin/handleGenre";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GenericTable from "../common/GenericTable";

const GenresPage = () => {
    const { isDark } = useTheme();
    const { allGenres, createGenre, updateGenre, activateGenre } = useGenres();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const activeGenres   = allGenres.filter(g => g.isActive);
    const inactiveGenres = allGenres.filter(g => !g.isActive);

    const emptyClass = `flex items-center justify-center py-12 border rounded-xl ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-white border-gray-200"}`;
    const emptyText  = isDark ? "text-gray-600" : "text-gray-400";

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0a0c10] text-white" : "bg-gray-100 text-gray-900"}`}>
            <AdminPageHeader title="Géneros" subtitle="Trabajá con los tags de géneros aplicados en los juegos." buttonText="+ Nuevo género" onClick={() => setCreatingStatus(true)} />
            <div className="p-6 space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Activos</span>
                        <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                            <span className="text-cyan-500 font-semibold">{activeGenres.length}</span> géneros
                        </span>
                    </div>
                    {activeGenres.length === 0
                        ? <div className={emptyClass}><p className={`text-sm ${emptyText}`}>Sin géneros activos.</p></div>
                        : <GenericTable data={activeGenres} setSelected={setSelectedGenre} seteditingStatus={setEditingStatus} handleActivate={handleActivateGenre} activate={activateGenre} />
                    }
                </section>
                {inactiveGenres.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-gray-500">Inactivos</span>
                            <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                <span className="text-gray-500 font-semibold">{inactiveGenres.length}</span> géneros
                            </span>
                        </div>
                        <GenericTable data={inactiveGenres} setSelected={setSelectedGenre} seteditingStatus={setEditingStatus} handleActivate={handleActivateGenre} activate={activateGenre} />
                    </section>
                )}
            </div>
            <AdminModal open={creatingStatus} title="Nuevo género" onClose={() => setCreatingStatus(false)}>
                <GenreForm label="Crear género" onSubmit={(data) => handleAddGenre(data, createGenre, () => setCreatingStatus(false))} />
            </AdminModal>
            <AdminModal open={editingStatus} title="Editar género" onClose={() => setEditingStatus(false)}>
                <GenreForm label="Guardar cambios" genre={selectedGenre} onSubmit={(data) => handleEditGenre(selectedGenre._id, data, updateGenre, () => setEditingStatus(false))} />
            </AdminModal>
        </div>
    );
};

export default GenresPage;