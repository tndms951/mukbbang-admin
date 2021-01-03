import NoticeActionTypes from './notice.types';

// eslint-disable-next-line import/prefer-default-export
export const setNoticeList = (list) => ({
  type: NoticeActionTypes.SET_NOTICE_LIST,
  payload: {
    list
  }
});
