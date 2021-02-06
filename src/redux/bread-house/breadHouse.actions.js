import BreadHouseActionTypes from './breadHouse.types';

export const setBreadHouseList = (list) => ({
  type: BreadHouseActionTypes.SET_BREADHOUSE_LIST,
  payload: {
    list
  }
});
