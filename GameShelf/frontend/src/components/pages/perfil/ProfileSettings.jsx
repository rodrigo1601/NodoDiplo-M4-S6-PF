import { useTheme } from "../../../hooks/useTheme";
import UserForm from "../../forms/user/userForm";
import { handleUpdateUser } from "../../../utils/handleUser";

const ProfileSettings = ({ open, onClose, user, updateUser }) => {
    const { isDark } = useTheme();
    if (!open) return null;

    return (
        <section className="fixed inset-0 bg-black/60 flex flex-col justify-center items-center z-50 backdrop-blur-sm">
            <div className={`w-full max-w-md border rounded-2xl shadow-2xl ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200"}`}>
                <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-white/6" : "border-gray-100"}`}>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Account settings</span>
                    </div>
                    <button
                        onClick={onClose}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm transition-colors cursor-pointer
                            ${isDark ? "text-gray-500 hover:bg-white/6 hover:text-gray-200" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"}`}
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    <UserForm
                        onSubmit={data => handleUpdateUser(user.id, data, updateUser, onClose)}
                        user={user}
                        label="Save changes"
                        mode="edit"
                    />
                </div>
            </div>
        </section>
    );
};

export default ProfileSettings;