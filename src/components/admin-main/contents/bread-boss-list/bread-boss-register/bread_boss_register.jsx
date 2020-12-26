import React, { useState } from 'react';

import axios from '../../../../utils/axios';
import { sweetAlert, errorhandler, sweetAlertSuccess } from '../../../../utils/common';

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
  console.log(profile);

  const { name, phoneNumber } = value;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    console.log(profile);
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
        const { status, data: bossData } = await axios.post('/admin/shop', shopObject);
        if (status === 201) {
          console.log(bossData);
          history.push('/bread_boss_list');
          sweetAlertSuccess('등록 연결 성공 !!!!');
        }
      }
    } catch (err) {
      // console.log(err);
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
    // console.log(e.target.files[0]);
    // console.log(profile);
    try {
      const { name } = e.target.files[0];
      const profileFormData = new FormData();
      profileFormData.append('imgFile', e.target.files[0]);
      // console.log(e.target.files[0].name);
      // console.log('try문 탓어요 !!!!!');
      const { status, data: profileData } = await axios.post('/upload/user', profileFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      if (status === 200) {
        // console.log('200번 성공 !!!!');
        const { data } = profileData;
        // console.log(e.target.files[0]);
        // console.log(name);

        // console.log(data);
        // console.log(status);
        setProfile({
          ...profile,
          profileName: name,
          profileUrl: data.imageUrl
        });
        // console.log(name);
        // console.log(data.imageUrl);
      }
    } catch (err) {
      errorhandler(err);
      // console.log('에러 !!!!!!');
    }
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
                  id="inputPassword4"
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
                  id="inputPassword4"
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
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    name="profileName"
                    // value={profileName}
                    onChange={profileHandleChange}
                  />
                  <label className="input-group-text">Upload</label>
                </div>
              </div>
            </div>
            <div className="col mb-4 mt-5">
              <div className="col text-right">
                <button type="button" className="mb-2 btn btn-secondary mr-2">
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

export default BreadBossRegister;
