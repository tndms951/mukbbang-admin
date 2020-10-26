import React, { useState } from 'react';
import './signin.style.css';

function Signin() {
  const [inputs, setInputs] = useState({
    valueid: '',
    valuepass: '',
    remenber: false,
  });

  const [textId, setTextId] = useState('');
  const [textPssword, setTextPassword] = useState('');

  const { valueid, valuepass, remenber } = inputs;

  // form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  // 비밀번호 형식 안맞을때
  const exception = (str) => {
    const pattern1 = /[0-9]/; // 숫자
    const pattern2 = /[a-zA-Z]/; // 문자
    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자

    if (!pattern1.test(str)) {
      setTextPassword('숫자를 포함시켜주세요');
    } else if (!pattern2.test(str)) {
      setTextPassword('문자를 포함시켜주세요');
    } else if (!pattern3.test(str)) {
      setTextPassword('특수문자를 포함시켜주세요');
    } else if (str.length < 8) {
      setTextPassword('8자 이상으로 해주세요');
    } else {
      setTextPassword('');
    }
  };

  // 비밀번호 이벤트
  const passwordChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'valuepass') {
      exception(e.target.value);
    }
  };

  // 아이디(이메일) 형식 안맞을때
  const isEmail = (asValue) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{3}$/i;

    if (!regExp.test(asValue)) {
      setTextId('이메일 형식이 맞지 않습니다.');
    } else {
      setTextId('');
    }
  };

  // 아이디 이벤트
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'valueid') {
      isEmail(e.target.value);
    }
  };

  // 토글버튼
  const rememberChange = () => {
    setInputs({
      ...inputs,
      remenber: !remenber,
    });
  };

  // alert창 뜨는거
  const onClick = (e) => {
    if (valueid === valuepass) {
      alert('아이디와 비밀번호를 입력해주세요.');
    } else if (!valueid) {
      alert('아이디를 입력해주세요.');
    } else if (!valuepass) {
      alert('비밀번호를 입력해주세요.');
    } else {
      alert('로그인되었습니다.');
    }
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
                <span className="txt1 p-b-11">ID</span>
                <div
                  className="wrap-input100 validate-input m-b-36"
                  data-validate="Username is required"
                >
                  <input
                    className="input100"
                    type="text"
                    name="valueid"
                    onChange={onChange}
                    value={valueid}
                  />
                  <span className="focus-input100" />
                </div>
                <div className="idwarning">{textId && <div>{textId}</div>}</div>

                {/* 비밀번호 */}
                <span className="txt1 p-b-11">Password</span>
                <div
                  className="wrap-input100 validate-input m-b-12"
                  data-validate="Password is required"
                >
                  <span className="btn-show-pass">
                    <i className="fa fa-eye" />
                  </span>
                  <input
                    className="input100"
                    type="password"
                    name="valuepass"
                    onChange={passwordChange}
                    value={valuepass}
                  />
                </div>
                <div className="idwarning">{textPssword && <div>{textPssword} </div>}</div>

                {/* 체크박스 */}
                <div className="flex-sb-m w-full p-b-48">
                  <div className="contact100-form-checkbox01">
                    <label className="label-checkbox100" htmlFor="ckb1">
                      <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="remember-me"
                        value={remenber}
                        onChange={rememberChange}
                      />
                    </label>
                    Remember me
                    <span>회원가입</span>
                  </div>
                </div>

                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn" onClick={onClick}>
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

export default Signin;
