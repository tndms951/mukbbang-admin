import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NoticeList from './notice_list';
import NoticeResister from './notice-register/notice_register';
import NoticeDetail from './notice-detail/notice_detail';

function noticeRouter({ match }) {
  // console.log(match);
  return (
    <Switch>
      <Route path={`${match.path}/notice_register`} component={NoticeResister} />
      <Route path={`${match.path}/notice_detail/:id`} component={NoticeDetail} />
      <Route exact path={match.path} component={NoticeList} />
    </Switch>
  );
}

export default noticeRouter;
