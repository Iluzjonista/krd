import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import TableDebts from "../components/TableDebts/TableDebts";
import { Debt } from "../utils/types";
import { GetTopDebts, GetFilteredDebts, GetDebtsCount } from "../utils/api";
import styles from "./tableDebtPage.module.scss";

export default function TableDebtPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const [top] = await Promise.all([GetTopDebts()]);
                setDebts(top);
                const [number] = await Promise.all([GetDebtsCount()]);
                setCount(number);
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
                {/* testing purpose */}{count > 0 && <p>Łączna liczba dłużników w bazie: {count}</p>}
                {loading ? <Loader /> : <TableDebts data={debts} />}
            </div>
        </div>
    );
}