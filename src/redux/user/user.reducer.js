import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  token: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER: {
      const { user, token } = action.payload;
      window.localStorage.setItem('token', token);
      // 웹에 토큰 값을 저장하기 위해서 사용.
      return {
        ...state,
        currentUser: user,
        token
      };
    }
    default:
      return state;
  }
};

export default userReducer;
