import { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import UserForm from "../../../forms/user/userForm";
import { useUsers } from "../../../../hooks/users/useUsers";
import { handleAddUser, handleEditUser, handleActivateUser } from "../../../../utils/admin/handleUser";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import UsersTable from "./UsersTable";

const UsersPage = () => {
    const { isDark } = useTheme();
    const { allUsers, createUser, updateUser, activateUser } = useUsers();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0a0c10] text-white" : "bg-gray-100 text-gray-900"}`}>
            <AdminPageHeader title="Usuarios" subtitle="Trabajá con las cuentas de la plataforma." buttonText="+ Nuevo usuario" onClick={() => setCreatingStatus(true)} />
            <div className="p-6">
                {allUsers.length === 0 ? (
                    <div className={`flex flex-col items-center justify-center py-20 text-center border rounded-xl
                        ${isDark ? "bg-white/2 border-white/6" : "bg-white border-gray-200"}`}>
                        <p className={`font-semibold text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Sin usuarios aún</p>
                        <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>Creá el primer usuario para empezar.</p>
                    </div>
                ) : (
                    <UsersTable data={allUsers} setSelected={setSelectedUser} seteditingStatus={setEditingStatus} handleActivate={handleActivateUser} activate={activateUser} />
                )}
            </div>
            <AdminModal open={creatingStatus} title="Nuevo usuario" onClose={() => setCreatingStatus(false)}>
                <UserForm label="Crear usuario" onSubmit={(data) => handleAddUser(data, createUser, () => setCreatingStatus(false))} mode="adminCreate" />
            </AdminModal>
            <AdminModal open={editingStatus} title="Editar usuario" onClose={() => setEditingStatus(false)}>
                <UserForm label="Guardar cambios" user={selectedUser} onSubmit={(data) => handleEditUser(selectedUser._id, data, updateUser, () => setEditingStatus(false))} mode="adminEdit" />
            </AdminModal>
        </div>
    );
};

export default UsersPage;