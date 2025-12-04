import { Debt } from '../../utils/types';
import { formatDate } from '../../utils/utils';
import Loader from '../Loader/Loader';
import styles from './tableDebts.module.scss';

type TableDebtsProps = {
  data: Debt[];
  loading?: boolean;
  sort: { key: keyof Debt; dir: 'asc' | 'desc' };
  onSort: (key: keyof Debt) => void;
};

const headers: { key: keyof Debt; label: string; }[] = [
  { key: 'Name', label: 'Dłużnik' },
  { key: 'NIP', label: 'NIP' },
  { key: 'Value', label: 'Kwota zadłużenia' },
  { key: 'Date', label: 'Data' },
];

export default function TableDebts({ data, loading, sort, onSort }: TableDebtsProps) {
  return (
    <>
      <div className={styles.container}>
        <table className={styles.tableDebts}>
          <thead>
            <tr>
              {headers.map(header => (
                <th
                  key={header.key as string}
                  aria-sort={sort.key === header.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  onClick={() => onSort(header.key)}
                >
                  <span>{header.label}</span>
                  <span className={styles[`${sort.key === header.key ? sort.dir : ''}`]} />
                  <span className={`${styles.sortIcon} ${styles[`${sort.key === header.key ? sort.dir : ''}`]}`} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ?
              <tr>
                <td colSpan={4}>
                  <Loader />
                </td>
              </tr> :
              data.length === 0 ?
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>Brak danych do wyświetlenia</td>
                </tr> :
                <>
                  {
                    data.map((debt) => (
                      <tr key={debt.Id}>
                        <td>{debt.Name}</td>
                        <td>{debt.NIP}</td>
                        <td>{debt.Value}</td>
                        <td>{formatDate(debt.Date)}</td>
                      </tr>
                    ))
                  }
                </>
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
