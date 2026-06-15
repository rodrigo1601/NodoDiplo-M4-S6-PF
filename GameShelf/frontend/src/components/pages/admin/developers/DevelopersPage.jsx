import { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import DeveloperForm from "../../../forms/developer/DeveloperForm";
import { useDevelopers } from "../../../../hooks/developers/useDevelopers";
import { handleAddDeveloper, handleEditDeveloper, handleActivateDeveloper } from "../../../../utils/admin/handleDeveloper";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GenericTable from "../common/GenericTable";

const EmptyState = ({ message, isDark }) => (
    <div className={`flex items-center justify-center py-12 border rounded-xl
        ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-white border-gray-200"}`}>
        <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>{message}</p>
    </div>
);

const DevelopersPage = () => {
    const { isDark } = useTheme();
    const { allDevelopers, createDeveloper, updateDeveloper, activateDeveloper } = useDevelopers();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);

    const activeDevelopers   = allDevelopers.filter(d => d.isActive);
    const inactiveDevelopers = allDevelopers.filter(d => !d.isActive);

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0a0c10] text-white" : "bg-gray-100 text-gray-900"}`}>
            <AdminPageHeader title="Desarrolladores" subtitle="Trabajá con los estudios y equipos detrás de los juegos." buttonText="+ Nuevo desarrollador" onClick={() => setCreatingStatus(true)} />
            <div className="p-6 space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Activos</span>
                        <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                            <span className="text-cyan-500 font-semibold">{activeDevelopers.length}</span> desarrolladores
                        </span>
                    </div>
                    {activeDevelopers.length === 0
                        ? <EmptyState message="Sin desarrolladores activos." isDark={isDark} />
                        : <GenericTable data={activeDevelopers} setSelected={setSelectedDeveloper} seteditingStatus={setEditingStatus} handleActivate={handleActivateDeveloper} activate={activateDeveloper} />
                    }
                </section>
                {inactiveDevelopers.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-gray-500">Inactivos</span>
                            <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                <span className="text-gray-500 font-semibold">{inactiveDevelopers.length}</span> desarrolladores
                            </span>
                        </div>
                        <GenericTable data={inactiveDevelopers} setSelected={setSelectedDeveloper} seteditingStatus={setEditingStatus} handleActivate={handleActivateDeveloper} activate={activateDeveloper} />
                    </section>
                )}
            </div>
            <AdminModal open={creatingStatus} title="Nuevo desarrollador" onClose={() => setCreatingStatus(false)}>
                <DeveloperForm label="Crear desarrollador" onSubmit={(data) => handleAddDeveloper(data, createDeveloper, () => setCreatingStatus(false))} />
            </AdminModal>
            <AdminModal open={editingStatus} title="Editar desarrollador" onClose={() => setEditingStatus(false)}>
                <DeveloperForm label="Guardar cambios" developer={selectedDeveloper} onSubmit={(data) => handleEditDeveloper(selectedDeveloper._id, data, updateDeveloper, () => setEditingStatus(false))} />
            </AdminModal>
        </div>
    );
};

export default DevelopersPage;