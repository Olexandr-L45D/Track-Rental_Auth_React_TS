import { RootState } from "../store"; // Шлях до store.ts
import { createSelector } from "reselect";
import { Truck } from "./slice";

export const selectLoading = (state: RootState) => state.campers.loading;
// export const selectFilter = (state: RootState) => state.campers.filter;
export const selectFilter = (state: RootState) => state.filters.filters;

export const selectError = (state: RootState)=> state.campers.error;

export const selectTrucs = (state: RootState) => state.campers.items;

export const selectPage = (state: RootState) => state.campers.page;

// export const selectLocation = (state: RootState) => state.filters.filters.location; поки не використовую

// Селектор для відфільтрованих вантажівок
export const selectOutCampers = createSelector(
  [selectTrucs, (state: RootState) => state.filters.filters],
  (trucks, filters) => {
    if (!filters || !filters.location) return trucks;

    return trucks.filter((truck: Truck) =>
      truck.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
);

// export const selectOutCampers = createSelector(
//   [selectTrucs, (state: RootState) => state.filters.filters],
//   (campers, filters) => {
//     if (!filters || !filters.location) return campers;

//     return campers.filter(camper =>
//       camper.location.toLowerCase().includes(filters.location.toLowerCase())
//     );
//   }
// );


