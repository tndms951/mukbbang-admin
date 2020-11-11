import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  token: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER: {
      const { user, token } = action.payload;
      window.localStorage.setItem('token', token);
      return {
        ...state,
        currentUser: user,
        token,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
