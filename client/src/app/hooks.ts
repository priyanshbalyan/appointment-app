import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import type { RootState, AppDispatch } from 'app/store';
import {
  type ThunkDispatch,
  type AnyAction,
  type Dispatch,
} from '@reduxjs/toolkit';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): ThunkDispatch<
  { state: RootState },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
