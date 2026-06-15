import { useContext } from "react";

import { DeveloperContext } from "../../context/developers/DeveloperContext";

export function useDevelopers() {

    return useContext(DeveloperContext);

}