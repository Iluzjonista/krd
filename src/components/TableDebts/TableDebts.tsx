import { Debt } from '../../utils/types';
import { formatDate } from '../../utils/utils';
import Loader from '../Loader/Loader';
import styles from './tableDebts.module.scss';

type TableDebtsProps = {
  data: Debt[];
  loading?: boolean;
};


export default function TableDebts({ data, loading }: TableDebtsProps) {
  return (
    <>
      {loading ? <Loader /> :
        <div className={styles.container}>
          <table className={styles.tableDebts}>
            <thead>
              <tr>
                <th>Dłużnik</th>
                <th>NIP</th>
                <th>Kwota zadłużenia</th>
                <th>Data powstałego zobowiązania</th>
              </tr>
            </thead>
            <tbody>
              {data.map((debt) => (
                <tr key={debt.Id}>
                  <td>{debt.Name}</td>
                  <td>{debt.NIP}</td>
                  <td>{debt.Value}</td>
                  <td>{formatDate(debt.Date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
    </>
  );
}
