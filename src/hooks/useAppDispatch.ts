import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store"; // Імпортуємо правильний тип

export const useAppDispatch: () => AppDispatch = useDispatch;
