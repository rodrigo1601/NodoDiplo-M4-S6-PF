import { useState } from "react";
import PlatformForm from "../../../forms/platform/PlatformForm";
import { usePlatforms } from "../../../../hooks/platforms/usePlatforms";
import { handleAddPlatform, handleEditPlatform, handleActivatePlatform } from "../../../../utils/admin/handlePlatform";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GenericTable from "../common/GenericTable";

const PlatformsPage = () => {
    const { allPlatforms, createPlatform, updatePlatform, activatePlatform } = usePlatforms();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const activePlatforms   = allPlatforms.filter(p => p.isActive);
    const inactivePlatforms = allPlatforms.filter(p => !p.isActive);

    return (
        <div className="bg-[#0a0c10] min-h-screen text-white font-sans">
            <AdminPageHeader
                title="Plataformas"
                subtitle="Trabaja con las plataformas en las que los juegos corren."
                buttonText="+ Nueva plataforma"
                onClick={() => setCreatingStatus(true)}
            />

            <div className="p-6 space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-white">Activas</span>
                        <span className="text-xs text-gray-600">
                            <span className="text-cyan-500 font-semibold">{activePlatforms.length}</span> plataformas
                        </span>
                    </div>
                    {activePlatforms.length === 0 ? (
                        <div className="flex items-center justify-center py-12 bg-white/2 border border-white/6 rounded-xl">
                            <p className="text-gray-600 text-sm">Sin plataformas activas.</p>
                        </div>
                    ) : (
                        <GenericTable
                            data={activePlatforms}
                            setSelected={setSelectedPlatform}
                            seteditingStatus={setEditingStatus}
                            handleActivate={handleActivatePlatform}
                            activate={activatePlatform}
                        />
                    )}
                </section>

                {inactivePlatforms.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-gray-500">Inactivas</span>
                            <span className="text-xs text-gray-600">
                                <span className="text-gray-500 font-semibold">{inactivePlatforms.length}</span> plataformas
                            </span>
                        </div>
                        <GenericTable
                            data={inactivePlatforms}
                            setSelected={setSelectedPlatform}
                            seteditingStatus={setEditingStatus}
                            handleActivate={handleActivatePlatform}
                            activate={activatePlatform}
                        />
                    </section>
                )}
            </div>

            <AdminModal open={creatingStatus} title="Nueva plataforma" onClose={() => setCreatingStatus(false)}>
                <PlatformForm label="Crear plataforma" onSubmit={(data) => handleAddPlatform(data, createPlatform)} />
            </AdminModal>

            <AdminModal open={editingStatus} title="Editar plataforma" onClose={() => setEditingStatus(false)}>
                <PlatformForm
                    label="Guardar cambios"
                    platform={selectedPlatform}
                    onSubmit={(data) => handleEditPlatform(selectedPlatform._id, data, updatePlatform)}
                />
            </AdminModal>
        </div>
    );
};

export default PlatformsPage;