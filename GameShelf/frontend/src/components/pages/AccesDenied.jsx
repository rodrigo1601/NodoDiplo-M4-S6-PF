import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ErrorPage from "./ErrorPage";

const AccessDenied = () => {
    useDocumentTitle("Acceso denegado | GameShelf");
    return (
        <ErrorPage
            code="403"
            accentColor="#ef4444"
            eyebrow="Acceso denegado"
            title="No podés estar aquí"
            description="No tenés los permisos necesarios para ver esta sección."
            linkTo="/"
            linkLabel="Ir al inicio"
        />
    );
};

export default AccessDenied;