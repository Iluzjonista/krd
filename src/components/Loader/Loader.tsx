import styles from './loader.module.scss';

export default function Loader() {
    return (
        <div className={styles.loader} data-testid="loader">
            <div className={styles.spinner} />
        </div>
    );
}