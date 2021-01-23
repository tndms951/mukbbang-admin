/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
// import axios from '../../../../utils/axios';
// import { errorhandler } from '../../../../utils/common';

import Modal from '../../../../utils/Modal/adress';

import arrowDown from '../../../../../images/arrow.png';
import ReactImage from '../../../../../images/react.png';

import './bread_house_register.css';

/**
 * @author 송지은
 * */

function BreadHoustList() {
  const [breadRegister, setBreadRegister] = useState({
    name: '',
    addressName: '',
    addressLat: '',
    addressLon: '',
    detailAddress: '',
    number: '',
    opentime: '',
    closetime: '',
    homepage: '',
    holiday: '',
    picture: '',
    menuPicture: '',
    choosebread: '',
    bossaccount: ''
  });
  console.log(breadRegister.opentime);
  console.log(breadRegister.closetime);

  const {
    name,
    number,
    homepage,
    choosebread,
    bossaccount,
    detailAddress,
    addressName,
    opentime,
    closetime
  } = breadRegister;

  // 영업시간 리스트
  const [openTimeList, setOpneTimeList] = useState([]);
  const [closeTimeList, setCloseTimeList] = useState([]);
  // console.log(openTimeList);
  // console.log(closeTimeList);

  useEffect(() => {
    const newTime = [];
    for (let i = 0; i < 24; i += 1) {
      if (i < 10) {
        newTime.push(`0${i}:00`);
      } else {
        newTime.push(`${i}:00`);
      }
    }

    const closeTime = [];
    for (let i = 0; i < 24; i += 1) {
      if (i < 10) {
        closeTime.push(`0${i}:00`);
      } else {
        closeTime.push(`${i}:00`);
      }
    }
    setOpneTimeList(newTime);
    setCloseTimeList(closeTime);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(breadRegister);
  };

  // 인풋 핸들체인지
  const handleChange = (e) => {
    setBreadRegister({
      ...breadRegister,
      [e.target.name]: e.target.value
    });
  };

  // 오픈시간 핸들 체인지
  const selectOpenHandleChange = (e) => {
    // openTimeList(e.target.value);
    // closeTimeList(e.target.value);
    // console.log(openTimeList);
    setBreadRegister({
      ...breadRegister,
      opentime: e.target.value
    });
  };

  // 마감시간 핸들 체인지
  const selectCloseHandleChange = (e) => {
    setBreadRegister({
      ...breadRegister,
      closetime: e.target.value
    });
  };

  // 모달
  const el = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  // 오픈 모달
  const opneModal = () => {
    setModalOpen(true);
  };

  // 클로짓 모달
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddress = (addressData) => {
    console.log(addressData);
    setBreadRegister({
      ...breadRegister,
      addressLat: addressData.addressLat,
      addressLon: addressData.addressLon,
      addressName: addressData.addressName,
      address: ''
    });
    closeModal();
  };

  return (
    <>
      {modalOpen && <Modal closeModal={closeModal} el={el} handleAddress={handleAddress} />}
      <div className="col-lg-12 mb-4 mt-10">
        <form onSubmit={handleSubmit}>
          <div
            className="card card-small mb-5 mt-5"
            style={{
              padding: '5%'
            }}>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵집이름
              </span>

              <div className="form-group col-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="내용을 입력해 주세요"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵집주소
              </span>

              <div className="form-group col-5 addressbox">
                {addressName ? (
                  <span className="mr-3">{breadRegister.addressName}</span>
                ) : (
                  <span>{breadRegister.addressName}</span>
                )}

                <button type="button" className="btn" onClick={opneModal}>
                  주소검색
                </button>
                {addressName && (
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="상세주소를 입력해 주세요"
                    name="detailAddress"
                    value={detailAddress}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵집 전화번호
              </span>
              <div className="form-group col-5">
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="핸드폰 번호를 입력해 주세요"
                  name="number"
                  value={number}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                영업시간
              </span>
              <div className="form-group col-5 date">
                {/* <input
                  type="time"
                  name="time"
                  style={{
                    padding: '4px 11px 4px',
                    border: '1px solid #d9d9d9'
                  }}
                  id="timepicker"
                  value="00:00"
                /> */}

                <select value={opentime} onChange={selectOpenHandleChange}>
                  <option value="시작시간" disabled>
                    시작시간
                  </option>
                  {openTimeList.map((list, index) => (
                    <option value={list} key={`time-list${index}`} name={list}>
                      {list}
                    </option>
                  ))}
                </select>
                {/* <img className="arrow_image" src={arrowDown} alt="화살표" /> */}

                <span className="col-3"> ~ </span>

                <select value={closetime} onChange={selectCloseHandleChange}>
                  <option value="마감시간" disabled>
                    마감시간
                  </option>
                  {closeTimeList.map((lista, index) => (
                    <option value={lista} key={`time-list${index}`}>
                      {lista}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="time"
                  name="time"
                  style={{
                    padding: '4px 11px 4px',
                    border: '1px solid #d9d9d9'
                  }}
                  id="timepicker"
                  value="00:00"
                /> */}
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                홈페이지
              </span>

              <div className="form-group col-5">
                <input
                  type="url"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="homepage"
                  value={homepage}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                휴일
              </span>

              <div className="form-group col-5 checkbox">
                <label>
                  <input type="checkbox" name="date" value="월" /> 월
                </label>
                <label>
                  <input type="checkbox" name="date" value="화" /> 화
                </label>
                <label>
                  <input type="checkbox" name="date" value="수" /> 수
                </label>
                <label>
                  <input type="checkbox" name="date" value="목" /> 목
                </label>
                <label>
                  <input type="checkbox" name="date" value="금" /> 금
                </label>
                <label>
                  <input type="checkbox" name="date" value="토" /> 토
                </label>
                <label>
                  <input type="checkbox" name="date" value="일" /> 일
                </label>
              </div>
            </div>
            {/* <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                휴일
              </span>

              <div className="form-group col-5">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="name"
                />
              </div>
            </div> */}
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                사진
              </span>

              <div className="form-group col-5 filebox">
                {/* <button type="file" className="btn btn-primary">
                  인풋 사진 업로드
                </button> */}
                <label htmlFor="ex_file">사진 업로드</label>
                <input type="file" id="ex_file" />
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                메뉴사진
              </span>

              <div className="form-group col-5 filebox">
                {/* <button type="button" className="btn btn-primary">
                  사진업로드
                </button> */}
                <label htmlFor="ex_file">사진 업로드</label>
                <input type="file" id="ex_file" />
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵 선택
              </span>

              <div className="form-group col-7 d-flex bread_search">
                <input
                  type="text"
                  className="form-control mr-2"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="choosebread"
                  value={choosebread}
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary">
                  검색
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between rounded row mb-3 ml-5 bread_image_box">
              {/* <span className="col-2"> </span> */}

              <div
                className="card col-5 mb-3 mt-3 bread_container"
                style={{
                  maxWidth: '13rem'
                }}>
                <img className="card-img-top" src={arrowDown} alt="사진" />
                <div className="card-body">
                  <p className="card-text">This is Pizza bread.</p>
                </div>
              </div>

              <div
                className="card col-5 mb-3 mt-3 bread_container"
                style={{
                  maxWidth: '13rem'
                }}>
                <img className="card-img-top" src={ReactImage} alt="사진" />
                <div className="card-body">
                  <p className="card-text">This is Pizza bread.</p>
                </div>
              </div>

              <div
                className="card col-5 mb-3 mt-3 bread_container"
                style={{
                  maxWidth: '13rem'
                }}>
                <img className="card-img-top" src={arrowDown} alt="사진" />
                <div className="card-body">
                  <p className="card-text">This is Pizza bread.</p>
                </div>
              </div>

              <div
                className="card col-5 mb-3 mt-3 bread_container"
                style={{
                  maxWidth: '13rem'
                }}>
                <img className="card-img-top" src={ReactImage} alt="사진" />
                <div className="card-body">
                  <p className="card-text">This is Pizza bread.</p>
                </div>
              </div>

              <div
                className="card col-5 mb-3 mt-3 bread_container"
                style={{
                  maxWidth: '13rem'
                }}>
                <img className="card-img-top" src={arrowDown} alt="사진" />
                <div className="card-body">
                  <p className="card-text">This is Pizza bread.</p>
                </div>
              </div>
              <div
                className="card col-5 mb-3 mt-3 bread_container"
                style={{
                  maxWidth: '13rem'
                }}>
                <img className="card-img-top" src={ReactImage} alt="사진" />
                <div className="card-body">
                  <p className="card-text">This is Pizza bread.</p>
                </div>
              </div>
            </div>
            <div className="rounded row mb-3 ml-5 bread_image_box">
              <h4
                className="col-5 "
                style={{
                  outline: '1px solid red'
                }}>
                선택한 빵
              </h4>
              <div
                className="d-flex justify-content-between"
                style={{
                  width: '100%'
                }}>
                <div
                  className="card col-5 mb-3 mt-3 bread_container"
                  style={{
                    maxWidth: '13rem'
                  }}>
                  <img className="card-img-top" src={ReactImage} alt="사진" />
                  <div className="card-body">
                    <p className="card-text">This is Pizza bread.</p>
                  </div>
                </div>
                <div
                  className="card col-5 mb-3 mt-3 bread_container"
                  style={{
                    maxWidth: '13rem'
                  }}>
                  <img className="card-img-top" src={ReactImage} alt="사진" />
                  <div className="card-body">
                    <p className="card-text">This is Pizza bread.</p>
                  </div>
                </div>
                <div
                  className="card col-5 mb-3 mt-3 bread_container"
                  style={{
                    maxWidth: '13rem'
                  }}>
                  <img className="card-img-top" src={ReactImage} alt="사진" />
                  <div className="card-body">
                    <p className="card-text">This is Pizza bread.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵집 사장 계정
              </span>

              <div className="form-group col-5 d-flex">
                <input
                  type="text"
                  className="form-control mr-2"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="bossaccount"
                  value={bossaccount}
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary">
                  검색
                </button>
              </div>
            </div>
            {/* <div className="row justify-content-start">
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
                  <input type="file" className="form-control" name="profileName" />
                  <label className="input-group-text">Upload</label>
                </div>
                <div className="image_wrap">
                  <img className="img" alt="bread_boss" />
                  <div className="button_wrap" role="button" tabIndex={0} aria-hidden="true">
                    <Xbutton />
                  </div>
                </div>
              </div>
            </div> */}
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

export default BreadHoustList;
