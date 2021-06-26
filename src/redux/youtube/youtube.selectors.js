/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect'; // reselet는 부분만 렌더 (성능 최적화)

const selectYoutube = (state) => state.youtube;

export const selectYoutubeList = createSelector([selectYoutube], (youtube) => youtube.youtubeList);
