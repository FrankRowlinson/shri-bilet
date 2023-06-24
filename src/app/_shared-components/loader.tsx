import styles from "./loader.module.css";

export function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.first}></div>
        <div className={styles.second}></div>
        <div className={styles.third}></div>
        <div className={styles.fourth}></div>
      </div>
    </div>
  );
}
