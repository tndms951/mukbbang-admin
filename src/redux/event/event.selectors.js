import { createSelector } from 'reselect'; // reselet는 부분만 렌더 (성능 최적화)

// es6 문법
const selectEvent = (state) => state.event;

/* eslint-disable import/prefer-default-export */
export const selectEventList = createSelector([selectEvent], (event) => event.eventList);
