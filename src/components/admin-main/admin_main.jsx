import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './footer/footer';
import MainSidebar from './sidebar/sidebar_main';
import Header from './header/header';

import Content from './main_content';
import BreadHouseRouter from './contents/bread-house-list/bread_house_router';
import BreadRouter from './contents/bread-list/bread_router';
import BreadBossRouter from './contents/bread-boss-list/bread_boss_router';
import YoutubeRouter from './contents/youtube/youtube_router';
import NoticeRouter from './contents/notice/notice_router';
import EventRouter from './contents/event/event_router';
import { errorhandler } from '../utils/common';
import { setCurrentUser } from '../../redux/user/user.actions';
import axios, { setAuthorization } from '../utils/axios';

function AdminMain({ onUserData }) {
  useEffect(() => {
    const bringUserToken = localStorage.getItem('user');
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
    <>
      <div className="h-100">
        <div className="container-fluid">
          <div className="row">
            <MainSidebar />
            <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
              <Header />
              <Switch>
                <Route exact path="/" component={Content} />
                <Route path="/bread_house_list" component={BreadHouseRouter} />
                <Route path="/bread_list" component={BreadRouter} />
                <Route path="/bread_boss_list" component={BreadBossRouter} />
                <Route path="/youtube_list" component={YoutubeRouter} />
                <Route path="/event" component={EventRouter} />
                <Route path="/notice" component={NoticeRouter} />
              </Switch>
              <Footer />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

AdminMain.propTypes = {
  onUserData: PropTypes.func.isRequired
};
const userDispathchToProps = (dispatch) => ({
  onUserData: (user, token) => dispatch(setCurrentUser(user, token))
});

export default connect(null, userDispathchToProps)(AdminMain);
