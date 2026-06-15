import { useContext } from "react";

import { GenreContext } from "../../context/genres/GenreContext";

export function useGenres() {

    return useContext(GenreContext);

}