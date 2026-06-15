import UpdateUserForm from "../forms/updateUser/updateUserForm";
import { useAuth } from "../../hooks/users/useAuth";
import { handleUpdateUser } from "../../utils/handleUser";

const Configuration = ({user}) => {

    const { updateUser } = useAuth();

    return (
        <>
            <h1>Configuration</h1>
            <p>Manage your account settings and preferences.</p>
            <UpdateUserForm user={user} onSubmit={(data) => handleUpdateUser(user.id, data, updateUser)}/>
        </>
    );
};


export default Configuration;
        