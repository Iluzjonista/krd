import Loader from "../components/Loader/Loader";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import styles from "./tableDebtPage.module.scss";

export default function TableDebtPage() {
    return (
        <div className={styles.debtPage}>
            <SearchPanel />
            <div className={styles.tableContainer}>
                <Loader />
            </div>
        </div>
    );
}