import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import noticeReducer from './notice/notice.reducer';
import breadBossReducer from './bread-boss/breadBoss.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notice: noticeReducer,
  breadBoss: breadBossReducer
});

export default rootReducer;
