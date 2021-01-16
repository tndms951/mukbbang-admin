import BreadBossActionTypes from './breadBoss.types';

const INITIAL_STATE = {
  currentList: []
};

const BreadbossReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BreadBossActionTypes.SET_BREADBOSS_LIST: {
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

export default BreadbossReducer;
