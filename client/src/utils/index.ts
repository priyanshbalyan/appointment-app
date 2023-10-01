import { type Slot } from "common/types";
import toast from "react-hot-toast";

interface LocaleMonthOptions {
	month: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
}

interface LocaleTimeOptions {
	hour: "numeric";
	minute: "numeric";
	hour12: true;
}

export const getNext3Months = (
	currentDate: Date = new Date(),
): Array<{
	month: string;
	year: number;
	value: number;
}> => {
	const months = [];

	for (let i = 0; i < 4; i++) {
		const nextMonth = new Date(currentDate);
		nextMonth.setMonth(currentDate.getMonth() + i);

		const options: LocaleMonthOptions = { month: "long" };
		const formattedMonth = nextMonth.toLocaleDateString(undefined, options);

		months.push({
			month: formattedMonth,
			year: nextMonth.getFullYear(),
			value: nextMonth.getMonth(),
		});
	}

	return months;
};

export const getDateRanges = (
	month?: number,
	currentDate = new Date(),
): Array<{ week: string; day: number }> => {
	const startDate =
		month && currentDate.getMonth() !== month
			? new Date(currentDate.getFullYear(), month, 1)
			: currentDate;

	const lastDayOfMonth = new Date(
		startDate.getFullYear(),
		startDate.getMonth() + 1,
		1,
	);
	const dateRanges = [];

	// eslint-disable-next-line no-unmodified-loop-condition
	while (startDate < lastDayOfMonth) {
		const dayOfWeek = new Intl.DateTimeFormat("en-US", {
			weekday: "short",
		}).format(startDate);
		const dayOfMonth = startDate.getDate();

		if (dayOfWeek !== "Sun")
			dateRanges.push({ week: dayOfWeek, day: dayOfMonth });

		// Move to the next day
		startDate.setDate(dayOfMonth + 1);
	}

	return dateRanges;
};

export const getTimeRanges = (
	month?: number,
	day?: number,
	currentDate = new Date(),
): Array<{ time: string; value: Date }> => {
	const now = new Date();
	month = month === undefined ? now.getMonth() : month;
	day = day === undefined ? now.getDate() : day;

	const timeRanges = [];
	let currentHour =
		now.getDate() === day && now.getMonth() === month
			? Math.max(now.getHours() + 1, 8)
			: 8;

	const endTime = 16;

	const year =
		month >= now.getMonth() ? now.getFullYear() : now.getFullYear() + 1;

	while (currentHour <= endTime) {
		const date = new Date(year, month, day);
		const hour12 = currentHour > 12 ? currentHour - 12 : currentHour;
		const hour = currentHour < 10 ? `0${currentHour}` : `${hour12}`;
		date.setHours(currentHour);
		if (currentHour >= 12) {
			timeRanges.push({ time: `${hour}:00 PM`, value: date });
		} else {
			timeRanges.push({ time: `${hour}:00 AM`, value: date });
		}
		currentHour++;
	}

	return timeRanges;
};

export const getUniqueDates = (array: Date[]): Date[] => {
	const map: Record<string, boolean> = {};
	const result = [];
	for (const item of array) {
		if (!map[item.toISOString()]) {
			map[item.toISOString()] = true;
			result.push(item);
		}
	}

	return result;
};

// helper functions to compare dates
export const includesDate = (
	array: Date[] | undefined,
	date: Date,
): boolean => {
	if (array === undefined) return false;
	for (const item of array) {
		const dateString = item.toISOString
			? item.toISOString()
			: new Date(item).toISOString();
		if (dateString === date.toISOString()) return true;
	}

	return false;
};

export const removeDate = (array: Date[], date: Date): Date[] => {
	const result = [];
	for (const item of array) {
		if (item.toISOString() === date.toISOString()) continue;
		result.push(item);
	}
	return result;
};

export const capitalizeFirstLetter = (sentence: string): string => {
	return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export const processResponse = (response: any): void => {
	if (process.env.NODE_ENV !== "production") console.log(response);
	if (response?.status === 400 || response?.status === 500)
		throw new Error(response.message);
};

export const processError = (err: any): void => {
	if (process.env.NODE_ENV !== "production") console.log(err);
	let messages = err?.data?.message || err.message || [];
	messages = (Array.isArray(messages) ? messages : [messages]) || [];
	messages.forEach((message: string) => toast(capitalizeFirstLetter(message)));
	if (messages.length === 0)
		toast("An unknown error occurred! Please try later");
};

export const formatTime = (date: Date): string => {
	const options: LocaleTimeOptions = {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

export const groupSlotsByDate = (
	slotsArray: Slot[] | undefined,
	today = new Date(),
): Array<[string, Slot[]]> => {
	if (slotsArray === undefined) return [];
	const slotGroups: Record<string, Slot[]> = {};

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	slotsArray.sort(
		(a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
	);
	for (const slot of slotsArray) {
		const inputDate = new Date(slot.time);
		const slotKey =
			today.getFullYear() === inputDate.getFullYear() &&
			today.getMonth() === inputDate.getMonth() &&
			today.getDate() === inputDate.getDate()
				? "Today"
				: new Intl.DateTimeFormat("en-US", options).format(inputDate);
		if (!slotGroups[slotKey]) {
			slotGroups[slotKey] = [];
		}
		slotGroups[slotKey].push(slot);
	}

	return Object.entries(slotGroups);
};
