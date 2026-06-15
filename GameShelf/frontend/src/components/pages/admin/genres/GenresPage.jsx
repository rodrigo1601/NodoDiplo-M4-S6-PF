import { useState } from "react";
import GenreForm from "../../../forms/genre/GenreForm";
import { useGenres } from "../../../../hooks/genres/useGenres";
import { handleAddGenre, handleEditGenre, handleActivateGenre } from "../../../../utils/admin/handleGenre";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GenericTable from "../common/GenericTable";

const GenresPage = () => {
    const { allGenres, createGenre, updateGenre, activateGenre } = useGenres();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const activeGenres   = allGenres.filter(g => g.isActive);
    const inactiveGenres = allGenres.filter(g => !g.isActive);

    return (
        <div className="bg-[#0a0c10] min-h-screen text-white font-sans">
            <AdminPageHeader
                title="Generos"
                subtitle="Trabaja con los tags de generos aplicados en los juegos."
                buttonText="+ Nuevo genero"
                onClick={() => setCreatingStatus(true)}
            />

            <div className="p-6 space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-white">Activos</span>
                        <span className="text-xs text-gray-600">
                            <span className="text-cyan-500 font-semibold">{activeGenres.length}</span> generos
                        </span>
                    </div>
                    {activeGenres.length === 0 ? (
                        <div className="flex items-center justify-center py-12 bg-white/2 border border-white/6 rounded-xl">
                            <p className="text-gray-600 text-sm">Sin generos activos.</p>
                        </div>
                    ) : (
                        <GenericTable
                            data={activeGenres}
                            setSelected={setSelectedGenre}
                            seteditingStatus={setEditingStatus}
                            handleActivate={handleActivateGenre}
                            activate={activateGenre}
                        />
                    )}
                </section>

                {inactiveGenres.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-gray-500">Inactivos</span>
                            <span className="text-xs text-gray-600">
                                <span className="text-gray-500 font-semibold">{inactiveGenres.length}</span> generos
                            </span>
                        </div>
                        <GenericTable
                            data={inactiveGenres}
                            setSelected={setSelectedGenre}
                            seteditingStatus={setEditingStatus}
                            handleActivate={handleActivateGenre}
                            activate={activateGenre}
                        />
                    </section>
                )}
            </div>

            <AdminModal open={creatingStatus} title="Nuevo genero" onClose={() => setCreatingStatus(false)}>
                <GenreForm label="Crear genero" onSubmit={(data) => handleAddGenre(data, createGenre)} />
            </AdminModal>

            <AdminModal open={editingStatus} title="Editar genero" onClose={() => setEditingStatus(false)}>
                <GenreForm
                    label="Guardar cambios"
                    genre={selectedGenre}
                    onSubmit={(data) => handleEditGenre(selectedGenre._id, data, updateGenre)}
                />
            </AdminModal>
        </div>
    );
};

export default GenresPage;