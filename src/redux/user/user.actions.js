import UserActionTypes from './user.types';

// eslint-disable-next-line import/prefer-default-export

// user정보
export const setCurrentUser = (user, token) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: {
    user,
    token
  }
});

// 로그아웃
export const setLogout = () => ({
  type: UserActionTypes.SET_LOGOUT
});
