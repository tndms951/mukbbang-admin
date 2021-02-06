import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';
import noticeReducer from './notice/notice.reducer';
import breadBossReducer from './bread-boss/breadBoss.reducer';
import breadHouseReducer from './bread-house/breadHouse.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notice: noticeReducer,
  breadBoss: breadBossReducer,
  breadHouse: breadHouseReducer,
  event: eventReducer
});

export default rootReducer;
