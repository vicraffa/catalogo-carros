import RegisterVehicle from "../components/RegisterVehicle.jsx";
import RenderVehicles from "../components/RenderVehicles.jsx";
import Header from "../components/Header.jsx";

import styles from "../css/Catalogue.module.css";

export default function Catalogue () {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <main className={styles.main}>
            <Header user={user} />
            <RegisterVehicle />
            <RenderVehicles />
        </main>
    )
}