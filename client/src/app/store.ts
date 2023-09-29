import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import slotsReducer from "features/booking/slotsSlice";
import { authApi } from "app/services/authApi";
import { slotApi } from "app/services/slotsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slot: slotsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [slotApi.reducerPath]: slotApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, slotApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch);
