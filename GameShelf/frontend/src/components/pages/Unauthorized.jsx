import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ErrorPage from "./ErrorPage";

const Unauthorized = () => {
    useDocumentTitle("Acceso no autorizado | GameShelf");
    return (
        <ErrorPage
            code="401"
            accentColor="#eab308"
            eyebrow="No autorizado"
            title="Inicio de sesión necesario"
            description="Necesitás una cuenta para acceder a esta página."
            linkTo="/login"
            linkLabel="Iniciar sesión"
        />
    );
};

export default Unauthorized;