import styles from './error.module.scss';

type errorProps = {
    message: string
};

export default function Error({ message }: errorProps) {
    return (
        <div className={styles.container}>
            <div className={styles.error}>
                {message}
            </div>
        </div>
    );
}