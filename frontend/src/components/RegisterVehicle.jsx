import { useState } from "react";
import styles from "../css/RegisterVehicle.module.css";
import sharedStyles from "../css/Shared.module.css";
import { postVehicle, postVehicleWithImage } from "../services/vehicleService.js";

export default function RegisterVehicle({ onVehicleRegistered }) {
    const [minimize, setMinimize] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submitVehicle(event) {
        event.preventDefault();

        if (isSubmitting) return;

        setErrorMessage("");
        setSuccessMessage("");

        const form = event.currentTarget;
        const formData = new FormData(form);

        const vehicle = {
            brand: formData.get("brand"),
            model: formData.get("model"),
            plate: formData.get("plate"),
            year: parseInt(formData.get("year"), 10),
            power: parseInt(formData.get("power"), 10),
            state: formData.get("state"),
            fuelTypes: formData.getAll("fuel"),
        };

        const imageFile = formData.get("image");

        if (vehicle.fuelTypes.length === 0) {
            setErrorMessage("Selecione ao menos um tipo de combustível.   ");
            return;
        }

        if (imageFile && imageFile.name) {
            if (imageFile.size === 0 || !["image/jpeg", "image/png", "image/webp"].includes(imageFile.type)) {
                setErrorMessage("Selecione uma imagem válida em JPG, PNG ou WEBP.   ");
                return;
            }

            if (imageFile.size > 5 * 1024 * 1024) {
                setErrorMessage("A imagem deve ter no máximo 5 MB.   ");
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const response = imageFile && imageFile.size > 0
                ? await postVehicleWithImage(vehicle, imageFile)
                : await postVehicle(vehicle);

            if (!response.ok) {
                const messages = {
                    400: "Dados inválidos. Confira os campos do veículo e a imagem selecionada.   ",
                    409: "Já existe um veículo cadastrado com essa placa.   ",
                    413: "A imagem deve ter no máximo 5 MB.   ",
                };

                setErrorMessage(messages[response.status] || "Não foi possível cadastrar o veículo. Tente novamente.   ");
                return;
            }
        } catch {
            setErrorMessage("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.   ");
            return;
        } finally {
            setIsSubmitting(false);
        }

        setTimeout(() => {
            form.reset();
            setSuccessMessage("Veículo cadastrado com sucesso!   ");
            
            setMinimize(!minimize)
        }, 1000);
        setErrorMessage("");
        setSuccessMessage("");
        onVehicleRegistered();
    }

    return (
        <section className={styles.panel}>
            <div className={styles.header}>
                <h2 id="register-vehicle-title" className={styles.title}>Registrar veículo</h2>
                <button type="button" className={styles.toggleButton} onClick={() => setMinimize(!minimize)}>
                    {minimize ? "↓" : "↑"}
                </button>
            </div>
            {!minimize && (
                <form className={styles.form} onSubmit={submitVehicle}>
                    <div className={styles.fields}>
                        <label className={sharedStyles.label}>Marca
                            <input name="brand" type="text" placeholder="Marca" required className={sharedStyles.input} />
                        </label>
                        <label className={sharedStyles.label}>Modelo
                            <input name="model" type="text" placeholder="Modelo" required className={sharedStyles.input} />
                        </label>
                        <label className={sharedStyles.label}>Placa
                            <input name="plate" type="text" placeholder="Placa" required className={sharedStyles.input} />
                        </label>
                        <label className={sharedStyles.label}>Ano
                            <input name="year" type="number" placeholder="Ano" required className={sharedStyles.input} />
                        </label>
                        <label className={sharedStyles.label}>Potência
                            <input name="power" type="number" placeholder="Potência" required className={sharedStyles.input} />
                        </label>
                        <label className={sharedStyles.label}>Estado
                            <select name="state" id="state" defaultValue="" required className={`${sharedStyles.input} ${styles.select}`}>
                                <option value="" disabled>Selecione</option>
                                <option value="Novo">Novo</option>
                                <option value="Usado">Usado</option>
                            </select>
                        </label>
                        <label className={`${sharedStyles.label} ${styles.fullWidth}`}>Imagem (JPG, PNG ou WEBP, até 5 MB)
                            <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" className={`${sharedStyles.input} ${styles.fileInput}`} />
                        </label>
                        <fieldset className={styles.fuelFieldset}>
                            <legend className={sharedStyles.label}>Tipo de combustível:</legend>
                            <div className={styles.fuelOptions}>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Gasolina comum" /> Gasolina Comum
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Gasolina aditivada" /> Gasolina Aditivada
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Gasolina premium" /> Gasolina Premium
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Diesel" /> Diesel
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="GNV" /> GNV
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Eletrico" /> Elétrico
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div className={styles.footer}>
                        {errorMessage && (
                            <p className={styles.errorMessage} role="alert">
                                {errorMessage}
                            </p>
                        )}
                        {successMessage && (
                            <p className={styles.successMessage} role="status">
                                {successMessage}
                            </p>
                        )}
                        <button type="submit" disabled={isSubmitting} className={`${sharedStyles.primaryButton} ${styles.submitButton}`}>
                            {isSubmitting ? "Registrando..." : "Registrar"}
                        </button>
                    </div>
                </form>
            )}
        </section>
    )
}
