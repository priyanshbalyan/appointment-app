import React, { type ReactNode } from "react";
import { type RenderOptions, render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import categoriesReducer from "features/categories/categoriesSlice";
import { type RootState } from "app/store";

interface RenderWithProvidersOptions {
  preloadedState?: RootState;
  store?: ReturnType<typeof configureStore>;
  renderOptions?: RenderOptions<any, any, any>;
}

export const initialState: RootState = {
  auth: {
    user: null,
    token: '',
  },
  slot: {
    slots: []
  }
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
        // categoryState: categoriesReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }): React.ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
