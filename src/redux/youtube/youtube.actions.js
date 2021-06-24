/* eslint-disable import/prefer-default-export */
import YoutubeListTypes from './youtube.types';

export const setCurrentYoutube = (list) => ({
  type: YoutubeListTypes.SET_CUTTENT_YOUTUBE,
  payload: {
    list
  }
});
