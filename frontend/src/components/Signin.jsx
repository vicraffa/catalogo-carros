import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Auth.module.css";
import sharedStyles from "../css/Shared.module.css";
import { signin } from "../services/authService";

export default function Signin() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const goToSignup = () => navigate("/signup");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await signin(
                event.target.email.value,
                event.target.password.value
            );

            if (!response.ok) {
                setErrorMessage("Email ou senha inválida");
                return;
            }

            const data = await response.json();

            console.log("Dados do usuário:", data);
            setSuccessMessage("Login bem-sucedido! Redirecionando...");
                    
            setTimeout(() => {    
                navigate("/catalogue");
            }, 2000);
        } catch (error) {
            console.error("Erro ao autenticar:", error);
            setErrorMessage("Não foi possível conectar ao servidor, avise o administrador");
        }
    }

    return (
        <main className={`${styles.page}`}>
            <form  className={styles.form} onSubmit={handleSubmit}>
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

                {errorMessage && (
                    <p className={styles.errorMessage} role="alert">
                        {errorMessage}
                    </p>
                )}
                {successMessage && (
                    <p className={styles.successMessage} role="alert">
                        {successMessage}
                    </p>
                )}

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
