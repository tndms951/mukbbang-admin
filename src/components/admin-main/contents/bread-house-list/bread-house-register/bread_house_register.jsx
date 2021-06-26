/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import axios from '../../../../utils/axios';
import { errorhandler, daysList, sweetAlertWarning, sweetAlert } from '../../../../utils/common';

import Modal from '../../../../utils/Modal/adress';

import './bread_house_register.css';

/**
 * @author 송지은
 * */

function BreadHoustList({ history }) {
  const [breadRegister, setBreadRegister] = useState({
    name: '',
    addressName: '',
    addressLat: '',
    addressLon: '',
    detailAddress: '',
    number: '',
    parkingEnabled: true,
    opentime: '',
    closetime: '',
    homepage: '',
    holiday: [],
    checked: {
    },
    picture: '',
    menuPicture: '',
    choosebread: '',
    bossaccount: '',
    bossaccountId: ''
  });

  const {
    name,
    addressLat,
    addressLon,
    number,
    parkingEnabled,
    homepage,
    holiday,
    choosebread,
    bossaccount,
    detailAddress,
    addressName,
    opentime,
    closetime,
    bossaccountId
  } = breadRegister;

  // 영업시간 리스트
  const [openTimeList, setOpneTimeList] = useState([]);
  const [closeTimeList, setCloseTimeList] = useState([]);

  // 내부사진 업로드
  const [image, setImage] = useState([]);

  // 메뉴사진 업로드
  const [menuImage, setMenuImage] = useState([]);
  console.log(menuImage);

  // 빵 선택 서버에서 받아온 값
  const [chooseBreadData, setChooseBreadData] = useState([]);

  // 선택 이미지 매개변수 담는 함수
  const [selectedImagesID, setSelectedImagesID] = useState([]);
  console.log(selectedImagesID.map((list) => list.id));

  // 빵집 사장 서버에서 받온 값
  const [breadBossAccountData, setBreadBossAccountData] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name) {
        sweetAlert('빵집이름을 입력해 주세요');
      } else if (!addressName) {
        sweetAlert('주소를 입력해 주세요');
      } else if (!detailAddress) {
        sweetAlert('상세주소를 입력해 주세요');
      } else if (!number) {
        sweetAlert('빵집 전화번호를 입력해 주세요');
      } else if (!opentime) {
        sweetAlert('오픈시간을 입력해 주세요');
      } else if (!closetime) {
        sweetAlert('마감시간을 입력해 주세요');
      } else if (!homepage) {
        sweetAlert('홈페이지를 입력해 주세요');
      } else if (!holiday) {
        sweetAlert('휴일을 체크해 주세요');
      } else if (!image.length) {
        sweetAlert('내부 이미지를 넣어 주세요');
      } else if (!menuImage.length) {
        sweetAlert('메뉴 이미지를 넣어 주세요');
      } else if (!selectedImagesID.length) {
        sweetAlert('빵 선택을 해주세요');
      } else if (!bossaccountId) {
        sweetAlert('빵집 사장 계정을 입력해 주세요');
      } else {
        const shopObject = {
          title: name,
          link: homepage,
          storeNumber: number,
          parkingEnabled,
          openTime: opentime,
          closeTime: closetime,
          shopUserId: bossaccountId,
          lat: addressLat,
          lon: addressLon,
          address: addressName,
          detailAddress,
          imageUrlShop: image,
          imageUrlMenu: menuImage,
          day: holiday,
          breadId: selectedImagesID.map((list) => list.id)
        };

        const { status } = await axios.post('/admin/bread/shop', shopObject);
        if (status === 201) {
          history.push('/bread_house_list');
        }
      }
    } catch (err) {
      errorhandler(err);
    }
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

  // 주차가능 핸들 체인지
  const enableParkingHandleChange = () => {
    setBreadRegister({
      ...breadRegister,
      parkingEnabled: !parkingEnabled
    });
  };

  // 휴일 핸들 체인지
  const holidayHandleChange = (e) => {
    const updateHoliday = [...breadRegister.holiday];
    const idx = updateHoliday.findIndex((item) => item === e.target.value);

    if (idx === -1) {
      updateHoliday.push(e.target.value);
    } else {
      updateHoliday.splice(idx, 1);
    }

    setBreadRegister({
      ...breadRegister,
      holiday: updateHoliday
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

  // 주소 핸들체인지
  const handleAddress = (addressData) => {
    setBreadRegister({
      ...breadRegister,
      addressLat: addressData.addressLat,
      addressLon: addressData.addressLon,
      addressName: addressData.addressName,
      address: ''
    });
    closeModal();
  };

  // 내부사진 핸들체인지
  const imageHandleChange = async (e) => {
    const imageFormData = new FormData();
    const file = e.target.files;

    try {
      const imagesArr = image.length + file.length;
      if (imagesArr > 8) {
        sweetAlertWarning('이미지는 최대 8장까지 입니다.');
        return;
      }

      for (let i = 0; i < file.length; i += 1) {
        imageFormData.append('imgFile', e.target.files[i]);
      }
      const { status, data: imageData } = await axios.post('/upload/bread/shop', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (status === 200) {
        const { data: { imageUrl: imagesUrl } } = imageData;

        setImage([...image, ...imagesUrl]);
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 메뉴사진 핸들체인지
  const menuImageHandleChange = async (e) => {
    const imageFormData = new FormData();

    try {
      const menuImageArr = menuImage.length + e.target.files.length;
      if (menuImageArr > 8) {
        sweetAlertWarning('이미지는 최대 8장까지 입니다.');
      }
      for (let i = 0; i < e.target.files.length; i += 1) {
        imageFormData.append('imgFile', e.target.files[i]);
      }
      const { status, data: menuData } = await axios.post('/upload/bread/menu', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (status === 200) {
        const { imageUrl } = menuData.data;
        setMenuImage([...menuImage, ...imageUrl]);
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 메뉴사진 클릭시 삭제
  const menuPicOnclick = (menuImage) => {
    console.log(menuImage);

    const copyArray = [...menuImage];
    const inx = copyArray.findIndex((list) => list.id === menuImage.id);

    console.log(inx);
    if (inx > -1) {
      copyArray.splice(inx, 1);
    }

    // const copyArray = [...selectedImagesID];
    // const idx = copyArray.findIndex((list) => list.id === breadData.id);

    // if (idx > -1) {
    //   copyArray.splice(idx, 1);
    //   setSelectedImagesID(copyArray);
    // }
  };

  // 빵 선택 온클릭
  const breadSelectOnclick = async () => {
    try {
      const queryObject = {
        title: choosebread
      };

      const queryData = qs.stringify(queryObject);

      const { status, data: breadData } = await axios.get(`/admin/bread?${queryData}`);
      if (!choosebread) {
        sweetAlert('빵 선택 값을 입력하세요');
      } else if (status === 200) {
        setChooseBreadData(breadData.list);
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 빵집 사장 계정 온클릭
  const breadBossAccountOnClick = async () => {
    try {
      const queryObjct = {
        name: bossaccount
      };

      const queryData = qs.stringify(queryObjct);

      const { status, data: accountData } = await axios.get(`/admin/shop?${queryData}`);
      if (status === 200) {
        setBreadBossAccountData(accountData.list);
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 빵집 사장 계정 리스트 온클릭
  const BossAccountListOnclick = (accountData) => {
    setBreadRegister({
      ...breadRegister,
      bossaccountId: accountData.id
    });
    // setShowBreadChoose(accountData.imageUrl);
  };

  // 빵 선택 키다운
  const breadSelectKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (breadRegister.choosebread) {
        breadSelectOnclick();
      }
    }
  };

  // 빵집 사장 계정 키다운
  const breadBossAccountKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (breadRegister.bossaccount) {
        breadBossAccountOnClick();
      }
    }
  };

  // 빵 선택 온클릭
  const imageListOnclick = (breadData) => {
    const copyArray = [...selectedImagesID];
    const idx = copyArray.findIndex((list) => list.id === breadData.id);

    if (idx === -1) {
      const index = chooseBreadData.findIndex((list) => list.id === breadData.id);

      copyArray.push(chooseBreadData[index]);
      setSelectedImagesID(copyArray);
    } else {
      sweetAlert('이미 선택된 빵 입니다');
    }
  };

  // 선택된 빵 삭제
  const removeImageListOnclick = (breadData) => {
    const copyArray = [...selectedImagesID];
    const idx = copyArray.findIndex((list) => list.id === breadData.id);

    if (idx > -1) {
      copyArray.splice(idx, 1);
      setSelectedImagesID(copyArray);
    }
  };

  return (
    <>
      {modalOpen && <Modal closeModal={closeModal} el={el} handleAddress={handleAddress} />}
      <div
        className="col-lg-12 mb-4 mt-10"
        style={{
          width: '90%', margin: '0 auto'
        }}>
        <form onSubmit={handleSubmit}>
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
                  className="col-2 input_title"
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
                      onChange={handleChange} />
                  )}
                </div>
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
                  <input
                    type="text"
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
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  영업시간
                </span>
                <div className="form-group col-7 date">
                  <select value={opentime} onChange={selectOpenHandleChange}>
                    <option value="" hidden>
                      시작시간
                    </option>
                    {openTimeList.map((list, index) => (
                      <option value={list} key={`time-list${index}`} name={list}>
                        {list}
                      </option>
                    ))}
                  </select>

                  <span className="col-3"> ~ </span>

                  <select value={closetime} onChange={selectCloseHandleChange}>
                    <option value="" hidden>
                      마감시간
                    </option>
                    {closeTimeList.map((lista, index) => (
                      <option value={lista} key={`time-list${index}`}>
                        {lista}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  주차가능 여부
                </span>
                {/*
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
                </div> */}
                <div className="form-group col-8 checkbox">
                  <label>
                    <input className="mr-2" type="radio" name="enableparking" checked={!!parkingEnabled} onChange={enableParkingHandleChange} />가능
                  </label>
                  <label>
                    <input className="mr-2" type="radio" name="enableparking" checked={!parkingEnabled} onChange={enableParkingHandleChange} />불가능
                  </label>
                </div>
              </div>

              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
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
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  휴일
                </span>

                <div className="form-group col-8 checkbox">
                  {daysList.map((days, index) => (
                    <label key={`holiday-list${index}`}>
                      <input type="checkbox" name="date" value={days} onChange={holidayHandleChange} checked={holiday.includes(days)} />{days}
                    </label>
                  ))}
                </div>
              </div>

              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  내부사진
                </span>

                <div className="form-group col-5 filebox">
                  {/* <button type="file" className="btn btn-primary">
                  인풋 사진 업로드
                </button> */}
                  <label htmlFor="insideImages">사진 업로드</label>
                  <input type="file" id="insideImages" onChange={imageHandleChange} multiple accept="image/*" />
                  {/* <button>사진 업로드</button> */}
                </div>
              </div>

              <div className="d-flex row">
                <div className="col-2" />
                {image.length ? (
                  <div className="d-flex rounded row mb-5 ml-3 bread_image_box col-8">
                    {image.map((img, index) => (
                      <div
                        className="card col-5 mb-3 mt-3 bread_interior rounded"
                        key={`image-url${index}`}>
                        <img
                          className="card-img-top"
                          src={img}
                          alt="사진"
                          style={{
                            marginTop: '10px'
                          }} />
                      </div>
                    ))}
                  </div>
                ) : ''}
              </div>

              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  메뉴사진
                </span>

                <div className="form-group col-5 filebox">
                  <label htmlFor="menuImages">사진 업로드</label>
                  <input type="file" id="menuImages" onChange={menuImageHandleChange} multiple accept="image/*" />
                </div>
              </div>

              <div className="d-flex row">
                <div className="col-2" />
                {menuImage.length ? (
                  <div className="d-flex rounded row mb-3 ml-3 bread_image_box col-8">
                    {menuImage.map((menu, index) => (
                      <div
                        className="card col-5 mb-3 mt-3 bread_container rounded"
                        key={`image-menu-url${index}`}
                        onClick={() => menuPicOnclick(menuImage)}>
                        <img className="card-img-top" src={menu} alt="사진" />
                      </div>
                    ))}
                  </div>
                ) : ''}
              </div>

              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  빵 선택
                </span>

                <div className="form-group col-5 d-flex bread_search">
                  <input
                    type="text"
                    className="form-control mr-2"
                    id="inputPassword4"
                    placeholder="내용을 입력해 주세요"
                    name="choosebread"
                    value={choosebread}
                    onChange={handleChange}
                    onKeyDown={breadSelectKeyDown}
                    />
                  <button type="button" className="btn btn-primary" onClick={breadSelectOnclick}>
                    검색
                  </button>
                </div>
              </div>

              <div className="d-flex row">
                <div className="col-2" />
                {chooseBreadData.length ? (
                  <div className="d-flex rounded row mb-3 ml-3 bread_image_box col-8">
                    {chooseBreadData.map((breadData, index) => (
                      <div
                        className="col-5 mb-3 mt-3 bread_container rounded"
                        key={`choose-Bread${index}`}
                        onClick={() => imageListOnclick(breadData)}>
                        <img className="card-img-top" src={breadData.images[0].imageUrl} alt="사진" />
                      </div>
                    ))}
                  </div>
                ) : ''}
              </div>

              {/* // 선택된 빵 */}
              <div className="d-flex row">
                <div className="col-2" />
                {selectedImagesID.length ? (
                  <div className="rounded mb-3 ml-3 bread_image_box col-8">
                    <h4 className="choosebread">선택된 빵</h4>
                    <div className="wraped_bread">
                      {selectedImagesID.map((breadData, index) => (
                        <div
                          className="col-5 mb-3 mt-3 bread_container rounded"
                          key={`choosed-Bread${index}`}
                          onClick={() => removeImageListOnclick(breadData)}>
                          <img className="card-img-top" src={breadData.images[0].imageUrl} alt="사진" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : ''}
              </div>

              <div className="row justify-content-start mb-3">
                <span
                  className="col-2 input_title"
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
                    onKeyDown={breadBossAccountKeyDown}
                />
                  <button type="button" className="btn btn-primary" onClick={breadBossAccountOnClick}>
                    검색
                  </button>
                </div>
              </div>

              <div className="row justify-content-start mb-3">
                <div className="col-2" />
                {breadBossAccountData.length ? (
                  <div
                    className="d-flex rounded row mb-3 ml-3 col-8 bread-boss-account-wrap"
                    style={{
                      background: '#f2f2f2',
                      borderRadius: '20px'
                    }}>
                    <ul className="bread-boss-account">
                      {breadBossAccountData.map((accountData) => (
                        <li className="bread-boss-account-list" key={`accound-id${accountData.id}`} onClick={() => BossAccountListOnclick(accountData)}>{accountData.name}</li>
                      ))}
                    </ul>
                  </div>
                ) : ''}
              </div>
              <div className="col mb-4 mt-5">
                <div className="col text-right">
                  <Link to="/bread_house_list">
                    <button type="button" className="mb-2 btn btn-secondary mr-2">
                      취소
                    </button>
                  </Link>
                  <button type="submit" className="mb-2 btn btn-primary mr-2">
                    등록
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BreadHoustList;
