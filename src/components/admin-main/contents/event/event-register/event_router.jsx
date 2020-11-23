import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Resgister from './event_register';
import EventList from '../event_list';

const EventRouter = (props) => {
  console.log(props);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={EventList} />
          <Route exact path="/register" component={Resgister} />
        </Switch>
      </Router>
    </>
  );
};

export default EventRouter;
