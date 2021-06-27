/* eslint-disable no-nested-ternary */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { errorhandler } from '../../../../utils/common';
import axios from '../../../../utils/axios';
import Xbutton from '../../../../utils/X_button';

/**
 * @author 송지은
 * */

function BreadBossDetail({ match }) {
  const [value, setValue] = useState({
    name: '',
    phoneNumber: '',
    enabled: '',
    imageUrl: ''
  });

  const { name, phoneNumber } = value;

  // 서버에서 받아온 값 저장
  const [boss, setBoss] = useState(null);

  // 취소, 수정 값
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const { bossId } = match.params;

    const fetchData = async () => {
      try {
        const { status, data: bossData } = await axios.get(`/admin/shop/${bossId}`);
        if (status === 200) {
          const { data } = bossData;
          setBoss(data);
        }
      } catch (err) {
        errorhandler(err);
      }
    };
    fetchData();
  }, [match.params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { bossId } = match.params;
    try {
      const modifyObject = {
        name: value.name,
        phoneNumber: value.phoneNumber,
        imageUrl: value.imageUrl
      };

      const { status } = await axios.put(`/admin/shop/${bossId}`, modifyObject);
      if (status === 201) {
        setBoss({
          ...boss,
          name: value.name,
          phoneNumber: value.phoneNumber,
          imageUrl: value.imageUrl,
          enabled: value.enabled
        });

        setEdit(!edit);
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 탈퇴 핸들써브밋
  const quitHandleSubmit = async () => {
    const { bossId } = match.params;
    try {
      const modifyObject = {
        enabled: 'true'
      };

      const { status } = await axios.patch(`/admin/shop/${bossId}/valid`, modifyObject);
      if (status === 201) {
        setBoss({
          ...boss,
          enabled: value.enabled
        });
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

  // 수정
  const modifyHandleSubmit = () => {
    setEdit(!edit);

    setValue({
      name: boss.name,
      phoneNumber: boss.phoneNumber,
      imageUrl: boss.imageUrl,
      enabled: boss.enabled
    });
  };

  // 이미지 삭제 핸들러
  const resetOnClick = () => {
    setValue({
      ...value,
      imageUrl: ''
    });
  };

  // 이미지 핸들체인지
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

        setValue({
          ...value,
          profileName: name,
          imageUrl: data.imageUrl
        });
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  return (
    <>
      <div className="col-lg-12 mb-4 mt-10">
        <div className="card card-small mb-5 mt-5">
          <div className="card-header border-bottom">
            <h2 className="m-0">빵집 사장 상세</h2>
          </div>
          <div className="mr-5 ml-5 mt-5 mb-4">
            <div className="row justify-content-start">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                이름
              </span>
              {edit ? (
                <div className="form-group col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="이름을 입력해 주세요"
                    onChange={handleChange}
                    value={name}
                    name="name"
                  />
                </div>
              ) : (
                <div className="form-group col-5">
                  <span>{boss && boss.name}</span>
                </div>
              )}
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
              {edit ? (
                <div className="form-group col-5">
                  <input
                    type="number"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="핸드폰 번호를 입력해 주세요"
                    onChange={handleChange}
                    name="phoneNumber"
                    value={phoneNumber}
                  />
                </div>
              ) : (
                <div className="form-group col-5">
                  <span>{boss && boss.phoneNumber}</span>
                </div>
              )}
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

              {edit ? (
                value.imageUrl ? (
                  <div
                    style={{
                      position: 'relative'
                    }}>
                    <img
                      src={value.imageUrl}
                      alt="빵집 사장 프로필 사진"
                      style={{
                        width: '200px'
                      }}
                      value="true"
                    />
                    <div
                      role="button"
                      aria-hidden="true"
                      className="button_wrap"
                      onClick={resetOnClick}>
                      <Xbutton />
                    </div>
                  </div>
                ) : (
                  <div className="form-group col-5">
                    <input
                      type="file"
                      className="form-control"
                      name="profileName"
                      onChange={profileHandleChange}
                    />
                  </div>
                )
              ) : (
                <div className="form-group">
                  <span>
                    {boss && (
                      <img
                        src={boss.imageUrl}
                        alt="빵집 사장 프로필 사진"
                        style={{
                          width: '200px'
                        }}
                        value="true"
                      />
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="row justify-content-start">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                탈퇴여부
              </span>

              <div className="form-group col-5">
                <span>{boss?.enabled ? '사용중' : '탈퇴'}</span>
              </div>
            </div>

            <div className="col mb-4 mt-5">
              <div className="col text-right">
                {edit ? (
                  <button
                    type="button"
                    className="mb-2 btn btn-danger mr-2"
                    onClick={modifyHandleSubmit}>
                    취소
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mb-2 btn btn-danger mr-2"
                    onClick={quitHandleSubmit}>
                    탈퇴
                  </button>
                )}
                {edit ? (
                  <button
                    type="submit"
                    className="mb-2 btn btn-primary mr-2"
                    onClick={handleSubmit}>
                    저장
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mb-2 btn btn-primary mr-2"
                    onClick={modifyHandleSubmit}>
                    수정
                  </button>
                )}
              </div>
              <div className="col text-right mt-3">
                <Link to="/bread_boss_list">
                  <button type="button" className="mb-2 btn btn-secondary mr-2">
                    목록으로 가기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

BreadBossDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
};

export default BreadBossDetail;
