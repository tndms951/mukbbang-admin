import BreadHouseActionTypes from './breadHouse.types';

const INITIAL_STATE = {
  currentList: []
};

const BreadHouseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BreadHouseActionTypes.SET_BREADHOUSE_LIST: {
      const { list } = action.payload;
      return {
        ...state,
        currentList: list
      };
    }
    default:
      return state;
  }
};

export default BreadHouseReducer;
