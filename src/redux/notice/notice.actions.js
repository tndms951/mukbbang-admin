import NoticeActionTypes from "./notice.types";

export const setNoticeList = (list) => ({
    type: NoticeActionTypes.SET_NOTICE_LIST,
    payload: {
      list,
    },
});
