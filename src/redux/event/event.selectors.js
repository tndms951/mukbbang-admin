import {createSelector} from 'reselect'

//es6 문법
const selectEvent = (state) => state.event;

export const selectEventList = createSelector([selectEvent], (event) => event.currentEvent);


// const selectEventList = (state) => {
//     console.log(state);
//     return state.event;
// }
// export const selectEvent = createSelector([selectEventList], (event) => {
//     console.log(event);
//     return event.list
// })