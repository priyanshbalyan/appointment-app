import { type Slot } from "common/types";
import styles from "features/card/Card.module.css";
import { formatTime } from "utils";

interface Props {
	slot: Slot;
}

export const Card = ({ slot }: Props): React.ReactElement => {
	return (
		<div className={styles.card}>
			<div className={styles.flex}>
				<div>{slot.doctor.name}</div>
				<div>{formatTime(slot.time)}</div>
			</div>
			<div className={styles.greyText}>{slot.doctor.specialisation}</div>
		</div>
	);
};
