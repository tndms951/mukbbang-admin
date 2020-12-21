import { createSelector } from 'reselect'; // reselet는 부분만 렌더 (성능 최적화)

// es6 문법
const selectEvent = (state) => state.event;

export const selectEventList = createSelector([selectEvent], (event) => event.eventList);
// const selectEventList = (state) => {
//     console.log(state);
//     return state.event;
// }
// export const selectEventList = createSelector([selectEvent], (event) => {
//     console.log(event);
//     return event.list
// })
