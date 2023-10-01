import { type Slot } from "common/types";
import {
	getNext3Months,
	getDateRanges,
	getTimeRanges,
	includesDate,
	removeDate,
	capitalizeFirstLetter,
	formatTime,
	groupSlotsByDate,
} from "utils";

describe("getNext3Months", () => {
	it("returns an array of the next 3 months with proper format", () => {
		const result = getNext3Months(new Date("2023-10-10"));

		expect(result).toHaveLength(4);

		const expected = [
			{ month: "October", value: 9, year: 2023 },
			{ month: "November", value: 10, year: 2023 },
			{ month: "December", value: 11, year: 2023 },
			{ month: "January", value: 0, year: 2024 },
		];
		expect(result).toEqual(expected);
	});
});

describe("getDateRanges", () => {
	it("returns an array of date ranges for a given month", () => {
		const dateRanges = getDateRanges(2, new Date("2023-10-10"));
		expect(dateRanges).toHaveLength(27);
	});
});

describe("getTimeRanges", () => {
	it("returns an array of time ranges for a given day", () => {
		const timeRanges = getTimeRanges(2, 15, new Date("2024-10-10"));
		expect(timeRanges).toHaveLength(9);
	});
});

describe("includesDate", () => {
	it("returns true if a date is included in the array", () => {
		const dates = [new Date("2023-01-01"), new Date("2023-02-01")];
		const dateToCheck = new Date("2023-01-01");
		expect(includesDate(dates, dateToCheck)).toBe(true);
	});

	it("returns false if a date is not included in the array", () => {
		const dates = [new Date("2023-01-01"), new Date("2023-02-01")];
		const dateToCheck = new Date("2023-03-01");
		expect(includesDate(dates, dateToCheck)).toBe(false);
	});
});

describe("removeDate", () => {
	it("removes a date from the array", () => {
		const date1 = new Date("2023-01-01");
		const date2 = new Date("2023-02-01");
		const date3 = new Date("2023-03-01");
		const dateToRemove = new Date("2023-02-01");
		const dateArray = [date1, date2, date3];

		const result = removeDate(dateArray, dateToRemove);

		expect(result).toHaveLength(2);
		expect(result).not.toContain(dateToRemove);

		expect(result).toContain(date1);
		expect(result).toContain(date3);
	});

	it("returns a new array without modifying the original", () => {
		const date1 = new Date("2023-01-01");
		const date2 = new Date("2023-02-01");
		const date3 = new Date("2023-03-01");
		const dateToRemove = new Date("2023-02-01");
		const dateArray = [date1, date2, date3];

		const result = removeDate(dateArray, dateToRemove);

		expect(dateArray).toHaveLength(3);
		expect(dateArray).toContain(date1);
		expect(dateArray).toContain(date2);
		expect(dateArray).toContain(date3);

		expect(result).not.toBe(dateArray);
	});

	it("handles an empty array", () => {
		const dateToRemove = new Date("2023-02-01");
		const result = removeDate([], dateToRemove);

		expect(result).toHaveLength(0);
	});

	it("handles a date not found in the array", () => {
		const date1 = new Date("2023-01-01");
		const date2 = new Date("2023-02-01");
		const date3 = new Date("2023-03-01");
		const dateToRemove = new Date("2023-04-01");
		const dateArray = [date1, date2, date3];

		const result = removeDate(dateArray, dateToRemove);

		expect(result).toHaveLength(3);
		expect(result).toEqual(dateArray);
	});
});

describe("capitalizeFirstLetter", () => {
	it("capitalizes the first letter of a sentence", () => {
		const input = "hello world";
		const result = capitalizeFirstLetter(input);

		expect(result).toEqual("Hello world");
	});

	it("handles an empty string", () => {
		const input = "";
		const result = capitalizeFirstLetter(input);

		expect(result).toEqual("");
	});
});

describe("formatTime", () => {
	it("formats a date with hours and minutes in 12-hour format", () => {
		const date = new Date("2023-01-01T14:30:00"); // 2:30 PM
		const result = formatTime(date);
		expect(result).toEqual("2:30 PM");
	});

	it("handles a date with midnight (12:00 AM)", () => {
		const date = new Date("2023-01-01T00:00:00");
		const result = formatTime(date);
		expect(result).toEqual("12:00 AM");
	});

	it("handles a date with noon (12:00 PM)", () => {
		const date = new Date("2023-01-01T12:00:00");
		const result = formatTime(date);
		expect(result).toEqual("12:00 PM");
	});

	it("handles a date with single-digit hour and minute", () => {
		const date = new Date("2023-01-01T09:05:00"); // 9:05 AM
		const result = formatTime(date);
		expect(result).toEqual("9:05 AM");
	});

	it("handles a date in a different time zone", () => {
		const date = new Date("2023-01-01T14:30:00Z"); // 2:30 PM UTC
		const result = formatTime(date);
		expect(result).toEqual("9:30 PM");
	});
});

describe("groupSlotsByDate", () => {
	it("groups slots by date and sorts them by date", () => {
		const today = new Date("2023-10-10");
		const yesterday = new Date("2023-10-10");
		yesterday.setDate(today.getDate() - 1);
		const tomorrow = new Date("2023-10-10");
		tomorrow.setDate(today.getDate() + 1);

		const slotsArray = [
			{ time: today.toISOString() },
			{ time: yesterday.toISOString() },
			{ time: tomorrow.toISOString() },
		] as unknown as Slot[];

		const result = groupSlotsByDate(slotsArray, today);
		const expected = [
			["October 9, 2023", [{ time: "2023-10-09T00:00:00.000Z" }]],
			["Today", [{ time: "2023-10-10T00:00:00.000Z" }]],
			["October 11, 2023", [{ time: "2023-10-11T00:00:00.000Z" }]],
		];
		expect(result).toHaveLength(3);
		expect(result).toEqual(expected);
	});

	it("handles an empty array", () => {
		const result = groupSlotsByDate([]);
		expect(result).toHaveLength(0);
	});

	it("handles undefined input", () => {
		const result = groupSlotsByDate(undefined);
		expect(result).toHaveLength(0);
	});
});
