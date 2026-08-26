import { useNavigate } from "react-router-dom";

export default function Iniciar () {
    const navigate = useNavigate();

    const init = () => {
        navigate("/signin");
    }
    
    return (
        <div>
            <button onClick={init}>Iniciar</button>
        </div>
    )
}