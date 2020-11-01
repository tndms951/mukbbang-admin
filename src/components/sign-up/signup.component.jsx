import React, { useState, useRef } from 'react';
import './signup.style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isEmailValid } from '../utils/common';

function Signup() {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    checkpassword: '',
    isChecked: false,
  });

  const [validEmail, setValidEmail] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const [validRePassword, setValidRePassword] = useState('');

  const valueRef = {
    nameRef: useRef(null),
    emailRef: useRef(null),
    passwordRef: useRef(null),
    checkpasswordRef: useRef(null),
    isCheckedRef: useRef(null),
  };

  const { name, email, password, checkpassword, isChecked } = value;

  // 패스워스 패턴 체크
  const chkPWpattern = (str) => {
    const pattern1 = /[0-9]/; // 숫자
    const pattern2 = /[a-zA-Z]/; // 문자
    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자

    if (!pattern1.test(str)) {
      setValidPassword('숫자를 포함시켜주세요');
    } else if (!pattern2.test(str)) {
      setValidPassword('문자를 포함시켜주세요');
    } else if (!pattern3.test(str)) {
      setValidPassword('특수문자를 포함시켜주세요');
    } else if (str.length < 8) {
      setValidPassword('8자 이상으로 해주세요');
    } else {
      setValidPassword('');
    }
  };

  // 이메일 형식 체크
  const chkEmailpattern = (str) => {
    if (isEmailValid(str)) {
      setValidEmail('이메일 형식에 맞게 작성해 주세요');
    } else {
      setValidEmail('');
    }
  };

  // 비번, 비번확인 일치 체크
  const checkPassword = (rePassword) => {
    if (rePassword !== password) {
      setValidRePassword('비밀번호가 일치하지 않습니다');
      return;
    }
    setValidRePassword('');
  };

  const handleChange = (e) => {
    if (e.target.name === 'password') {
      chkPWpattern(e.target.value);
    } else if (e.target.name === 'checkpassword') {
      checkPassword(e.target.value);
    } else if (e.target.name === 'email') {
      chkEmailpattern(e.target.value);
    }

    setValue({
      ...value,
      [e.target.name]: e.target.name === 'isChecked' ? !isChecked : e.target.value,
    });
  };

  // axios API
  const onSignup = async () => {
    try {
      const signupObject = {
        name: value.name,
        email: value.email,
        password: value.password,
        isChecked: value.isChecked,
        type: 'bread',
      };
      const { data } = await axios.post('http://3.35.109.159:3000/admin/signup', signupObject);
      // console.log(signupObject.type);
      console.log(data);

      // setValue.name(response.data);
    } catch (err) {
      if (err && err.response) {
        const { data } = err.response;
        const { message } = data;
        alert(message);
      }
    }
  };

  // 폼의 내용 변경시 사용되는 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nameRef, emailRef, passwordRef, checkpasswordRef, isCheckedRef } = valueRef;
    if (!name) {
      alert('이름을 입력하세요');
      nameRef.current.focus();
    } else if (!email) {
      alert('이메일을 입력하세요');
      emailRef.current.focus();
    } else if (!password) {
      alert('비번을 입력하세요');
      passwordRef.current.focus();
    } else if (!checkpassword) {
      alert('재비번을 입력하세요');
      checkpasswordRef.current.focus();
    } else if (validEmail) {
      alert('이메일 형식을 맞춰주세요.');
      emailRef.current.focus();
    } else if (validPassword) {
      alert('비밀번호 형식을 맞춰주세요.');
      passwordRef.current.focus();
    } else if (validRePassword) {
      alert('비밀번호가 일치하지 않습니다.');
      checkpasswordRef.current.focus();
    } else if (!isChecked) {
      alert('약관에 동의해 주세요');
      isCheckedRef.current.focus();
    } else {
      onSignup();
    }
  };

  return (
    <div className="background">
      <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <form id="signup-form" className="signup-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Create account</h2>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={handleChange}
                    ref={valueRef.nameRef}
                  />
                  {/* 이름 */}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={handleChange}
                    ref={valueRef.emailRef}
                  />
                  <div className="warning-email">{validEmail && <div>{validEmail}</div>}</div>
                  {/* 이메일 */}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    ref={valueRef.passwordRef}
                  />
                  {/* 비번 */}
                  <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password" />
                  <div className="warning-password">
                    {validPassword && <div>{validPassword}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    name="checkpassword"
                    id="re_password"
                    placeholder="Repeat your password"
                    value={checkpassword}
                    onChange={handleChange}
                    ref={valueRef.checkpasswordRef}
                  />
                  <div className="warning-check-password">
                    {validRePassword && <div>{validRePassword}</div>}
                  </div>
                  {/* 비번확인 */}
                </div>
                <div className="form-group check">
                  <input
                    type="checkbox"
                    name="isChecked"
                    id="agree-term"
                    className="agree-term"
                    value={isChecked}
                    onChange={handleChange}
                    checked={isChecked}
                    ref={valueRef.isCheckedRef}
                  />
                  {/* 체크박스 */}
                  <label htmlFor="agree-term" className="label-agree-term">
                    I agree all statements in{' '}
                    <a href="/" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    name="signup"
                    id="submit"
                    className="form-submit"
                    value="sign up"
                    onClick={handleSubmit}
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <p className="loginhere">
                Have already an account ?{' '}
                <Link to="/login" className="loginhere-link">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signup;
