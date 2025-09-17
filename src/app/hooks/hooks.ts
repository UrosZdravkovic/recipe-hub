import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Custom hook za dispatch sa tipizacijom
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook za selector sa tipizacijom
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



