import YoutubeListTypes from './youtube.types';

const INITIAL_STATE = {
  youtubeList: []
};

const youtubeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case YoutubeListTypes.SET_CUTTENT_YOUTUBE: {
      const { list } = action.payload;

      return {
        ...state,
        youtubeList: list
      };
    }
    default:
      return state;
  }
};

export default youtubeReducer;
