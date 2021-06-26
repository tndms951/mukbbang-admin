import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import ScrollToTop from './components/shared/scroll_to_top';
import Signin from './components/sign-in/signin_component';
import Signup from './components/sign-up/signup_component';
import AdminMain from './components/admin-main/admin_main';
import { setCurrentUser } from './redux/user/user.actions';
import axios, { setAuthorization } from './components/utils/axios';
import './App.css';
import { errorhandler } from './components/utils/common';

function App({ onUserData }) {
  useLayoutEffect(() => {
    const bringUserToken = localStorage.getItem('token');

    async function userTokenData() {
      try {
        setAuthorization(bringUserToken);
        const { status, data } = await axios.get('/admin/current');
        if (status === 200) {
          onUserData(data.data, bringUserToken);
        }
      } catch (err) {
        errorhandler(err);
      }
    }

    if (bringUserToken) {
      userTokenData();
    }
  }, [onUserData]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={AdminMain} />
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  onUserData: PropTypes.func.isRequired
};
const userDispathchToProps = (dispatch) => ({
  onUserData: (user, token) => dispatch(setCurrentUser(user, token))
});

export default connect(null, userDispathchToProps)(App);
