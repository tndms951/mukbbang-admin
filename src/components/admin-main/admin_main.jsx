import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from './footer/footer';
import MainSidebar from './sidebar/sidebar_main';
import Header from './header/header';

import Content from './main_content';
import BreadHouseList from './contents/bread-house-list/bread_house_list';
import BreadRouter from './contents/bread-list/bread_router';
import BreadBossRouter from './contents/bread-boss-list/bread_boss_router';
import YoutubeRouter from './contents/youtube/youtube_router';
import NoticeRouter from './contents/notice/notice_router';
import EventRouter from './contents/event/event_router';

function AdminMain() {
  return (
    <>
      <div className="h-100">
        <div className="color-switcher animated">
          <h5>Accent Color</h5>
          <ul className="accent-colors">
            <li className="accent-primary active" data-color="primary">
              {' '}
              <i className="material-icons">check</i>
            </li>
            <li className="accent-secondary" data-color="secondary">
              <i className="material-icons">check</i>
            </li>
            <li className="accent-success" data-color="success">
              <i className="material-icons">check</i>
            </li>
            <li className="accent-info" data-color="info">
              <i className="material-icons">check</i>
            </li>
            <li className="accent-warning" data-color="warning">
              <i className="material-icons">check</i>
            </li>
            <li className="accent-danger" data-color="danger">
              <i className="material-icons">check</i>
            </li>
          </ul>
          <div className="actions mb-4">
            <div className="mb-2 btn btn-sm btn-primary w-100 d-table mx-auto extra-action">
              <i className="material-icons">cloud</i> Download
            </div>
            <div className="mb-2 btn btn-sm btn-white w-100 d-table mx-auto extra-action">
              <i className="material-icons">book</i> Documentation
            </div>
          </div>
          <div className="social-wrapper">
            <div className="social-actions">
              <h5 className="my-2">Help us Grow</h5>
              <div className="inner-wrapper">
                <div
                  className="github-button"
                  data-icon="octicon-star"
                  data-show-count="true"
                  aria-label="Star DesignRevision/shards-dashboard on GitHub">
                  Star
                </div>
                {/* <iframe style="width: 91px; height: 21px;"src="https://yvoschaap.com/producthunt/counter.html#href=https%3A%2F%2Fwww.producthunt.com%2Fr%2Fp%2F112998&layout=wide" width="56" height="65" scrolling="no" frameborder="0" allowtransparency="true"></iframe> --> */}
              </div>
            </div>
            <div
              id="social-share"
              data-url="https://designrevision.com/downloads/shards-dashboard-lite/"
              data-text="🔥 Check out Shards Dashboard Lite, a free and beautiful Bootstrap 4 admin dashboard template!"
              data-title="share"
            />
            <div className="loading-overlay">
              <div className="spinner" />
            </div>
          </div>
          <div className="close">
            <i className="material-icons">close</i>
          </div>
        </div>
        <div className="color-switcher-toggle animated pulse infinite">
          <i className="material-icons">settings</i>
        </div>
        <div className="container-fluid">
          <div className="row">
            <MainSidebar />
            <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
              <Header />
              <Switch>
                <Route exact path="/" component={Content} />
                <Route path="/bread_house_list" component={BreadHouseList} />
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
        <div className="promo-popup animated">
          <div className="pp-cta extra-action" />
          <img src="/" alt="" />
          <div className="pp-intro-bar">
            {' '}
            Need More Templates?
            <span className="close">
              <i className="material-icons">close</i>
            </span>
            <span className="up">
              <i className="material-icons">keyboard_arrow_up</i>
            </span>
          </div>
          <div className="pp-inner-content">
            <h2>Shards Dashboard Pro</h2>
            <p>A premium & modern Bootstrap 4 admin dashboard template pack.</p>
            <div className="pp-cta extra-action">Download</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMain;
