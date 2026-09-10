import RegisterVehicle from "../components/RegisterVehicle.jsx";
import RenderVehicles from "../components/RenderVehicles.jsx";
import Header from "../components/Header.jsx";
import { useState } from "react";

import styles from "../css/Catalogue.module.css";

export default function Catalogue () {
    const user = JSON.parse(localStorage.getItem("user"));

    const [refreshCount, setRefreshCount] = useState(0);

    function refreshVehicles() {
        setRefreshCount(refreshCount + 1);
    }

    return (
        <main className={styles.main}>
            <Header user={user} />
            <RegisterVehicle onVehicleRegistered = {refreshVehicles} />
            <RenderVehicles refreshCount = {refreshCount} />
        </main>
    )
}