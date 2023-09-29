/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";
import { type User } from "common/types";

interface AuthState {
	user: User | null;
	token: string | null;
}

const slice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: localStorage.getItem("token"),
	} as AuthState,
	reducers: {
		setCredentials: (
			state,
			{ payload: { accessToken } }: PayloadAction<{ accessToken: string }>,
		) => {
			localStorage.setItem("token", accessToken);
			state.token = accessToken;
		},
		logout: (state) => {
			localStorage.clear();
			state.token = null;
		},
	},
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState): User | null =>
	state.auth.user;
