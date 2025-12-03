import styles from './loader.module.scss';

export default function Loader() {
    return (
        <td className={styles.loader} data-testid="loader">
            <span className={styles.spinner} />
        </td>
    );
}