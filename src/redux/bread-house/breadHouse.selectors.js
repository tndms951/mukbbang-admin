/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const selectBreadHouse = (state) => state.breadHouse;

export const selectBreadHouseList = createSelector(
  [selectBreadHouse],
  (breadHouse) => breadHouse.currentList
);
