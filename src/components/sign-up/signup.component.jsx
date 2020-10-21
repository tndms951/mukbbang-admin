import React, { useState } from 'react';
// import { onlyNumber } from '../../shared/common';

import './signup.style.css';

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

    // if (!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < 8) {
    //   alert('비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성하여야 합니다.');
    //   return false;
    // }
    // return true;
  };

  // 이메일 형식 체크
  const chkEmailpattern = (str) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{3,3}$/i;

    if (!regExp.test(str)) {
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
    // console.log(e.target);
    if (e.target.name === 'password') {
      chkPWpattern(e.target.value);
    } else if (e.target.name === 'checkpassword') {
      checkPassword(e.target.value);
    } else if (e.target.name === 'email') {
      chkEmailpattern(e.target.value);
    }

    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // const onReset = () => {
  //   setValue({
  //     name: '',
  //     email: '',
  //     password: '',
  //     checkpassword: '',
  //     isChecked: false,
  //   });
  // };

  // 폼의 내용 변경시 사용되는 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);

    // onReset();
  };

  // 토글 버튼
  const toggleChange = () => {
    setValue({
      ...value,
      isChecked: !isChecked,
    });
  };

  // 인풋 값들 경고 창
  const warning = () => {
    if (!name) {
      alert('이름을 입력하세요');
    } else if (!email) {
      alert('이메일을 입력하세요');
    } else if (!password) {
      alert('비번을 입력하세요');
      // if (password === false) {
      //   chkPWpattern();
      // }
    } else if (!checkpassword) {
      alert('재비번을 입력하세요');
    } else if (!isChecked) {
      alert('약관에 동의해 주세요');
      if (password === checkpassword) {
        return value;
      }
      alert('비번이 불일치합니다.');
    } else if (password === checkpassword) {
      alert('회원가입 성공');
    } else if (password !== checkpassword) {
      alert('패스워드가 맞지 않습니다');
    } else {
      alert('패스워드가 맞지 않습니다');
    }
  };

  const onClick = () => {
    // console.log(e.target.value);

    // 인풋값 확인
    warning();

    // 비번, 비번확인 확인
    // if (value.password === value.checkpassword) {
    //   alert('일치합니다.');
    // } else {
    //   alert('불일치합니다.');
    // }
  };

  return (
    <div className="background">
      <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <form method="POST" id="signup-form" className="signup-form" onSubmit={handleSubmit}>
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
                  />
                  <div className="warning-email">{validEmail && <div>{validEmail}</div>}</div>
                  {/* 이메일 */}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    // ckpassword={chkPWpattern}
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
                  />
                  <div className="warning-check-password">
                    {validRePassword && <div>{validRePassword}</div>}
                  </div>
                  {/* 비번확인 */}
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                    value={isChecked}
                    onChange={toggleChange}
                    checked={isChecked}
                  />
                  {/* 체크박스 */}
                  <label htmlFor="agree-term" className="label-agree-term">
                    <span>
                      <span />
                    </span>
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
                    onClick={onClick}
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <p className="loginhere">
                Have already an account ?{' '}
                <a href="/" className="loginhere-link">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signup;
