import EventListTypes from './event.types';


// es6 문법
export const setCurrentEvent = (list) => ({
  type: EventListTypes.SET_CUTTENT_EVENT,
  payload: {
      list,
  },
})



//console.log를 찍으려면 이렇게 바꿔야한다
// export const setCurrentEvent = (list) => {
//     console.log(list);
//     return {
//     type: EventListTypes.SET_CUTTENT_EVENT,
//     payload: {
//         list
//     },
    
//     }
// }