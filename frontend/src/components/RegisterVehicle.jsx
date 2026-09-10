import { useState } from "react";
import styles from "../css/RegisterVehicle.module.css";
import sharedStyles from "../css/Shared.module.css";
import { postVehicle, postVehicleWithImage } from "../services/vehicleService.js";

export default function RegisterVehicle({ onVehicleRegistered }) {
    const [minimize, setMinimize] = useState(true);

    async function submitVehicle(event) {
        event.preventDefault();

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

        if (imageFile && imageFile.size > 0) {
            await postVehicleWithImage(vehicle, imageFile);
        } else {
            await postVehicle(vehicle);
        }

        form.reset();
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
                        <label className={`${sharedStyles.label} ${styles.fullWidth}`}>URL da Imagem
                            <input id="image" name="image" type="file" className={`${sharedStyles.input} ${styles.fileInput}`} />
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
                        <button type="submit" className={`${sharedStyles.primaryButton} ${styles.submitButton}`}>Registrar</button>
                    </div>
                </form>
            )}
        </section>
    )
}
