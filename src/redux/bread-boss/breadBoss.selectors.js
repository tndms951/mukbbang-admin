import { createSelector } from 'reselect'; // reselet는 부분만 렌더 (성능 최적화)

const selectBreadBoss = (state) => state.breadBoss;
// console.log(state);

export const selectBreadBossList = createSelector(
  [selectBreadBoss],
  (breadBoss) => breadBoss.currentList
);
