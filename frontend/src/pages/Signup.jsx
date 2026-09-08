import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../css/Auth.module.css";
import sharedStyles from "../css/Shared.module.css";
import { signup } from "../services/authService";

export default function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const goToSignin = () => navigate("/signin");

    const handleSubmit = async (event) => {
            event.preventDefault();
            setErrorMessage("");
            setSuccessMessage("");
        
            if (event.target.password.value !== event.target.confirmPassword.value) {
                setErrorMessage("As senhas não coincidem");
                return;
            }

            try {
                const response = await signup(
                    event.target.name.value,
                    event.target.email.value,
                    event.target.password.value
                );
    
                if (response.status === 400) {
                    setErrorMessage("Dados inválidos. Por favor, verifique suas informações.");
                    return;
                } else if (response.status === 409) {
                    setErrorMessage("E-mail já cadastrado. Por favor, use outro e-mail.");
                    return;
                }
                
                
                setSuccessMessage("Conta criada com sucesso! Redirecionando para login...");
                    
                setTimeout(() => {    
                    navigate("/signin");
                }, 2000);

            } catch (error) {
                console.error("Erro ao criar conta:", error);
                setErrorMessage("Não foi possível conectar ao servidor, avise o administrador");
            }
        }

    return (
        <main className={`${styles.page} ${sharedStyles.pageTransition}`}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Crie sua conta</h1>
                    <p className={styles.subtitle}>Preencha seus dados para começar</p>
                </div>

                <div className={styles.fields}>
                    <label className={sharedStyles.label}>Nome
                        <input name="name" type="text" placeholder="Seu nome" autoComplete="name" required className={sharedStyles.input} />
                    </label>
                    <label className={sharedStyles.label}>E-mail
                        <input name="email" type="email" placeholder="seu@email.com" autoComplete="email" required className={sharedStyles.input} />
                    </label>
                    <label className={sharedStyles.label}>Senha
                        <input name="password" type="password" placeholder="Crie uma senha" autoComplete="new-password" required className={sharedStyles.input} />
                    </label>
                    <label className={sharedStyles.label}>Confirmar senha
                        <input name="confirmPassword" type="password" placeholder="Repita sua senha" autoComplete="new-password" required className={sharedStyles.input} />
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
