/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { errorhandler } from '../../../../utils/common';
import axios from '../../../../utils/axios';
import Xbutton from '../../../../utils/X_button';

function BreadBossDetail({ match }) {
  const [value, setValue] = useState({
    name: '',
    phoneNumber: '',
    profile: '',
    enabled: '',
    imageUrl: ''
  });

  const { name, phoneNumber, profile, enabled } = value;

  // 서버에서 받아온 값 저장
  const [boss, setBoss] = useState(null);
  console.log(boss);
  console.log(value);

  // const [profile, setProfile] = useState({
  //   profileName: '',
  //   profileUrl: '',
  // });

  // 취소, 수정 값
  const [edit, setEdit] = useState(false);

  // Xbutton
  // const [xbutton, setXbutton] = useState(false);

  useEffect(() => {
    console.log(match.params);
    const { bossId } = match.params;

    const fetchData = async () => {
      try {
        const { status, data: bossData } = await axios.get(`/admin/shop/${bossId}`);
        // console.log(bossData);
        if (status === 200) {
          console.log('디테일 페이지 연결 !!!!!!!!!');
          const { data } = bossData;
          // console.log(data);
          setBoss(data);
          // console.log(value);
          // setBoss(data.imageUrl);
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
        imageUrl: value.profile
      };
      console.log(value.name);
      console.log(boss.name);

      const { status } = await axios.put(`/admin/shop/${bossId}`, modifyObject);
      if (status === 201) {
        console.log('수정페이지 연결 !!!!!!');

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

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const { bossId } = match.params;
    try {
      const modifyObject = {
        enabled: 'true'
      };
      console.log(value.name);
      console.log(boss.name);

      const { status } = await axios.put(`/admin/shop/${bossId}/valid`, modifyObject);
      if (status === 201) {
        console.log('수정페이지 연결 !!!!!!');

        setBoss({
          ...value,
          enabled: value.enabled
        });

        setEdit(!edit);
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
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
    console.log(value);
    console.log(boss);
  };

  console.log(boss);

  //   const profileHandleChange = async () => {
  //     const { bossId } = match.params;
  //     try {
  //       const imageObject = {
  // };
  //       const { status, data: profileData } = await axios.put(`/upload/shop/${bossId}`, imageObject);
  //       if (status === 201) {
  //         console.log('이미지 수정 성공');
  //       }
  //     } catch (err) {
  //       errorhandler(err);
  //     }
  //   };

  // 이미지 삭제 핸들러
  const resetOnClick = () => {
    console.log('이미지 삭제 !!!!');
    setValue({
      ...value,
      imageUrl: ''
    });
  };

  // 이미지 핸들체인지
  const profileHandleChange = async (e) => {
    try {
      const { name } = e.target.files[0];
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
      console.log('사진넣어야되');
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
              {/* <div className="form-group col-5" /> */}
              {edit ? (
                <div className="form-group col-5">
                  <input
                    type="text"
                    className="form-control"
                    // id="inputPassword4"
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
                    <div className="button_wrap" onClick={resetOnClick}>
                      <Xbutton />
                    </div>
                  </div>
                ) : (
                  <div className="form-group col-5">
                    <input
                      type="file"
                      className="form-control"
                      name="profileName"
                      // value={profileName}
                      onChange={profileHandleChange}
                    />
                    {/* <label className="input-group-text">Upload</label> */}
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
                {/* <span>{boss ? '성공' : '탈퇴'}</span> */}
                <span>{boss?.enabled ? '사용중' : '탈퇴'}</span>
              </div>
            </div>

            <div className="col mb-4 mt-5">
              <div className="col text-right">
                {edit ? (
                  <button
                    type="button"
                    className="mb-2 btn btn-secondary mr-2"
                    onClick={modifyHandleSubmit}>
                    취소
                  </button>
                ) : (
                  <button type="button" className="mb-2 btn btn-secondary mr-2">
                    탈퇴
                  </button>
                )}
                {edit ? (
                  <>
                    <button
                      type="submit"
                      className="mb-2 btn btn-primary mr-2"
                      onClick={handleSubmit}>
                      저장
                    </button>
                  </>
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

export default BreadBossDetail;
