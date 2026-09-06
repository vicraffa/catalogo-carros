
import { useNavigate } from "react-router-dom";
import styles from "../css/Auth.module.css";
import sharedStyles from "../css/Shared.module.css";

export default function Signin() {
    const navigate = useNavigate();
    
    const goToSignup = () => navigate("/signup");

    
    
    return (
        <main className={`${styles.page}`}>
            <form  className={styles.form}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Bem-vindo</h1>
                    <p className={styles.subtitle}>Entre para acessar sua conta</p>
                </div>

                <div className={styles.fields}>
                    <label className={styles.label}>
                        E-mail
                        <input name="email" type="email" placeholder="seu@email.com" autoComplete="email" required className={styles.input} />
                    </label>
                    <label className={styles.label}>
                        Senha
                        <input name="password" type="password" placeholder="Sua senha" autoComplete="current-password" required className={styles.input} />
                    </label>
                </div>


                <button type="submit" className={`${sharedStyles.primaryButton} ${styles.submitButton}`}>
                    Entrar
                </button>

                <p className={styles.switchText}>
                    Ainda não possui conta?{" "}
                    <button type="button" onClick={goToSignup} className={styles.linkButton}>
                        Cadastre-se
                    </button>
                </p>
            </form>
        </main>
    );
}
