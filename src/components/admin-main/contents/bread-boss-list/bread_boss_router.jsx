import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import BreadBossList from './bread_boss_list';
import BreadBossRegister from './bread-boss-register/bread_boss_register';
import BreadBossDetail from './bread-boss-detail/bread_boss_detail';

function BreadBossRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}/register`} component={BreadBossRegister} />
      <Route path={`${match.path}/bread_boss_detail/:bossId`} component={BreadBossDetail} />
      <Route exact path={match.path} component={BreadBossList} />
    </Switch>
  );
}

BreadBossRouter.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
};

export default BreadBossRouter;
