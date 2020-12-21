import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';
import noticeReducer from './notice/notice.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notice: noticeReducer,
  event: eventReducer
});

export default rootReducer;
