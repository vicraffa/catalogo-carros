import { useNavigate } from "react-router-dom";
import styles from "../css/Header.module.css";

export default function Header({ user }) {
    const navigate = useNavigate();

    return (
        user != null ? (
            <header className={styles.header}>
                <div className={styles.user}>
                    <h1 className={styles.title}>Bem vindo, <span>{user.name}</span>!</h1>
                </div>

                <button type="button" className={styles.exitButton} onClick={() => navigate("/signin")}>Sair</button>
            </header>
        ) : (
            <header className={styles.header}>
                <h1 className={styles.title}>Bem vindo, <span>Desconhecido</span>!</h1>
                <button type="button" className={styles.exitButton} onClick={() => navigate("/signin")}>Sair</button>
            </header>
        )
    )
}
