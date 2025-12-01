import { Debt } from '../../utils/types';
import styles from './tableDebts.module.scss';

type TableDebtsProps = {
  data: Debt[];
  
};


export default function TableDebts({ data }: TableDebtsProps) {

  return (
    <div className={styles.container}>
        
      <table className={styles.tableDebts}>
        <thead>
          <tr>
            <th>Dłużnik</th>
            <th>NIP</th>
            <th>Kwota zadłużeniaValue</th>
            <th>Data powstałego zobowiązania</th>
          </tr>
        </thead>
        <tbody>
          {data.map((debt) => (
            <tr key={debt.Id}>
              <td>{debt.Name}</td>
              <td>{debt.NIP}</td>
              <td>{debt.Value}</td>
              <td>{debt.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
