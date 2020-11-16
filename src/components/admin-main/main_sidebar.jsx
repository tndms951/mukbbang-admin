import React from 'react';

const Main_sidebar = () => {
    return(
        <>  
        <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
            <div className="main-navbar">
                <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
                  <a
                    className="navbar-brand w-100 mr-0"
                    href="/"
                    style={{
                      lineHeight: '25px',
                    }}
                  >
                    <div className="d-table m-auto">
                      <img
                        id="main-logo"
                        className="d-inline-block align-top mr-1"
                        style={{
                          maxWidth: '25px',
                        }}
                        src="images/shards-dashboards-logo.svg"
                        alt="Shards Dashboard"
                      />
                      <span className="d-none d-md-inline ml-1">Shards Dashboard</span>
                    </div>
                  </a>
                  <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                    <i className="material-icons">&#xE5C4;</i>
                  </a>
                </nav>
              </div>
              <form
                action="#"
                className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none"
              >
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
                    <a className="nav-link active" href="index.html">
                      <i className="material-icons">supervisor_account</i>
                      <span>회원 목록</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="components-blog-posts.html">
                      <i className="material-icons">home</i>
                      <span>빵집 목록</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="add-new-post.html">
                      <i className="material-icons">cake</i>
                      <span>빵 목록</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="form-components.html">
                      <i className="material-icons">video_library</i>
                      <span>유튜브 목록</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="tables.html">
                      <i className="material-icons">event_note</i>
                      <span>이벤트 목록</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="user-profile-lite.html">
                      <i className="material-icons">announcement</i>
                      <span>공지사항 목록</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="errors.html">
                      <i className="material-icons">date_range</i>
                      <span>메인 이벤트 목록</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
            </>
        )
      }

export default Main_sidebar;