import { useState } from "react";
import UserForm from "../../../forms/user/userForm";
import { useUsers } from "../../../../hooks/users/useUsers";
import { handleAddUser, handleEditUser, handleActivateUser } from "../../../../utils/admin/handleUser";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import UsersTable from "./UsersTable";

const UsersPage = () => {
    const { allUsers, createUser, updateUser, activateUser } = useUsers();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="bg-[#0a0c10] min-h-screen text-white font-sans">
            <AdminPageHeader
                title="Usuarios"
                subtitle="Trabaja con las cuentas de las plataformas."
                buttonText="+ Nuevo usuario"
                onClick={() => setCreatingStatus(true)}
            />

            <div className="p-6">
                {allUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white/2 border border-white/6 rounded-xl">
                        <p className="text-gray-400 font-semibold text-sm">Sin usuarios aún</p>
                        <p className="text-gray-600 text-xs mt-1">Crea el primer usuario para empezar.</p>
                    </div>
                ) : (
                    <UsersTable
                        data={allUsers}
                        setSelected={setSelectedUser}
                        seteditingStatus={setEditingStatus}
                        handleActivate={handleActivateUser}
                        activate={activateUser}
                    />
                )}
            </div>

            <AdminModal open={creatingStatus} title="Nuevo usuario" onClose={() => setCreatingStatus(false)}>
                <UserForm label="Crear usuario" onSubmit={(data) => handleAddUser(data, createUser)} mode="adminCreate" />
            </AdminModal>

            <AdminModal open={editingStatus} title="Editar usuario" onClose={() => setEditingStatus(false)}>
                <UserForm
                    label="Guardar cambios"
                    user={selectedUser}
                    onSubmit={(data) => handleEditUser(selectedUser._id, data, updateUser)}
                    mode="adminEdit"
                />
            </AdminModal>
        </div>
    );
};

export default UsersPage;