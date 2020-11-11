import React from 'react';

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
            <a
              className="mb-2 btn btn-sm btn-primary w-100 d-table mx-auto extra-action"
              href="https://designrevision.com/downloads/shards-dashboard-lite/"
            >
              <i className="material-icons">cloud</i> Download
            </a>
            <a
              className="mb-2 btn btn-sm btn-white w-100 d-table mx-auto extra-action"
              href="https://designrevision.com/docs/shards-dashboard-lite"
            >
              <i className="material-icons">book</i> Documentation
            </a>
          </div>
          <div className="social-wrapper">
            <div className="social-actions">
              <h5 className="my-2">Help us Grow</h5>
              <div className="inner-wrapper">
                <a
                  className="github-button"
                  href="https://github.com/DesignRevision/shards-dashboard"
                  data-icon="octicon-star"
                  data-show-count="true"
                  aria-label="Star DesignRevision/shards-dashboard on GitHub"
                >
                  Star
                </a>
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
            {/* <!-- Main Sidebar --> */}
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
            {/* <!-- End Main Sidebar --> */}
            <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
              <div className="main-navbar sticky-top bg-white">
                {/* <!-- Main Navbar --> */}
                <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
                  <form action="#" className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
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
                  <ul className="navbar-nav border-left flex-row ">
                    <li className="nav-item border-right dropdown notifications">
                      <a
                        className="nav-link nav-link-icon text-center"
                        href="/"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <div className="nav-link-icon__wrapper">
                          <i className="material-icons">&#xE7F4;</i>
                          <span className="badge badge-pill badge-danger">2</span>
                        </div>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-small"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a className="dropdown-item" href="/">
                          <div className="notification__icon-wrapper">
                            <div className="notification__icon">
                              <i className="material-icons">&#xE6E1;</i>
                            </div>
                          </div>
                          <div className="notification__content">
                            <span className="notification__category">Analytics</span>
                            <p>
                              Your website’s active users count increased by
                              <span className="text-success text-semibold">28%</span> in the last
                              week. Great job!
                            </p>
                          </div>
                        </a>
                        <a className="dropdown-item" href="/">
                          <div className="notification__icon-wrapper">
                            <div className="notification__icon">
                              <i className="material-icons">&#xE8D1;</i>
                            </div>
                          </div>
                          <div className="notification__content">
                            <span className="notification__category">Sales</span>
                            <p>
                              Last week your store’s sales count decreased by
                              <span className="text-danger text-semibold">5.52%</span>. It could
                              have been worse!
                            </p>
                          </div>
                        </a>
                        <a className="dropdown-item notification__all text-center" href="/">
                          {' '}
                          View all Notifications{' '}
                        </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-nowrap px-3"
                        data-toggle="dropdown"
                        href="/"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img
                          className="user-avatar rounded-circle mr-2"
                          src="images/avatars/0.jpg"
                          alt="User Avatar"
                        />
                        <span className="d-none d-md-inline-block">Sierra Brooks</span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-small">
                        <a className="dropdown-item" href="user-profile-lite.html">
                          <i className="material-icons">&#xE7FD;</i> Profile
                        </a>
                        <a className="dropdown-item" href="components-blog-posts.html">
                          <i className="material-icons">vertical_split</i> Blog Posts
                        </a>
                        <a className="dropdown-item" href="add-new-post.html">
                          <i className="material-icons">note_add</i> Add New Post
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item text-danger" href="/">
                          <i className="material-icons text-danger">&#xE879;</i> Logout{' '}
                        </a>
                      </div>
                    </li>
                  </ul>
                  <nav className="nav">
                    <a
                      href="/"
                      className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left"
                      data-toggle="collapse"
                      data-target=".header-navbar"
                      aria-expanded="false"
                      aria-controls="header-navbar"
                    >
                      <i className="material-icons">&#xE5D2;</i>
                    </a>
                  </nav>
                </nav>
              </div>
              {/* <!-- / .main-navbar --> */}
              <div className="main-content-container container-fluid px-4">
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4">
                  <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                    <span className="text-uppercase page-subtitle">Dashboard</span>
                    <h3 className="page-title">Blog Overview</h3>
                  </div>
                </div>
                {/* <!-- End Page Header -->
            <!-- Small Stats Blocks --> */}
                <div className="row">
                  <div className="col-lg col-md-6 col-sm-6 mb-4">
                    <div className="stats-small stats-small--1 card card-small">
                      <div className="card-body p-0 d-flex">
                        <div className="d-flex flex-column m-auto">
                          <div className="stats-small__data text-center">
                            <span className="stats-small__label text-uppercase">Posts</span>
                            <h6 className="stats-small__value count my-3">2,390</h6>
                          </div>
                          <div className="stats-small__data">
                            <span className="stats-small__percentage stats-small__percentage--increase">
                              4.7%
                            </span>
                          </div>
                        </div>
                        <canvas height="120" className="blog-overview-stats-small-1" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg col-md-6 col-sm-6 mb-4">
                    <div className="stats-small stats-small--1 card card-small">
                      <div className="card-body p-0 d-flex">
                        <div className="d-flex flex-column m-auto">
                          <div className="stats-small__data text-center">
                            <span className="stats-small__label text-uppercase">Pages</span>
                            <h6 className="stats-small__value count my-3">182</h6>
                          </div>
                          <div className="stats-small__data">
                            <span className="stats-small__percentage stats-small__percentage--increase">
                              12.4%
                            </span>
                          </div>
                        </div>
                        <canvas height="120" className="blog-overview-stats-small-2" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg col-md-4 col-sm-6 mb-4">
                    <div className="stats-small stats-small--1 card card-small">
                      <div className="card-body p-0 d-flex">
                        <div className="d-flex flex-column m-auto">
                          <div className="stats-small__data text-center">
                            <span className="stats-small__label text-uppercase">Comments</span>
                            <h6 className="stats-small__value count my-3">8,147</h6>
                          </div>
                          <div className="stats-small__data">
                            <span className="stats-small__percentage stats-small__percentage--decrease">
                              3.8%
                            </span>
                          </div>
                        </div>
                        <canvas height="120" className="blog-overview-stats-small-3" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg col-md-4 col-sm-6 mb-4">
                    <div className="stats-small stats-small--1 card card-small">
                      <div className="card-body p-0 d-flex">
                        <div className="d-flex flex-column m-auto">
                          <div className="stats-small__data text-center">
                            <span className="stats-small__label text-uppercase">Users</span>
                            <h6 className="stats-small__value count my-3">2,413</h6>
                          </div>
                          <div className="stats-small__data">
                            <span className="stats-small__percentage stats-small__percentage--increase">
                              12.4%
                            </span>
                          </div>
                        </div>
                        <canvas height="120" className="blog-overview-stats-small-4" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg col-md-4 col-sm-12 mb-4">
                    <div className="stats-small stats-small--1 card card-small">
                      <div className="card-body p-0 d-flex">
                        <div className="d-flex flex-column m-auto">
                          <div className="stats-small__data text-center">
                            <span className="stats-small__label text-uppercase">Subscribers</span>
                            <h6 className="stats-small__value count my-3">17,281</h6>
                          </div>
                          <div className="stats-small__data">
                            <span className="stats-small__percentage stats-small__percentage--decrease">
                              2.4%
                            </span>
                          </div>
                        </div>
                        <canvas height="120" className="blog-overview-stats-small-5" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Small Stats Blocks --> */}
                <div className="row">
                  {/* <!-- Users Stats --> */}
                  <div className="col-lg-8 col-md-12 col-sm-12 mb-4">
                    <div className="card card-small">
                      <div className="card-header border-bottom">
                        <h6 className="m-0">Users</h6>
                      </div>
                      <div className="card-body pt-0">
                        <div className="row border-bottom py-2 bg-light">
                          <div className="col-12 col-sm-6">
                            <div
                              id="blog-overview-date-range"
                              className="input-daterange input-group input-group-sm my-auto ml-auto mr-auto ml-sm-auto mr-sm-0"
                              style={{
                                maxWidth: '350px',
                              }}
                            >
                              <input
                                type="text"
                                className="input-sm form-control"
                                name="start"
                                placeholder="Start Date"
                                id="blog-overview-date-range-1"
                              />
                              <input
                                type="text"
                                className="input-sm form-control"
                                name="end"
                                placeholder="End Date"
                                id="blog-overview-date-range-2"
                              />
                              <span className="input-group-append">
                                <span className="input-group-text">
                                  <i className="material-icons"></i>
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 d-flex mb-2 mb-sm-0">
                            <button
                              type="button"
                              className="btn btn-sm btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
                            >
                              View Full Report &rarr;
                            </button>
                          </div>
                        </div>
                        <canvas
                          height="130"
                          style={{
                            maxWidth: '100% !important',
                          }}
                          className="blog-overview-users"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Users Stats -->
              <!-- Users By Device Stats --> */}
                  <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div className="card card-small h-100">
                      <div className="card-header border-bottom">
                        <h6 className="m-0">Users by device</h6>
                      </div>
                      <div className="card-body d-flex py-0">
                        <canvas height="220" className="blog-users-by-device m-auto" />
                      </div>
                      <div className="card-footer border-top">
                        <div className="row">
                          <div className="col">
                            <select
                              className="custom-select custom-select-sm"
                              style={{
                                maxWidth: '130px',
                              }}
                            >
                              <option selected="selected">Last Week</option>
                              <option value="1">Today</option>
                              <option value="2">Last Month</option>
                              <option value="3">Last Year</option>
                            </select>
                          </div>
                          <div className="col text-right view-report">
                            <a href="/">Full report &rarr;</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Users By Device Stats -->
              <!-- New Draft Component --> */}
                  <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    {/* <!-- Quick Post --> */}
                    <div className="card card-small h-100">
                      <div className="card-header border-bottom">
                        <h6 className="m-0">New Draft</h6>
                      </div>
                      <div className="card-body d-flex flex-column">
                        <form className="quick-post-form">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Brave New World"
                            />{' '}
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Words can be like X-rays if you use them properly..."
                            />
                          </div>
                          <div className="form-group mb-0">
                            <button type="submit" className="btn btn-accent">
                              Create Draft
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* <!-- End Quick Post --> */}
                  </div>
                  {/* <!-- End New Draft Component -->
              <!-- Discussions Component --> */}
                  <div className="col-lg-5 col-md-12 col-sm-12 mb-4">
                    <div className="card card-small blog-comments">
                      <div className="card-header border-bottom">
                        <h6 className="m-0">Discussions</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="blog-comments__item d-flex p-3">
                          <div className="blog-comments__avatar mr-3">
                            <img src="images/avatars/1.jpg" alt="User avatar" />{' '}
                          </div>
                          <div className="blog-comments__content">
                            <div className="blog-comments__meta text-muted">
                              <a className="text-secondary" href="/">
                                James Johnson
                              </a>{' '}
                              on
                              <a className="text-secondary" href="/">
                                Hello World!
                              </a>
                              <span className="text-muted">– 3 days ago</span>
                            </div>
                            <p className="m-0 my-1 mb-2 text-muted">
                              Well, the way they make shows is, they make one show ...
                            </p>
                            <div className="blog-comments__actions">
                              <div className="btn-group btn-group-sm">
                                <button type="button" className="btn btn-white">
                                  <span className="text-success">
                                    <i className="material-icons">check</i>
                                  </span>{' '}
                                  Approve{' '}
                                </button>
                                <button type="button" className="btn btn-white">
                                  <span className="text-danger">
                                    <i className="material-icons">clear</i>
                                  </span>{' '}
                                  Reject{' '}
                                </button>
                                <button type="button" className="btn btn-white">
                                  <span className="text-light">
                                    <i className="material-icons">more_vert</i>
                                  </span>{' '}
                                  Edit{' '}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="blog-comments__item d-flex p-3">
                          <div className="blog-comments__avatar mr-3">
                            <img src="images/avatars/2.jpg" alt="User avatar" />{' '}
                          </div>
                          <div className="blog-comments__content">
                            <div className="blog-comments__meta text-muted">
                              <a className="text-secondary" href="/">
                                James Johnson
                              </a>{' '}
                              on
                              <a className="text-secondary" href="/">
                                Hello World!
                              </a>
                              <span className="text-muted">– 4 days ago</span>
                            </div>
                            <p className="m-0 my-1 mb-2 text-muted">
                              After the avalanche, it took us a week to climb out. Now...
                            </p>
                            <div className="blog-comments__actions">
                              <div className="btn-group btn-group-sm">
                                <button type="button" className="btn btn-white">
                                  <span className="text-success">
                                    <i className="material-icons">check</i>
                                  </span>{' '}
                                  Approve{' '}
                                </button>
                                <button type="button" className="btn btn-white">
                                  <span className="text-danger">
                                    <i className="material-icons">clear</i>
                                  </span>{' '}
                                  Reject{' '}
                                </button>
                                <button type="button" className="btn btn-white">
                                  <span className="text-light">
                                    <i className="material-icons">more_vert</i>
                                  </span>{' '}
                                  Edit{' '}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="blog-comments__item d-flex p-3">
                          <div className="blog-comments__avatar mr-3">
                            <img src="images/avatars/3.jpg" alt="User avatar" />{' '}
                          </div>
                          <div className="blog-comments__content">
                            <div className="blog-comments__meta text-muted">
                              <a className="text-secondary" href="/">
                                James Johnson
                              </a>{' '}
                              on
                              <a className="text-secondary" href="/">
                                Hello World!
                              </a>
                              <span className="text-muted">– 5 days ago</span>
                            </div>
                            <p className="m-0 my-1 mb-2 text-muted">
                              My money's in that office, right? If she start giving me...
                            </p>
                            <div className="blog-comments__actions">
                              <div className="btn-group btn-group-sm">
                                <button type="button" className="btn btn-white">
                                  <span className="text-success">
                                    <i className="material-icons">check</i>
                                  </span>{' '}
                                  Approve{' '}
                                </button>
                                <button type="button" className="btn btn-white">
                                  <span className="text-danger">
                                    <i className="material-icons">clear</i>
                                  </span>{' '}
                                  Reject{' '}
                                </button>
                                <button type="button" className="btn btn-white">
                                  <span className="text-light">
                                    <i className="material-icons">more_vert</i>
                                  </span>{' '}
                                  Edit{' '}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer border-top">
                        <div className="row">
                          <div className="col text-center view-report">
                            <button type="submit" className="btn btn-white">
                              View All Comments
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Discussions Component -->
              <!-- Top Referrals Component --> */}
                  <div className="col-lg-3 col-md-12 col-sm-12 mb-4">
                    <div className="card card-small">
                      <div className="card-header border-bottom">
                        <h6 className="m-0">Top Referrals</h6>
                      </div>
                      <div className="card-body p-0">
                        <ul className="list-group list-group-small list-group-flush">
                          <li className="list-group-item d-flex px-3">
                            <span className="text-semibold text-fiord-blue">GitHub</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                              19,291
                            </span>
                          </li>
                          <li className="list-group-item d-flex px-3">
                            <span className="text-semibold text-fiord-blue">Stack Overflow</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                              11,201
                            </span>
                          </li>
                          <li className="list-group-item d-flex px-3">
                            <span className="text-semibold text-fiord-blue">Hacker News</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                              9,291
                            </span>
                          </li>
                          <li className="list-group-item d-flex px-3">
                            <span className="text-semibold text-fiord-blue">Reddit</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                              8,281
                            </span>
                          </li>
                          <li className="list-group-item d-flex px-3">
                            <span className="text-semibold text-fiord-blue">The Next Web</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                              7,128
                            </span>
                          </li>
                          <li className="list-group-item d-flex px-3">
                            <span className="text-semibold text-fiord-blue">Tech Crunch</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                              6,218
                            </span>
                          </li>
                          <li className="list-group-item d-flex px-3">
                            <span className="text-semibold text-fiord-blue">YouTube</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                              1,218
                            </span>
                          </li>
                          <li className="list-group-item d-flex px-3">
                            <span className="text-semibold text-fiord-blue">Adobe</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                              827
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer border-top">
                        <div className="row">
                          <div className="col">
                            <select className="custom-select custom-select-sm">
                              <option selected>Last Week</option>
                              <option value="1">Today</option>
                              <option value="2">Last Month</option>
                              <option value="3">Last Year</option>
                            </select>
                          </div>
                          <div className="col text-right view-report">
                            <a href="/">Full report &rarr;</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Top Referrals Component --> */}
                </div>
              </div>
              <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
                <ul className="nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Services
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Products
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Blog
                    </a>
                  </li>
                </ul>
                <span className="copyright ml-auto my-auto mr-2">
                  Copyright © 2018
                  <a href="https://designrevision.com" rel="nofollow">
                    DesignRevision
                  </a>
                </span>
              </footer>
            </main>
          </div>
        </div>
        <div className="promo-popup animated">
          <a href="/" className="pp-cta extra-action" />
          <img src="/" />
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
            <a className="pp-cta extra-action" href="http://bit.ly/shards-dashboard-pro">
              Download
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMain;
