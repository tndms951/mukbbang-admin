import { createSelector } from 'reselect'; // reselet는 부분만 렌더 (성능 최적화)

const selectUser = (state) => state.user;

export const selectUserInfo = createSelector([selectUser], (user) => user.currentUser);
