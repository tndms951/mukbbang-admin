import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { selectUserInfo } from '../../../redux/user/user.selectors';
import { setLogout } from '../../../redux/user/user.actions';
import './header.css';

const MainNavbar = ({ currentUser, onLogout }) => {
  const [Profile, setProfile] = useState(false);

  return (
    <>
      <div className="main-navbar sticky-top bg-white">
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
                placeholder="검색어를 입력해주세요"
                aria-label="Search"
              />
            </div>
          </form>
          <ul className="navbar-nav border-left flex-row ">
            {currentUser ? (
              <div
                className="nav-item dropdown"
                onClick={() => setProfile(!Profile)}
                aria-hidden="true">
                <div
                  className="nav-link dropdown-toggle text-nowrap px-3"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <img
                    className="user-avatar rounded-circle mr-2"
                    src={currentUser?.imageUrl || ''}
                    alt={`${currentUser?.name || ''}의 프로필`}
                  />
                  <span className="d-none d-md-inline-block">{currentUser?.name || ''}</span>
                </div>

                {Profile ? (
                  <>
                    <div className="dropdown-item text-danger">
                      <div className="profile_box material-icons text-primary mt-3 ">
                        &#xE879; 내정보
                      </div>
                      <div
                        className="profile_box material-icons text-danger mt-3"
                        onClick={onLogout}
                        aria-hidden="true">
                        &#xE879; 로그아웃
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="login_box">
                <Link to="/signin">
                  <span>로그인</span>
                </Link>
                <Link to="/signup">
                  <span>회원가입</span>
                </Link>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

MainNavbar.defaultProps = {
  currentUser: null
};

MainNavbar.propTypes = {
  currentUser: PropTypes.instanceOf(Object),
  onLogout: PropTypes.func.isRequired
};

const userProps = createStructuredSelector({
  currentUser: selectUserInfo
});

const userDispatch = (dispatch) => ({
  onLogout: () => dispatch(setLogout())
});

export default connect(userProps, userDispatch)(MainNavbar);
