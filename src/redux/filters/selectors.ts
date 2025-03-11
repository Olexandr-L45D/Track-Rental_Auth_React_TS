import { createSelector } from "reselect";
import { RootState } from "../store";
import { Truck } from "../../components/App/App.types";

export const selectTrucks = (state: RootState) => state.campers.items;

export const selectFilters = (state: RootState) => state.filters.filters;

export const selectLocation = (state: RootState) =>
  state.filters.filters.location;

export const selectFilteredByLocation = createSelector(
  [selectTrucks, selectFilters],
  (trucks, filters) => {
    if (!filters || !filters.location) return trucks;

    return trucks
      .filter((truck): truck is Truck => "location" in truck) // Фільтруємо тільки Truck
      .filter(truck =>
        truck.location.toLowerCase().includes(filters.location.toLowerCase())
      );
  }
);
// export const selectFilteredByLocation = createSelector(
//   [selectTrucks, selectFilters],
//   (trucks, filters) => {
//     if (!filters || !filters.location) return trucks;

//     return trucks.filter(truck =>
//       truck.location.toLowerCase().includes(filters.location.toLowerCase())
//     );
//   }
// );
