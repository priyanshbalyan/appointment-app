import React, { type ReactNode } from "react";
import { type RenderOptions, render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { type RootState } from "app/store";
import authReducer from "features/auth/authSlice";
import slotsReducer from "features/booking/slotsSlice";
import { authApi } from "app/services/authApi";
import { slotApi } from "app/services/slotsApi";
interface RenderWithProvidersOptions {
	preloadedState?: RootState;
	store?: any;
	renderOptions?: RenderOptions<any, any, any>;
}

export const initialState: RootState = {
	auth: {
		user: null,
		token: "",
	},
	slot: {
		slots: [],
	},
} as unknown as RootState;

/**
 *
 * @param ui Element to create a test wrapper around
 * @param param1 Extra props to pass to render function or store
 * @returns Testing element wrapped with a store
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function renderWithProviders(
	ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
	{
		preloadedState = initialState,
		// Automatically create a store instance if no store was passed in
		store = configureStore({
			reducer: {
				auth: authReducer,
				slot: slotsReducer,
				[authApi.reducerPath]: authApi.reducer,
				[slotApi.reducerPath]: slotApi.reducer,
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().concat(authApi.middleware, slotApi.middleware),
			preloadedState,
		}),
		...renderOptions
	}: RenderWithProvidersOptions = {},
) {
	function Wrapper({ children }: { children: ReactNode }): React.ReactElement {
		return <Provider store={store}>{children}</Provider>;
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
