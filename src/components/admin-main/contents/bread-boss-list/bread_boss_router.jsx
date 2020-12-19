import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BreadBossList from './bread_boss_list';
import BreadBossRegister from './bread-boss-register/bread_boss_register';
import BreadBossDetail from './bread-boss-detail/bread_boss_detail';

function BreadBossRouter({ match }) {
  console.log(match);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/bread_boss_list/register" component={BreadBossRegister} />
        <Route path="/bread_boss_list/bread_boss_detail" component={BreadBossDetail} />
        <Route exact path="/bread_boss_list" component={BreadBossList} />
      </Switch>
    </BrowserRouter>
  );
}

export default BreadBossRouter;
