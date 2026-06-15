import { useContext } from "react";

import { GameContext } from "../../context/games/GameContext";

export function useGames() {

    return useContext(GameContext);

}