import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import ScrollToTop from './components/shared/scroll_to_top';
import Signin from './components/sign-in/signin_component';
import Signup from './components/sign-up/signup_component';

import AdminMain from './components/admin-main/admin_main';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={AdminMain} />
        <Route path="/login" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
