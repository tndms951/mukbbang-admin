import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BreadHouseList from './bread_house_list';
import BreadHouseRegister from './bread-house-register/bread_house_register';
import BreadHouseDetail from './bread-house-detail/bread_house_detail';

function BreadHouseRouter({ match }) {
  // console.log(match);
  return (
    <Switch>
      <Route path="/bread_house_list/bread_house_register" component={BreadHouseRegister} />
      <Route path="/bread_house_list/bread_house_detail" component={BreadHouseDetail} />
      <Route exact path="/bread_house_list" component={BreadHouseList} />
    </Switch>
  );
}

export default BreadHouseRouter;
