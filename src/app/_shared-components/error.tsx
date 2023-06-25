import styles from "./error.module.css";

export function Error({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{children}</p>
    </div>
  );
}
