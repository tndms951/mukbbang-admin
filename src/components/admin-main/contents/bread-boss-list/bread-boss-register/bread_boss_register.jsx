import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Xbutton from '../../../../utils/X_button';

import axios from '../../../../utils/axios';
import { sweetAlert, errorhandler, sweetAlertSuccess } from '../../../../utils/common';

import './bread-boss-register.css';

/**
 * @author 송지은
 * */

function BreadBossRegister({ history }) {
  const [value, setValue] = useState({
    name: '',
    phoneNumber: ''
  });

  const [profile, setProfile] = useState({
    profileName: '이미지를 넣으세요',
    profileUrl: ''
  });

  const { name, phoneNumber } = value;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name) {
        sweetAlert('이름을 입력해주세요');
      } else if (!phoneNumber) {
        sweetAlert('핸드폰 번호를 입력해 주세요');
      } else if (!profile) {
        sweetAlert('이미지를 넣어주세요');
      } else {
        const shopObject = {
          name,
          phoneNumber,
          imageUrl: profile.profileUrl
        };

        const { status } = await axios.post('/admin/shop', shopObject);
        if (status === 201) {
          history.push('/bread_boss_list');
          sweetAlertSuccess('등록 연결 성공 !!!!');
        }
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  // 프로필 핸들체인지
  const profileHandleChange = async (e) => {
    try {
      const profileFormData = new FormData();
      profileFormData.append('imgFile', e.target.files[0]);

      const { status, data: profileData } = await axios.post('/upload/user', profileFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      if (status === 200) {
        const { data } = profileData;

        setProfile({
          ...profile,
          profileName: name,
          profileUrl: data.imageUrl
        });
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 이미지 삭제 핸들러
  const resetOnClick = () => {
    setProfile({
      profileName: '이미지를 넣으세요',
      profileUrl: ''
    });
  };

  const cancelHandler = () => {
    setValue({
      name: '',
      phoneNumber: ''
    });
    setProfile({
      profileUrl: ''
    });
  };

  return (
    <>
      <div className="col-lg-12 mb-4 mt-10">
        <form onSubmit={handleSubmit}>
          <div
            className="card card-small mb-5 mt-5"
            style={{
              padding: '5%'
            }}>
            <div className="row justify-content-start">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                이름
              </span>

              <div className="form-group col-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="이름을 입력해 주세요"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-start">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                핸드폰 번호
              </span>
              <div className="form-group col-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="핸드폰 번호를 입력해 주세요"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-start">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                프로필 사진
              </span>
              <div className="form-group col-5">
                {!profile.profileUrl ? (
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      name="profileName"
                      onChange={profileHandleChange}
                    />
                    <label className="input-group-text">Upload</label>
                  </div>
                ) : (
                  <div className="image_wrap">
                    <img className="img" src={profile.profileUrl} alt="bread_boss" />
                    <div
                      className="button_wrap"
                      onClick={resetOnClick}
                      role="button"
                      tabIndex={0}
                      aria-hidden="true">
                      <Xbutton />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col mb-4 mt-5">
              <div className="col text-right">
                <button
                  type="button"
                  className="mb-2 btn btn-secondary mr-2"
                  onClick={cancelHandler}>
                  취소
                </button>
                <button type="submit" className="mb-2 btn btn-primary mr-2">
                  등록
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

BreadBossRegister.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired
};

export default BreadBossRegister;
