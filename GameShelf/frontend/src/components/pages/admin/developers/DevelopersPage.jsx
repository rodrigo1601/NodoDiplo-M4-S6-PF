import { useState } from "react";
import DeveloperForm from "../../../forms/developer/DeveloperForm";
import { useDevelopers } from "../../../../hooks/developers/useDevelopers";
import { handleAddDeveloper, handleEditDeveloper, handleActivateDeveloper } from "../../../../utils/admin/handleDeveloper";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GenericTable from "../common/GenericTable";

const DevelopersPage = () => {
    const { allDevelopers, createDeveloper, updateDeveloper, activateDeveloper } = useDevelopers();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);

    const activeDevelopers = allDevelopers.filter(d => d.isActive);
    const inactiveDevelopers = allDevelopers.filter(d => !d.isActive);

    return (
        <div className="bg-[#0a0c10] min-h-screen text-white font-sans">
            <AdminPageHeader
                title="Desarrolladores"
                subtitle="Trabaja con los estudios y equipos detras de los juegos."
                buttonText="+ Nuevo desarrollador"
                onClick={() => setCreatingStatus(true)}
            />

            <div className="p-6 space-y-8">
                {/* Active */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-white">Activos</span>
                        <span className="text-xs text-gray-600">
                            <span className="text-cyan-500 font-semibold">{activeDevelopers.length}</span> desarrolladores
                        </span>
                    </div>
                    {activeDevelopers.length === 0 ? (
                        <EmptyState message="Sin desarrolladores activos." />
                    ) : (
                        <GenericTable
                            data={activeDevelopers}
                            setSelected={setSelectedDeveloper}
                            seteditingStatus={setEditingStatus}
                            handleActivate={handleActivateDeveloper}
                            activate={activateDeveloper}
                        />
                    )}
                </section>

                {/* Inactive */}
                {inactiveDevelopers.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-gray-500">Inactivos</span>
                            <span className="text-xs text-gray-600">
                                <span className="text-gray-500 font-semibold">{inactiveDevelopers.length}</span> desarrolladores
                            </span>
                        </div>
                        <GenericTable
                            data={inactiveDevelopers}
                            setSelected={setSelectedDeveloper}
                            seteditingStatus={setEditingStatus}
                            handleActivate={handleActivateDeveloper}
                            activate={activateDeveloper}
                        />
                    </section>
                )}
            </div>

            <AdminModal open={creatingStatus} title="Nuevo desarrollador" onClose={() => setCreatingStatus(false)}>
                <DeveloperForm label="Crear desarrollador" onSubmit={(data) => handleAddDeveloper(data, createDeveloper)} />
            </AdminModal>

            <AdminModal open={editingStatus} title="Editar desarrollador" onClose={() => setEditingStatus(false)}>
                <DeveloperForm
                    label="Guardar cambios"
                    developer={selectedDeveloper}
                    onSubmit={(data) => handleEditDeveloper(selectedDeveloper._id, data, updateDeveloper)}
                />
            </AdminModal>
        </div>
    );
};

const EmptyState = ({ message }) => (
    <div className="flex items-center justify-center py-12 bg-white/2 border border-white/6 rounded-xl">
        <p className="text-gray-600 text-sm">{message}</p>
    </div>
);

export default DevelopersPage;