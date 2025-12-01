import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import TableDebts from "../components/TableDebts/TableDebts";
import { Debt } from "../utils/types";
import { GetTopDebts } from "../utils/api";
import styles from "./tableDebtPage.module.scss";

export default function TableDebtPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const [top] = await Promise.all([GetTopDebts()]);
                setDebts(top);
            } catch {
                console.log('Nie udało się załadować danych.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className={styles.debtPage}>
            <SearchPanel />
            <div className={styles.tableContainer}>
                {loading ? <Loader /> : <TableDebts data={debts} />}
            </div>
        </div>
    );
}