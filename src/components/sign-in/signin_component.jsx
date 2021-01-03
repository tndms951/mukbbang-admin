import React, { useState, useRef } from 'react';
import './signin_style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAuthorization } from '../utils/axios';
import { errorhandler, isEmailValid, sweetAlert } from '../utils/common';
import { setCurrentUser } from '../../redux/user/user.actions';

function Signin({ onUserSet, history }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);

  const { email, password, remember } = inputs;

  const valueRef = {
    emailRef: useRef(null),
    passwordRef: useRef(null)
  };

  // form
  const handleSubmit = async (e) => {
    try {
      const signinObject = {
        email,
        password
      };

      e.preventDefault();

      const { emailRef, passwordRef } = valueRef;
      if (!email) {
        sweetAlert('이메일을 입력해주세요.');
        emailRef.current.focus();
      } else if (errorMessageEmail) {
        sweetAlert('이메일을 형식을 맞춰주세요.');
      } else if (!password) {
        sweetAlert('비밀번호를 입력해주세요.');
        passwordRef.current.focus();
      } else {
        setSubmitStatus(true);
      }
      const { data } = await axios.post('/admin/signin', signinObject);
      const { token } = data.data;
      // console.log(token);
      setAuthorization(token);
      const { data: currentData } = await axios.get('/admin/current'); //
      const { data: userInfo } = currentData;
      onUserSet(userInfo, token);
      history.push('/');
    } catch (err) {
      errorhandler(err);
    } finally {
      setSubmitStatus(false);
    }
  };

  // 아이디(이메일) 형식 안맞을때
  const isEmail = (asValue) => {
    if (isEmailValid(asValue)) {
      setErrorMessageEmail('이메일 형식이 맞지 않습니다.');
      return;
    }
    setErrorMessageEmail('');
  };

  // 아이디 이벤트
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      isEmail(e.target.value);
    }
    setInputs({
      ...inputs,
      [e.target.name]: e.target.name === 'remember' ? !remember : e.target.value
    });
  };

  return (
    <>
      <div className="login-wraaper">
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
              <form className="login100-form validate-form flex-sb flex-w" onSubmit={handleSubmit}>
                <span className="login100-form-title p-b-32">Login</span>

                {/* 아이디 */}
                <span className="txt1 p-b-11">EMAIL</span>
                <div
                  className="wrap-input100 validate-input m-b-36"
                  data-validate="Username is required">
                  <input
                    className="input100 id-input"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    ref={valueRef.emailRef}
                  />
                  <span className="focus-input100" />
                </div>
                <div className="idwarning">
                  {errorMessageEmail && <div>{errorMessageEmail}</div>}
                </div>

                {/* 비밀번호 */}
                <span className="txt1 p-b-11">Password</span>
                <div
                  className="wrap-input100 validate-input m-b-12"
                  data-validate="Password is required">
                  <span className="btn-show-pass">
                    <i className="fa fa-eye" />
                  </span>
                  <input
                    className="input100 id-input"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    ref={valueRef.passwordRef}
                  />
                </div>
                {/* 체크박스 */}
                <div className="flex-sb-m w-full p-b-48">
                  <div className="contact100-form-checkbox01">
                    <label className="label-checkbox100 label" htmlFor="ckb1">
                      <input
                        className="input-checkbox100 id-input"
                        id="ckb1"
                        type="checkbox"
                        name="remember"
                        onChange={handleChange}
                        checked={!!remember}
                      />
                    </label>
                    Remember me
                    <span>
                      <Link to="/signup">회원가입</Link>
                    </span>
                  </div>
                </div>

                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn" disabled={submitStatus}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Signin.propTypes = {
  onUserSet: PropTypes.func.isRequired, // isRequired은 무조건 값이있어 라는뜻!
  history: PropTypes.objectOf(PropTypes.object).isRequired
};

const mapToPropsDispatch = (dispatch) => ({
  onUserSet: (userInfo, token) => dispatch(setCurrentUser(userInfo, token))
});

export default connect(null, mapToPropsDispatch)(Signin);
