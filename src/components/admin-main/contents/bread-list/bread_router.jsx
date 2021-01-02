import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BreadList from './bread_list';
import BreadRegister from './bread-register/bread_register';
import BreadDetail from './bread-detail/bread_detail';

const BreadRouter = ({ match }) => {
  console.log('aaa');
  return (
    <>
      <Switch>
        <Route path={`${match.path}/bread_register`} component={BreadRegister} />
        <Route path={`${match.path}/detail/:breadId`} component={BreadDetail} />
        <Route exact path={match.path} component={BreadList} />
      </Switch>
    </>
  );
};
export default BreadRouter;
