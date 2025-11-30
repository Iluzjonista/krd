import styles from './searchPanel.module.scss';
import { useState } from 'react';

export default function SearchPanel() {
    const [value, setValue] = useState('');
    return (
        <div className={styles.searchPanel}>
            <div className={styles.container}>
                <div className={styles.title}>Podaj NIP lub nazwę dłużnika</div>
                <div className={styles.search} >
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
                </div></div>
        </div>
    );
}