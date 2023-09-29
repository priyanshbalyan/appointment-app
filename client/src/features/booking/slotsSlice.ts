/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";
import { type Slot, type Doctor } from "common/types";

interface SlotsState {
	slots: Slot[];
	doctors: Doctor[];
	selectedDoctor: Doctor | null;
}

const slice = createSlice({
	name: "slots",
	initialState: { slots: [], doctors: [], selectedDoctor: null } as SlotsState,
	reducers: {
		setSlots: (state, { payload }: PayloadAction<Slot[]>) => {
			state.slots = payload;
		},
		setDoctors: (state, { payload }: PayloadAction<Doctor[]>) => {
			state.doctors = payload;
		},
		setSelectedDoctor: (state, { payload }: PayloadAction<Doctor | null>) => {
			state.selectedDoctor = payload;
		},
	},
});

export const { setSlots, setDoctors, setSelectedDoctor } = slice.actions;

export default slice.reducer;

export const selectSlots = (state: RootState): Slot[] => state.slot.slots;
export const selectDoctors = (state: RootState): Doctor[] => state.slot.doctors;
export const selectedDoctor = (state: RootState): Doctor | null =>
	state.slot.selectedDoctor;
