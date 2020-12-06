import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  event: eventReducer
});

export default rootReducer;
