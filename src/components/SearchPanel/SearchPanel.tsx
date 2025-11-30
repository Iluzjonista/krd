import styles from './searchPanel.module.scss';
import { useState } from 'react';

export default function SearchPanel() {
  const [value, setValue] = useState('');
    return (
    <div className={styles.searchPanel}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder=""
        aria-label="Wyszukiwanie długów"
      />
      <button
        onClick={() => console.log('Szukaj:', value)}
        className={styles.searchBtn}
      >
        Szukaj
      </button>
    </div>
  );
}