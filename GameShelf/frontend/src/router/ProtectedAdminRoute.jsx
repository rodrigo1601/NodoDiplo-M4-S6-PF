import { useAuth } from "../hooks/users/useAuth";
import Unauthorized from "../components/pages/Unauthorized";
import AccessDenied from "../components/pages/AccesDenied";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();

    if(loading){
        return <p>Cargando...</p>
    }

    if (!user) {
        return <Unauthorized/>;
    }

    if (user.role !== 1) {
        return <AccessDenied/>;
    }

    return children;
};

export default AdminRoute;