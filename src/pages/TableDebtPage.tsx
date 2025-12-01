import { useEffect, useMemo, useState } from "react";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import TableDebts from "../components/TableDebts/TableDebts";
import { Debt } from "../utils/types";
import { GetTopDebts, GetFilteredDebts, GetDebtsCount } from "../utils/api";
import styles from "./tableDebtPage.module.scss";
import { sortDebts } from "../utils/utils";

export default function TableDebtPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [count, setCount] = useState<number>(0);
    const [sort, setSort] = useState<{ key: keyof Debt; dir: 'asc' | 'desc' }>({ key: 'Name', dir: 'asc' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const [top] = await Promise.all([GetTopDebts()]);
                setDebts(top);
                const [number] = await Promise.all([GetDebtsCount()]);
                setCount(number);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const sortedDebts = useMemo(() => sortDebts(debts, sort), [debts, sort]);

    return (
        <div className={styles.debtPage}>
            <SearchPanel />
            <div className={styles.tableContainer}>
                {/* testing purpose */}{count > 0 && <p>Łączna liczba dłużników w bazie: {count}</p>}
                <TableDebts data={sortedDebts} loading={loading} />
                {error && <div>Nie udało się załadować danych.</div>}
            </div>
        </div>
    );
}