import EventListTypes from './event.types';
// es6 문법
// eslint-disable-next-line import/prefer-default-export
export const setCurrentEvent = (list) => ({
  type: EventListTypes.SET_CUTTENT_EVENT,
  payload: {
    list
  }
});

/*
export const setCurrentEvent = (list) => {
  console.log를 찍으려면 이렇게 바꿔야한다
    console.log(list);
    return {
    type: EventListTypes.SET_CUTTENT_EVENT,
    payload: {
        list
    },

    }
}
*/
