import { type RootState } from "app/store";
import { type Slot } from "common/types";
import slotsReducer, {
	setSlots,
	setDoctors,
	setSelectedDoctor,
	selectSlots,
	selectDoctors,
	selectedDoctor,
} from "features/booking/slotsSlice";

describe("slotsSlice reducer", () => {
	it("should handle setting slots", () => {
		const initialState = { slots: [], doctors: [], selectedDoctor: null };
		const slots = [
			{ id: 1, time: "9:00 AM" },
			{ id: 2, time: "10:00 AM" },
		] as unknown as Slot[];
		const newState = slotsReducer(initialState, setSlots(slots));

		expect(newState.slots).toEqual(slots);
	});

	it("should handle setting doctors", () => {
		const initialState = { slots: [], doctors: [], selectedDoctor: null };
		const doctors = [
			{ id: 1, name: "Dr. Smith", specialisation: "Cardiologist" },
			{ id: 2, name: "Dr. Johnson", specialisation: "Eye Specialist" },
		];

		const newState = slotsReducer(initialState, setDoctors(doctors));

		expect(newState.doctors).toEqual(doctors);
	});

	it("should handle setting selected doctor", () => {
		const initialState = { slots: [], doctors: [], selectedDoctor: null };
		const doctor = { id: 1, name: "Dr. Smith", specialisation: "Cardiologist" };

		const newState = slotsReducer(initialState, setSelectedDoctor(doctor));

		expect(newState.selectedDoctor).toEqual(doctor);
	});
});

describe("slotsSlice selectors", () => {
	it("should select slots", () => {
		const state = {
			slot: { slots: [{ id: 1, time: "9:00 AM" }] },
		} as unknown as RootState;

		const selectedSlots = selectSlots(state);

		expect(selectedSlots).toEqual([{ id: 1, time: "9:00 AM" }]);
	});

	it("should select doctors", () => {
		const state = {
			slot: { doctors: [{ id: 1, name: "Dr. Smith" }] },
		} as unknown as RootState;

		const selectedDoctors = selectDoctors(state);

		expect(selectedDoctors).toEqual([{ id: 1, name: "Dr. Smith" }]);
	});

	it("should select selected doctor", () => {
		const state = {
			slot: { selectedDoctor: { id: 1, name: "Dr. Smith" } },
		} as unknown as RootState;

		const doctor = selectedDoctor(state);

		expect(doctor).toEqual({ id: 1, name: "Dr. Smith" });
	});
});
