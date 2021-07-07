import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from './Footer/footer';
import MainSidebar from './Sidebar/sidebar_main';
import Header from './Header/header';

import Content from './main_content';
import BreadHouseRouter from './contents/bread-house-list/bread_house_router';
import BreadRouter from './contents/bread-list/bread_router';
import BreadBossRouter from './contents/bread-boss-list/bread_boss_router';
import YoutubeRouter from './contents/youtube/youtube_router';
import NoticeRouter from './contents/notice/notice_router';
import EventRouter from './contents/event/event_router';

import UserCheckHOC from '../shared/user.HOC';

function AdminMain() {
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

export default UserCheckHOC(AdminMain);
