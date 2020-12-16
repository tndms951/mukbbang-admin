import NoticeActionTypes from './notice.types';

const INITIAL_STATE = {
  currentList: []
};

const noticereducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NoticeActionTypes.SET_NOTICE_LIST: {
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

export default noticereducer;
