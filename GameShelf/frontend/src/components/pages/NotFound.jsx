import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ErrorPage from "./ErrorPage";

const NotFound = () => {
    useDocumentTitle("No encontrado | GameShelf");
    return (
        <ErrorPage
            code="404"
            accentColor="#8b5cf6"
            eyebrow="No encontrado"
            title="Página no encontrada"
            description="La página que estás buscando no existe o fue removida."
            linkTo="/"
            linkLabel="Volver al inicio"
        />
    );
};

export default NotFound;