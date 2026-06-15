import { useContext } from "react";

import { PlatformContext } from "../../context/platforms/PlatformContext";

export function usePlatforms() {

    return useContext(PlatformContext);

}