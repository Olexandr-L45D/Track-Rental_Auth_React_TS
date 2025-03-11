import { Truck } from "../../components/App/App.types";
import { RootState } from "../store"; // Шлях до store.ts
import { createSelector } from "reselect";

export const selectLoading = (state: RootState) => state.campers.loading;

export const selectFilter = (state: RootState) => state.filters.filters;

export const selectError = (state: RootState) => state.campers.error;

export const selectTrucs = (state: RootState) => state.campers.items;

export const selectPage = (state: RootState) => state.campers.page;
