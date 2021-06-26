import UserActionTypes from './user.types';
import { setAuthorizationReset } from '../../components/utils/axios';

const INITIAL_STATE = {
  currentUser: null,
  token: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER: {
      const { user, token } = action.payload;
      localStorage.setItem('token', token);
      return {
        ...state,
        currentUser: user,
        token
      };
    }
    case UserActionTypes.SET_LOGOUT: {
      localStorage.removeItem('token');
      setAuthorizationReset();
      return {
        ...state,
        currentUser: null,
        token: ''
      };
    }
    default:
      return state;
  }
};

export default userReducer;
