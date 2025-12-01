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
    const [loading, setLoading] = useState<boolean>(true);
    const [phraseFiltering, setPhraseFiltering] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const [top, number] = await Promise.all([GetTopDebts(), GetDebtsCount()]);
                setDebts(top);
                setCount(number);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const sortedDebts = useMemo(() => sortDebts(debts, sort), [debts, sort]);

    async function onSearch(phrase: string) {
        if (!phrase) {
            // If search phrase is empty, reload top debts
            const top = await GetTopDebts();
            setDebts(top); return;
        }
        setPhraseFiltering(true);
        try {
            const filteredDebts = await GetFilteredDebts(phrase);
            setDebts(filteredDebts);
        } catch {
            setError(true);
        } finally {
            setPhraseFiltering(false);
        }
    }

    return (
        <div className={styles.debtPage}>
            <SearchPanel onSearch={onSearch} />
            <div className={styles.tableContainer}>
                {/* testing purpose */}{count > 0 && <p>Łączna liczba dłużników w bazie: {count}</p>}
                {!error ? <TableDebts data={sortedDebts} loading={loading || phraseFiltering} /> : <div>Nie udało się załadować danych.</div>}
            </div>
        </div>
    );
}