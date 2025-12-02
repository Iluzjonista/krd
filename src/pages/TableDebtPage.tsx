import { useEffect, useMemo, useState } from "react";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import TableDebts from "../components/TableDebts/TableDebts";
import Error from "../components/Error/Error";
import { Debt } from "../utils/types";
import { GetTopDebts, GetFilteredDebts } from "../utils/api";
import styles from "./tableDebtPage.module.scss";
import { sortDebts } from "../utils/utils";

export default function TableDebtPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [sort, setSort] = useState<{ key: keyof Debt; dir: 'asc' | 'desc' }>({ key: 'Name', dir: 'asc' });
    const [loading, setLoading] = useState<boolean>(true);
    const [phraseFiltering, setPhraseFiltering] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const [top] = await Promise.all([GetTopDebts()]);
                setDebts(top);
            } catch {
                setError('Wystąpił błąd podczas ładowania danych. Proszę spróbować ponownie później.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const sortedDebts = useMemo(() => sortDebts(debts, sort), [debts, sort]);

    async function onSearch(phrase: string) {
        // Reset error state
        setError(null);
        if (!phrase) {
            try {
                // If search phrase is empty, reload top debts
                const top = await GetTopDebts();
                setDebts(top);
            } catch {
                setError('Wystąpił błąd podczas ponownego ładowania danych. Proszę spróbować ponownie później.');
            }
            return;
        }
        setPhraseFiltering(true);
        try {
            const filteredDebts = await GetFilteredDebts(phrase);
            setDebts(filteredDebts);
        } catch (error: any) {
            if (error.message === 'Phrase too short') {
                setError('Fraza wyszukiwania jest za krótka. Proszę podać co najmniej 3 znaki.');
            } else {
                setError('Wystąpił błąd podczas ładowania danych. Proszę spróbować ponownie później.');
            }
        } finally {
            setPhraseFiltering(false);
        }
    }

    function toggleSort(key: keyof Debt): void {
        setSort(prevSort => {
            if (prevSort.key === key) {
                // Toggle direction
                const newDir = prevSort.dir === 'asc' ? 'desc' : 'asc';
                return { key, dir: newDir };
            } else {
                // New sort key, default to ascending
                return { key, dir: 'asc' };
            }
        });
    }

    return (
        <div className={styles.debtPage}>
            <SearchPanel onSearch={onSearch} />
            <div className={styles.tableContainer}>
                {!error ?
                    <TableDebts data={sortedDebts} loading={loading || phraseFiltering} sort={sort} onSort={toggleSort} /> :
                    <Error message={error} />}
            </div>
        </div>
    );
}