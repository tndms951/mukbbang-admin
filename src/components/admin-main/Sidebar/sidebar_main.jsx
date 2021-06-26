import React from 'react';
import { Link } from 'react-router-dom';

const MainSidebar = () => (
  <>
    <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
      <div className="main-navbar">
        <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
          <Link
            to="/"
            className="navbar-brand w-100 mr-0"
            style={{
              lineHeight: '25px'
            }}>
            <div className="d-table m-auto">
              {/* <img
                        id="main-logo"
                        className="d-inline-block align-top mr-1"
                        style={{
                          maxWidth: '25px',
                        }}
                        src="images/shards-dashboards-logo.svg"
                        alt="Shards Dashboard"
                      /> */}
              <span className="d-none d-md-inline ml-1">MEOK-PPANG</span>
            </div>
          </Link>
          <div className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
            <i className="material-icons">&#xE5C4;</i>
          </div>
        </nav>
      </div>
      <form
        action="#"
        className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
        <div className="input-group input-group-seamless ml-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-search" />
            </div>
          </div>
          <input
            className="navbar-search form-control"
            type="text"
            placeholder="Search for something..."
            aria-label="Search"
          />
        </div>
      </form>
      <div className="nav-wrapper">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              <i className="material-icons">supervisor_account</i>
              <span>메인 목록</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bread_house_list" className="nav-link">
              <i className="material-icons">home</i>
              <span>빵집 목록</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bread_list" className="nav-link">
              <i className="material-icons">cake</i>
              <span>빵 목록</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bread_boss_list" className="nav-link">
              <i className="material-icons">date_range</i>
              <span>빵집 사장 목록</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/youtube_list" className="nav-link">
              <i className="material-icons">video_library</i>
              <span>유튜브 목록</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/event" className="nav-link">
              <i className="material-icons">event_note</i>
              <span>이벤트 목록</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/notice" className="nav-link">
              <i className="material-icons">announcement</i>
              <span>공지사항 목록</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  </>
);

export default MainSidebar;
