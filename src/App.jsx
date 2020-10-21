import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Signin from './components/sign-in/signin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Signin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
