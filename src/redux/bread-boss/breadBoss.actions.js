import BreadBossActionTypes from './breadBoss.types';

export const setBreadBossList = (list) => ({
  type: BreadBossActionTypes.SET_BREADBOSS_LIST,
  payload: {
    list
  }
});
