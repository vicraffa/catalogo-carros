import styles from '../css/Catalogue.module.css';
import sharedStyles from "../css/Shared.module.css";

export default function Catalogue () {
    return (
        <main className={`${styles.page} ${sharedStyles.pageTransition}`}>
            <h1>Catalogo</h1>
        </main>
    )
}