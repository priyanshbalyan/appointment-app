import { useGetSlotsByIdQuery } from 'app/services/slotsApi';
import styles from 'features/TimeRange/TimeRange.module.css'
import toast from 'react-hot-toast';
import { includesDate } from 'utils';

interface Props {
    onSelect: (time: Date) => void;
    range: Array<{time: string, value: Date}>;
    selectedTimes: Date[];
    docId: number;
}

const TimeRange = (props: Props): React.ReactElement => {
    const { onSelect, range, selectedTimes, docId } = props;
    const { data: slots } = useGetSlotsByIdQuery(docId);

    const getTimeButtonClass = (timeValue: Date): string => {
		if (includesDate(slots?.map(slot => slot.time), timeValue)) return styles.timeDisabled;
		return includesDate(selectedTimes, timeValue) ? styles.timeHighlight : styles.timeButton
	}

    const handleSelect = (time: Date): () => void => {
        return () => {
            if (includesDate(slots?.map(slot => slot.time), time)) {
				toast('Slot is unavailable!');
				return;
			}
            onSelect(time);
        }
    }

    if (range.length === 0) return <div className={styles.noSlotText}>No open slots available for today</div>; 
    const buttons = range.map(time => (
        <button 
            key={time.time}
            onClick={handleSelect(time.value)}
            className={getTimeButtonClass(time.value)}>
            {time.time}
        </button>
    ));
    return (
        <div className={styles.gridContainer}>
            {buttons}
        </div>
    );
};

export default TimeRange;