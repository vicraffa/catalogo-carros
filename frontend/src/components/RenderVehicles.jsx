import styles from "../css/RenderVehicles.module.css";
import { useState, useEffect } from "react";
import { fetchVehicles } from "../services/vehicleService";

export default function RenderVehicle({ refreshCount }) {
    const [listVehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehicles().then((data) => setVehicles(data));
    }, [refreshCount]);

    return (
        <section className={styles.section}>
            <h2 id="vehicles-title" className={styles.title}>Veículos</h2>
            <ul className={styles.list}>
                {listVehicles.map((vehicle) => (
                    <li key={vehicle.id} className={styles.card}>
                        <div className={styles.imageFrame}>
                            {vehicle.imageUrl ? (
                                <img
                                    className={styles.image}
                                    src={`http://localhost:8080${vehicle.imageUrl}`}
                                    alt={`${vehicle.brand} ${vehicle.model}`}
                                    loading="lazy"
                                />
                            ) : (
                                <span className={styles.imagePlaceholder}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="3" y="3" width="18" height="18" rx="3" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="m21 15-5-5L5 21" />
                                    </svg>
                                    Sem imagem
                                </span>
                            )}
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.vehicleTitle}>
                                <span>{vehicle.brand}</span> {vehicle.model}
                            </h3>
                            <dl className={styles.details}>
                                <div>
                                    <dt>Ano:</dt>
                                    <dd>{vehicle.year}</dd>
                                </div>
                                <div>
                                    <dt>Potência:</dt>
                                    <dd>{vehicle.power} CV</dd>
                                </div>
                                <div>
                                    <dt>Placa:</dt>
                                    <dd>{vehicle.plate}</dd>
                                </div>
                                <div>
                                    <dt>Estado:</dt>
                                    <dd>{vehicle.state}</dd>
                                </div>
                            </dl>
                            <div className={styles.fuels}>
                                <p className={styles.fuelLabel}>Combustíveis:</p>
                                <ul className={styles.fuelList}>
                                    {vehicle.fuelTypes.map((fuel, index) => (
                                        <li key={index}>{fuel}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
