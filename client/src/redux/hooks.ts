import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch, AppThunkDispatch } from './types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useThunkDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;