import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Resgister from './event-register/event_register';
import Detail from './event-detail/event_detail';
import EventList from './event_list';

function EventRouter({ match }) {
  return (
    <>
      <Switch>
        <Route path={`${match.path}/event_register`} component={Resgister} />
        <Route path={`${match.path}/event_detail/:eventId`} component={Detail} />
        <Route exact path={match.path} component={EventList} />
      </Switch>
    </>
  );
}

EventRouter.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
};

export default EventRouter;
