/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';

import './bread_house_register.css';
import arrowDown from '../../../../../images/arrow.png';
import ReactImage from '../../../../../images/react.png';

function BreadHoustList() {
  const [breadRegister, setBreadRegister] = useState({
    name: '',
    adress: '',
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

  const { name, number, homepage, choosebread, bossaccount } = breadRegister;

  // 영업시간 리스트
  const [timeList, setTimeList] = useState([]);
  // console.log(timeList);

  useEffect(() => {
    const newTime = [];
    for (let i = 0; i < 24; i += 1) {
      newTime.push(i);
      // console.log(newTime);
    }
    setTimeList(newTime);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(breadRegister);
  };

  const handleChange = (e) => {
    // setBreadRegister(e.currentTarget.value);
    setBreadRegister({
      ...breadRegister,
      [e.target.name]: e.target.value
    });
  };

  // console.log(timeList);
  // const format = 'HH:mm';

  // 모달
  const el = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  // 오픈 모달
  const opneModal = () => {
    document.body.classList.add('Modal_Overflow');
    setModalOpen(true);

    // 주소 api 받아옴
    const breadHouseAdressAipCall = async () => {
      try {
        console.log('try문 진입');
        const { status, data: aaa } = await axios.get('/util/address');
        console.log(aaa);

        if (status === 200) {
          console.log();
        }
      } catch (err) {
        errorhandler(err);
      }
    };
    breadHouseAdressAipCall();
  };

  // 클로짓 모달
  const closeModal = () => {
    document.body.classList.remove('Modal_Overflow');
    setModalOpen(false);
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

              <div className="form-group col-5 adressbox">
                <button type="button" className="btn" onClick={opneModal}>
                  주소검색
                </button>
              </div>
              {modalOpen && (
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
              )}
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
                <select defaultValue="시작시간">
                  <option value="시작시간" disabled>
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
                </select>
                {/* <img className="arrow_image" src={arrowDown} alt="화살표" /> */}

                <span className="col-3"> ~ </span>

                <select defaultValue="마감시간">
                  <option value="마감시간" disabled>
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
                  type="text"
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
