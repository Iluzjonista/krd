import styles from './searchPanel.module.scss';
import { useState } from 'react';

type SearchPanelProps = {
    onSearch: (phrase: string) => void;
};

export default function SearchPanel({ onSearch }: SearchPanelProps) {
    const [value, setValue] = useState<string>('');
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        onSearch(value)
    }

    if (event.key === "Escape") {
      setValue("");
    }
  };
    return (
        <div className={styles.searchPanel}>
            <div className={styles.container}>
                <div className={styles.title}>Podaj NIP lub nazwę dłużnika</div>
                <div className={styles.search} >
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder=""
                        aria-label="Wyszukiwanie długów"
                        role="searchbox"
                    />
                    <button
                        onClick={() => onSearch(value)}
                        className={styles.searchBtn}
                    >
                        Szukaj
                    </button>
                </div></div>
        </div>
    );
}