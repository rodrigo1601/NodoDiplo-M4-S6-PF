import { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import PlatformForm from "../../../forms/platform/PlatformForm";
import { usePlatforms } from "../../../../hooks/platforms/usePlatforms";
import { handleAddPlatform, handleEditPlatform, handleActivatePlatform } from "../../../../utils/admin/handlePlatform";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GenericTable from "../common/GenericTable";
import AdminPageSkeleton from "../../../common/AdminPageSkeleton";
import LoadingOverlay from "../../../common/LoadingOverlay";

const PlatformsPage = () => {
    const { isDark } = useTheme();
    const { allPlatforms, loading, actionLoading, actionMessage, createPlatform, updatePlatform, activatePlatform } = usePlatforms();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const activePlatforms   = allPlatforms.filter(p => p.isActive);
    const inactivePlatforms = allPlatforms.filter(p => !p.isActive);

    const emptyClass = `flex items-center justify-center py-12 border rounded-xl ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-white border-gray-200"}`;
    const emptyText  = isDark ? "text-gray-600" : "text-gray-400";

    if (loading) return <AdminPageSkeleton /> 

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0a0c10] text-white" : "bg-gray-100 text-gray-900"}`}>
            <AdminPageHeader title="Plataformas" subtitle="Trabajá con las plataformas en las que los juegos corren." buttonText="+ Nueva plataforma" onClick={() => setCreatingStatus(true)} />
            <div className="p-6 space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Activas</span>
                        <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                            <span className="text-cyan-500 font-semibold">{activePlatforms.length}</span> plataformas
                        </span>
                    </div>
                    {activePlatforms.length === 0
                        ? <div className={emptyClass}><p className={`text-sm ${emptyText}`}>Sin plataformas activas.</p></div>
                        : <GenericTable data={activePlatforms} setSelected={setSelectedPlatform} seteditingStatus={setEditingStatus} handleActivate={handleActivatePlatform} activate={activatePlatform} />
                    }
                </section>
                {inactivePlatforms.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-gray-500">Inactivas</span>
                            <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                <span className="text-gray-500 font-semibold">{inactivePlatforms.length}</span> plataformas
                            </span>
                        </div>
                        <GenericTable data={inactivePlatforms} setSelected={setSelectedPlatform} seteditingStatus={setEditingStatus} handleActivate={handleActivatePlatform} activate={activatePlatform} />
                    </section>
                )}
            </div>
            <AdminModal open={creatingStatus} title="Nueva plataforma" onClose={() => setCreatingStatus(false)}>
                <PlatformForm label="Crear plataforma" onSubmit={(data) => handleAddPlatform(data, createPlatform, () => setCreatingStatus(false))} />
            </AdminModal>
            <AdminModal open={editingStatus} title="Editar plataforma" onClose={() => setEditingStatus(false)}>
                <PlatformForm label="Guardar cambios" platform={selectedPlatform} onSubmit={(data) => handleEditPlatform(selectedPlatform._id, data, updatePlatform, () => setEditingStatus(false))} />
            </AdminModal>
            <LoadingOverlay
                open={actionLoading}
                message={actionMessage}
            />
        </div>
    );
};

export default PlatformsPage;