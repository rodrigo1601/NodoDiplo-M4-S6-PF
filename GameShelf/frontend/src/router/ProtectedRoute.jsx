import { useAuth } from "../hooks/users/useAuth";
import Unauthorized from "../components/pages/Unauthorized";

const ProtectedRoute = ({ children }) => {
    
    const { user } = useAuth();

    if (!user) {
        return <Unauthorized/>;
    }

    return children;
};

export default ProtectedRoute;