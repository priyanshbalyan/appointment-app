import styles from "features/loader/Loader.module.css";

export const Loader = (): React.ReactElement => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};
