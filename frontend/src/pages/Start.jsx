import { useNavigate } from "react-router-dom";
import pageStyles from "../css/Start.module.css";
import sharedStyles from "../css/Shared.module.css";

export default function Start() {
    const navigate = useNavigate();

    const start = () => {
        navigate("/signin");
    }
    
    return (
        <div className={`${pageStyles.page} ${sharedStyles.pageTransition}`}>
            <h1 className={pageStyles.title}>
                Catálogo de <span>Veículos</span>
            </h1>
            <button
                type="button"
                onClick={start}
                className={sharedStyles.primaryButton}
            >
                Iniciar
            </button>
        </div>
    )
}
