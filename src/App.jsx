import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Signin from './components/sign-in/signin.component';
import Signup from './components/sign-up/signup.component';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
