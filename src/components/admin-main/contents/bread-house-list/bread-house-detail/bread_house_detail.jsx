/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';

import '../bread-house-register/bread_house_register.css';
import arrowDown from '../../../../../images/arrow.png';

// import ReactImage from '../../../../../images/react.png';

/**
 * @author 송지은
 * */

function BreadHoustList({ match }) {
  // 서버에서 받아온 값 저장
  const [houseDetail, setHouseDetail] = useState([]);

  console.log(houseDetail);

  useEffect(() => {
    const { houseId } = match.params;

    const BreadHouseDetailApiCall = async () => {
      try {
        const { status, data: houseData } = await axios.get(`/admin/bread/shop/${houseId}`);
        if (status === 200) {
          console.log(' 200 연결 성공');
          setHouseDetail(houseData.data);
        }
      } catch (err) {
        errorhandler(err);
      }
    };
    BreadHouseDetailApiCall();
  }, [match.params]);

  // const format = 'HH:mm';

  // 모달
  const el = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  // 오픈 모달
  // const opneModal = () => {
  //   document.body.classList.add('Modal_Overflow');
  //   setModalOpen(true);
  // };

  // 클로짓 모달
  const closeModal = () => {
    document.body.classList.remove('Modal_Overflow');
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="col-lg-12 mb-4 mt-10"
        style={{
          width: '90%', margin: '0 auto'
        }}>
        <form>
          <div
            className="card card-small mb-5 mt-5"
            style={{
              padding: '5%'
            }}>
            <div className="form-wrap">
              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  빵집이름
                </span>

                <div className="form-group col-5">
                  {/* <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="내용을 입력해 주세요"
                    name="name"
                /> */}
                  <span className="col-sm-8"> {houseDetail.title} </span>
                </div>
              </div>

              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  빵집주소
                </span>

                <div className="form-group col-5 adressbox">
                  {/* <button type="button" className="btn" onClick={opneModal}>
                  주소검색
                </button> */}
                  <span className="col-sm-8">sss</span>
                </div>
                {/* {modalOpen && (
                <>
                  <div className="Modal-overlay" ref={el} onClick={closeModal} />
                  <div className="Modal">
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control title col-9 mr-2"
                        id="inputPassword4"
                        placeholder="내용을 입력해 주세요"
                        name="name"
                      />
                      <button type="submit" className="btn btn-primary">
                        검색
                      </button>
                      <button type="button" onClick={closeModal}>
                        X
                      </button>
                    </div>
                    <div className="content">
                      <ul>
                        <li>
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora
                          nulla, non molestiae dicta ducimus. Et unde laborum eveniet ex quod
                          doloribus quae, aliquam beatae atque, vero assumenda rem quo?
                        </li>
                      </ul>
                      <ul className="content">
                        <li>
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora
                          nulla, non molestiae dicta ducimus. Et unde laborum eveniet ex quod
                          doloribus quae, aliquam beatae atque, vero assumenda rem quo?
                        </li>
                      </ul>
                    </div>
                    <div className="button-wrap">
                      <button> Confirm </button>
                    </div>
                  </div>
                </>
              )} */}
              </div>
              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  빵집 전화번호
                </span>
                <div className="form-group col-5">
                  {/* <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="핸드폰 번호를 입력해 주세요"
                  name="phoneNumber"
                /> */}
                  <span className="col-sm-8"> 01029385829498</span>
                </div>
              </div>
              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  영업시간
                </span>
                <div className="form-group col-7 date">
                  {/* <select defaultValue="시작시간">
                  <option value="시작시간">
                    시작시간
                  </option>
                  <option value="00:00">00:00</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </select> */}
                  <span className="col-sm-8"> {houseDetail.openTime} </span>

                  <span className="col-3"> ~ </span>

                  <span className="col-sm-8"> {houseDetail.closeTime} </span>

                  {/* <select defaultValue="마감시간">
                  <option value="마감시간">
                    마감시간
                  </option>
                  <option value="00:00">00:00</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </select> */}
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
                  {/* <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="name"
                /> */}
                  <span className="col-sm-8"> {houseDetail.link} </span>
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
                  {/* <label>
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
                </label> */}
                  <span className="col-sm-8">
                    {houseDetail.holidays}
                  </span>
                </div>
              </div>
              <div className="row justify-content-start mb-3">
                <span
                  className="col-2"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  내부사진
                </span>
              </div>
              {/* <div className="form-group col-5 filebox">
                  <label htmlFor="ex_file">사진 업로드</label>
                  <input type="file" id="ex_file" />
                </div> */}
              <div className="d-flex row">
                <div className="col-2" />
                <div className="d-flex rounded row mb-5 ml-3 bread_image_box col-8">
                  <div
                    className="card col-5 mb-3 mt-3 bread_interior rounded">
                    <img
                      className="card-img-top"
                      src={houseDetail.images}
                      alt="사진"
                      style={{
                        marginTop: '10px'
                      }} />
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
                  메뉴사진
                </span>
              </div>
              {/* <div className="form-group col-5 filebox">
                  <label htmlFor="ex_file">사진 업로드</label>
                  <input type="file" id="ex_file" />
                </div> */}
              <div className="d-flex row">
                <div className="col-2" />
                <div className="d-flex rounded row mb-5 ml-3 bread_image_box col-8">
                  <div
                    className="card col-5 mb-3 mt-3 bread_interior rounded">
                    <img
                      className="card-img-top"
                      src={arrowDown}
                      alt="사진"
                      style={{
                        marginTop: '10px'
                      }} />
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
                  빵 선택
                </span>
              </div>
              {/*
                <div className="form-group col-7 d-flex bread_search">
                  <input
                    type="text"
                    className="form-control mr-2"
                    id="inputPassword4"
                    placeholder="내용을 입력해 주세요"
                    name="name"
                />
                  <button type="submit" className="btn btn-primary">
                    검색
                  </button>
                </div> */}

              <div className="d-flex row">
                <div className="col-2" />
                <div className="d-flex rounded row mb-5 ml-3 bread_image_box col-8">
                  <div
                    className="card col-5 mb-3 mt-3 bread_interior rounded">
                    <img
                      className="card-img-top"
                      src={arrowDown}
                      alt="사진"
                      style={{
                        marginTop: '10px'
                      }} />
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
                {/*
                <div className="form-group col-5 d-flex">
                  <input
                    type="text"
                    className="form-control mr-2"
                    id="inputPassword4"
                    placeholder="내용을 입력해 주세요"
                    name="name"
                />
                  <button type="submit" className="btn btn-primary">
                    검색
                  </button>
                </div> */}
                <span className="col-sm-8"> 43</span>
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
                <div className="col text-right mt-3">
                  <Link to="/bread_house_list">
                    <div
                      className="mb-2 btn btn-secondary mr-2"
                      style={{
                        color: 'white'
                      }}>
                      <button type="button"> 목록으로 가기 </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

BreadHoustList.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
};

export default BreadHoustList;
