import styles from "features/loader/Loader.module.css";

interface Props {
	fullPage?: boolean;
}

export const Loader = ({ fullPage = true }: Props): React.ReactElement => {
	const containerClass = fullPage
		? `${styles.loadingContainer} ${styles.fullPage}`
		: styles.loadingContainer;

	return (
		<div data-testid="loader" className={containerClass}>
			<div className={styles.loadingSpinner}></div>
		</div>
	);
};
