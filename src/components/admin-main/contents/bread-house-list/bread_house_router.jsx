import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import BreadHouseList from './bread_house_list';
import BreadHouseRegister from './bread-house-register/bread_house_register';
import BreadHouseDetail from './bread-house-detail/bread_house_detail';

function BreadHouseRouter({ match }) {
  console.log(match);
  return (
    <Switch>
      <Route path={`${match.path}/bread_house_register`} component={BreadHouseRegister} />
      <Route path={`${match.path}/bread_house_detail/:houseId`} component={BreadHouseDetail} />
      <Route exact path={match.path} component={BreadHouseList} />
    </Switch>
  );
}

BreadHouseRouter.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
};

export default BreadHouseRouter;
