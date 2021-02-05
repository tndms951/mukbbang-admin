import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';
import noticeReducer from './notice/notice.reducer';
import breadBossReducer from './bread-boss/breadBoss.reducer';
import youtubeReducer from './youtube/youtube.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notice: noticeReducer,
  breadBoss: breadBossReducer,
  event: eventReducer,
  youtube: youtubeReducer
});

export default rootReducer;
