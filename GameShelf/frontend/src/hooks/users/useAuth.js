import { useContext } from "react";

import { AuthContext } from "../../context/users/AuthContext";

export function useAuth() {

    return useContext(AuthContext);

}