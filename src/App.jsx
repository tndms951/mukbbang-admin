import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import ScrollToTop from './components/shared/scroll_to_top';
import Signin from './components/sign-in/signin_component';
import Signup from './components/sign-up/signup_component';
import AdminMain from './components/admin-main/admin_main';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route path='/' component={AdminMain} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
