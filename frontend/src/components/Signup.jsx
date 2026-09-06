import { useNavigate } from "react-router-dom";
import styles from "../css/Auth.module.css";
import sharedStyles from "../css/Shared.module.css";

export default function Signup() {
    const navigate = useNavigate();

    const goToSignin = () => navigate("/signin");

    return (
        <main className={`${styles.page} ${sharedStyles.pageTransition}`}>
            <form className={styles.form}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Crie sua conta</h1>
                    <p className={styles.subtitle}>Preencha seus dados para começar</p>
                </div>

                <div className={styles.fields}>
                    <label className={styles.label}>Nome
                        <input type="text" placeholder="Seu nome" autoComplete="name" required className={styles.input} />
                    </label>
                    <label className={styles.label}>E-mail
                        <input type="email" placeholder="seu@email.com" autoComplete="email" required className={styles.input} />
                    </label>
                    <label className={styles.label}>Senha
                        <input type="password" placeholder="Crie uma senha" autoComplete="new-password" required className={styles.input} />
                    </label>
                    <label className={styles.label}>Confirmar senha
                        <input type="password" placeholder="Repita sua senha" autoComplete="new-password" required className={styles.input} />
                    </label>
                </div>

                <button type="submit" className={`${sharedStyles.primaryButton} ${styles.submitButton}`}>
                    Cadastrar
                </button>

                <p className={styles.switchText}>
                    Já possui uma conta?{" "}
                    <button type="button" onClick={goToSignin} className={styles.linkButton}>
                        Entrar
                    </button>
                </p>
            </form>
        </main>
    );
}
