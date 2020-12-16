import { createSelector } from 'reselect'; // reselet는 부분만 렌더 (성능 최적화)

const selectNotice = (state) => state.notice;

export const selectNoticeList = createSelector([selectNotice], (notice) => notice.currentList)