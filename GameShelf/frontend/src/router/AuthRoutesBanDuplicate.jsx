import { useAuth } from "../hooks/users/useAuth";
import AlreadyAuthenticated from "../components/pages/AlreadyAuthenticated";

const AuthRoutesBanDuplicate = ({ children }) => {
    
    const { user } = useAuth();

    if (user) {
        return <AlreadyAuthenticated/>;
    }

    return children;
};

export default AuthRoutesBanDuplicate;