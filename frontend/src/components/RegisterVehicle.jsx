import { useState } from "react";
import styles from "../css/RegisterVehicle.module.css";
import sharedStyles from "../css/Shared.module.css";

export default function RegisterVehicle() {
    const [minimize, setMinimize] = useState(true);

    return (
        <section className={styles.panel}>
            <div className={styles.header}>
                <h2 id="register-vehicle-title" className={styles.title}>Registrar veículo</h2>
                <button type="button" className={styles.toggleButton} onClick={() => setMinimize(!minimize)}>
                    {minimize ? "↓" : "↑"}
                </button>
            </div>
            {!minimize && (
                <form className={styles.form}>
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
                            <select name="state" id="state" required className={`${sharedStyles.input} ${styles.select}`}>
                                <option selected disabled>Selecione</option>
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
                                    <input type="checkbox" name="fuel" value="Gasolina" /> Gasolina Comum
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Gasolina" /> Gasolina Aditivada
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Gasolina" /> Gasolina Premium
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Diesel" /> Diesel
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="GNV" /> GNV
                                </label>
                                <label className={styles.fuelOption}>
                                    <input type="checkbox" name="fuel" value="Elétrico" /> Elétrico
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div className={styles.footer}>
                        <button className={`${sharedStyles.primaryButton} ${styles.submitButton}`}>Registrar</button>
                    </div>
                </form>
            )}
        </section>
    )
}
