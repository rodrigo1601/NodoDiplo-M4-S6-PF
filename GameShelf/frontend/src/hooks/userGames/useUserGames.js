import { useContext } from "react";

import { UserGamesContext } from "../../context/userGames/UserGamesContext";

export function useUserGames() {

    return useContext(UserGamesContext);

}