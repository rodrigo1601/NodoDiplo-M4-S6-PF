import { useContext } from "react";

import { UserContext } from "../../context/users/UserContext";

export function useUsers() {

    return useContext(UserContext);

}