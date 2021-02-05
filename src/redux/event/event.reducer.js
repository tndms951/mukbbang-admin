import EventListTypes from './event.types';

const INITIAL_STATE = {
  eventList: []
};
console.log(INITIAL_STATE.eventList);

const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventListTypes.SET_CUTTENT_EVENT: {
      const { list } = action.payload;
      console.log(list);
      return {
        ...state,
        eventList: list
      };
    }
    default:
      return state;
  }
};

export default eventReducer;
