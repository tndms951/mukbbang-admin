import EventListTypes from './event.types';

const INITIAL_STATE = {
    currentEvent: null,
    token: '',
};

const eventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EventListTypes.SET_CUTTENT_EVENT: {
            const { list } = action.payload;
            window.localStorage.setItem('list', list);
            return {
                ...state,
                currentEvent: list, 
            }
        }
        default:
            return state;
    }
};

export default eventReducer;