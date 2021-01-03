import { createSelector } from 'reselect'; // reselet는 부분만 렌더 (성능 최적화)

const selectUser = (state) => state.user;

// eslint-disable-next-line import/prefer-default-export
export const selectUserInfo = createSelector([selectUser], (user) => user.currentUser);
