import { createSelector } from 'reselect'; // reselet는 부분만 렌더 (성능 최적화)

const selectNotice = (state) => state.notice;

// eslint-disable-next-line import/prefer-default-export
export const selectNoticeList = createSelector([selectNotice], (notice) => notice.currentList);
