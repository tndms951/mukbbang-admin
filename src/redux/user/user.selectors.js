import { createSelector } from 'reselect';

const selecUser = {state} => state.user;

export const selectUserInfo = createSelector([selectUser], (user) => user.userInfo