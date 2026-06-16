import { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import UserForm from "../../../forms/user/userForm";
import { useUsers } from "../../../../hooks/users/useUsers";
import { handleAddUser, handleEditUser, handleActivateUser } from "../../../../utils/admin/handleUser";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import UsersTable from "./UsersTable";
import AdminPageSkeleton from "../../../common/AdminPageSkeleton";
import LoadingOverlay from "../../../common/LoadingOverlay";

const UsersPage = () => {
    const { isDark } = useTheme();
    const { allUsers, loading, actionLoading, actionMessage, createUser, updateUser, activateUser } = useUsers();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const activeUsers   = allUsers.filter(u => u.isActive);
    const inactiveUsers = allUsers.filter(u => !u.isActive);

    const emptyClass = `flex items-center justify-center py-12 border rounded-xl ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-white border-gray-200"}`;
    const emptyText  = isDark ? "text-gray-600" : "text-gray-400";

    if (loading) return <AdminPageSkeleton /> 

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0a0c10] text-white" : "bg-gray-100 text-gray-900"}`}>
            <AdminPageHeader title="Usuarios" subtitle="Trabajá con las cuentas de la plataforma." buttonText="+ Nuevo usuario" onClick={() => setCreatingStatus(true)} />
            <div className="p-6 space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Activos</span>
                        <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                            <span className="text-cyan-500 font-semibold">{activeUsers.length}</span> usuarios
                        </span>
                    </div>
                    {activeUsers.length === 0
                        ? <div className={emptyClass}><p className={`text-sm ${emptyText}`}>Sin usuarios activos.</p></div>
                        : <UsersTable data={activeUsers} setSelected={setSelectedUser} seteditingStatus={setEditingStatus} handleActivate={handleActivateUser} activate={activateUser} />
                    }
                </section>
                {inactiveUsers.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-gray-500">Inactivos</span>
                            <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                <span className="text-gray-500 font-semibold">{inactiveUsers.length}</span> usuarios
                            </span>
                        </div>
                        <UsersTable data={inactiveUsers} setSelected={setSelectedUser} seteditingStatus={setEditingStatus} handleActivate={handleActivateUser} activate={activateUser} />
                    </section>
                )}
            </div>
            <AdminModal open={creatingStatus} title="Nuevo usuario" onClose={() => setCreatingStatus(false)}>
                <UserForm label="Crear usuario" onSubmit={(data) => handleAddUser(data, createUser, () => setCreatingStatus(false))} mode="adminCreate" />
            </AdminModal>
            <AdminModal open={editingStatus} title="Editar usuario" onClose={() => setEditingStatus(false)}>
                <UserForm label="Guardar cambios" user={selectedUser} onSubmit={(data) => handleEditUser(selectedUser._id, data, updateUser, () => setEditingStatus(false))} mode="adminEdit" />
            </AdminModal>
            <LoadingOverlay
                open={actionLoading}
                message={actionMessage}
            />
        </div>
    );
};

export default UsersPage;