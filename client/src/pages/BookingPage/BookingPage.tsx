import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
	useBookSlotsMutation,
	useGetDoctorsQuery,
} from "app/services/slotsApi";
import TimePicker from "features/timepicker/TimePicker";
import {
	selectedDoctor,
	setSelectedDoctor,
	setSlots,
} from "features/booking/slotsSlice";
import { Endpoints } from "features/router/endpoints";
import styles from "pages/BookingPage/BookingPage.module.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
	getDateRanges,
	getNext3Months,
	getTimeRanges,
	getUniqueDates,
	includesDate,
	processError,
	removeDate,
} from "utils";

const BookingPage = (): React.ReactElement => {
	const monthRange = getNext3Months();
	const navigate = useNavigate();
	const [bookSlots] = useBookSlotsMutation();
	const { data: doctors } = useGetDoctorsQuery();

	const [selectedMonth, setSelectedMonth] = useState(monthRange[0].value);
	const selectedDoc = useAppSelector(selectedDoctor);
	const dispatch = useAppDispatch();

	const dateRange = getDateRanges(selectedMonth);
	const [selectedDay, setSelectedDay] = useState(dateRange[0].day);

	const timeRange = getTimeRanges(selectedMonth, selectedDay);
	const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	): void => {
		const doctor =
			doctors?.find((doc) => doc.id.toString() === event.target.value) ?? null;
		dispatch(setSelectedDoctor(doctor));
	};

	const handleMonthChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	): void => {
		setSelectedMonth(parseInt(event.target.value, 10));
	};

	const handleDayChange = (day: number): (() => void) => {
		return () => {
			setSelectedDay(day);
		};
	};

	const handleTimeChange = (time: Date): void => {
		if (selectedTimes.length >= 24) {
			toast("Maximum 24 slots can be selected!");
			return;
		}
		if (includesDate(selectedTimes, time)) {
			setSelectedTimes(removeDate(selectedTimes, time));
		} else {
			setSelectedTimes(getUniqueDates([...selectedTimes, time]));
		}
	};

	const handleBook = async (): Promise<void> => {
		if (selectedTimes.length === 0) {
			toast("You need to select a time!");
			return;
		}
		try {
			await bookSlots(
				selectedTimes.map((time) => ({
					time,
					doctorId: selectedDoc?.id ?? -1,
				})),
			).unwrap();
			toast("Appointment Booked!");
			// invalidate currently loaded slots to be fetched again
			dispatch(setSlots([]));
			navigate(Endpoints.APPOINTMENTS);
		} catch (err) {
			processError(err);
		}
	};

	const handleBackClick = (): void => {
		navigate(-1); // go back
	};

	useEffect(() => {
		// load doctors from API and set first item as selected
		if (doctors) dispatch(setSelectedDoctor(doctors[0]));
	}, [doctors]);

	useEffect(() => {
		setSelectedMonth(monthRange[0].value);
		setSelectedDay(dateRange[0].day);
		setSelectedTimes([]);
	}, [selectedDoc]);

	useEffect(() => {
		setSelectedDay(dateRange[0].day);
	}, [selectedMonth]);

	const renderDays = dateRange.map((day) => (
		<button
			key={day.day}
			onClick={handleDayChange(day.day)}
			className={
				selectedDay === day.day ? styles.buttonHighlight : styles.dayButton
			}
		>
			{day.week}
			<br />
			{day.day}
		</button>
	));

	return (
		<div className={styles.container}>
			<FontAwesomeIcon
				className={styles.icon}
				icon={faArrowLeft}
				onClick={handleBackClick}
			/>
			<h1>Booking Appointment</h1>
			<div>
				<select value={selectedDoc?.id} onChange={handleSelectChange}>
					{(doctors ?? []).map((doctor) => (
						<option key={doctor.id} value={doctor.id}>
							{doctor.specialisation}
						</option>
					))}
				</select>
				<br />
				<select value={selectedMonth} onChange={handleMonthChange}>
					{monthRange.map((month) => (
						<option
							key={month.month}
							value={month.value}
						>{`${month.month} ${month.year}`}</option>
					))}
				</select>
			</div>
			<div className={styles.bold}>Select Schedule</div>
			<div className={styles.dayContainer}>{renderDays}</div>
			<div className={styles.divider}></div>
			{selectedDoc && (
				<TimePicker
					onSelect={handleTimeChange}
					range={timeRange}
					selectedTimes={selectedTimes}
					docId={selectedDoc.id}
				/>
			)}
			<div className={styles.divider}></div>
			<button className={styles.bookButton} onClick={handleBook}>
				Book now{" "}
				{selectedTimes.length > 0 ? `(${selectedTimes.length} selected)` : ""}
			</button>
		</div>
	);
};

export default BookingPage;
