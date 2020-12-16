import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import noticeReducer from './notice/notice.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notice: noticeReducer
});

export default rootReducer;
