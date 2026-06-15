import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ErrorPage from "./ErrorPage";

const AlreadyAuthenticated = () => {
    useDocumentTitle("Cuenta activa | GameShelf");
    return (
        <ErrorPage
            code="403"
            accentColor="#60a5fa"
            eyebrow="Con sesión activa"
            title="Ya iniciaste sesión"
            description="No podés acceder a esta página mientras tenés una sesión activa."
            linkTo="/"
            linkLabel="Ir al inicio"
        />
    );
};

export default AlreadyAuthenticated;