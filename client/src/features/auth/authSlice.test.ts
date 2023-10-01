import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
	setCredentials,
	logout,
	selectAuth,
} from "features/auth/authSlice";
import { type RootState } from "app/store";

describe("authSlice", () => {
	let store = configureStore({
		reducer: {
			auth: authReducer,
		},
	});

	beforeEach(() => {
		store = configureStore({
			reducer: {
				auth: authReducer,
			},
		});
	});

	it("should set credentials and update the state", () => {
		const accessToken = "myAccessToken";

		store.dispatch(setCredentials({ accessToken }));

		const state = store.getState().auth;
		expect(state.token).toEqual(accessToken);
		expect(localStorage.getItem("token")).toEqual(accessToken);
	});

	it("should logout and clear the state", () => {
		// First, set some credentials
		store.dispatch(setCredentials({ accessToken: "myAccessToken" }));

		store.dispatch(logout());

		const state = store.getState().auth;
		expect(state.token).toBeNull();
		expect(localStorage.getItem("token")).toBeNull();
	});

	it("should select auth state", () => {
		const authState = {
			token: "myAccessToken",
		};

		const state = {
			auth: authState,
		};

		const selectedAuth = selectAuth(state as RootState);

		expect(selectedAuth).toEqual(authState);
	});
});
