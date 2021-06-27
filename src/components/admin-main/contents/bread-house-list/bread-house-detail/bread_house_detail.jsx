/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

import axios from '../../../../utils/axios';
import { sweetAlert, errorhandler, sweetAlertConfirm, sweetAlertWarning, daysList } from '../../../../utils/common';
import '../bread-house-register/bread_house_register.css';
import arrowDown from '../../../../../images/arrow.png';
import Modal from '../../../../utils/Modal/adress';
// import ReactImage from '../../../../../images/react.png';

/**
 * @author 송지은
 * */

function BreadHoustList({ match, history }) {
  const [value, setValue] = useState({
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
    holidays: [],
    checked: {
    },
    picture: '',
    menuPicture: [],
    choosebread: [],
    bossaccount: '',
    bossaccountId: ''
  });

  const {
    name,
    addressName,
    addressLat,
    addressLon,
    detailAddress,
    number,
    parkingEnabled,
    opentime,
    closetime,
    homepage,
    holidays,
    checked,
    picture,
    menuPicture,
    choosebread,
    bossaccount,
    bossaccountId
  } = value;

  // 서버에서 받아온 값 저장
  const [houseDetail, setHouseDetail] = useState(null);

  // 모달
  const el = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  // 취소, 수정 초기값
  const [edit, setEdit] = useState(false);

  // 오픈시간 값
  const [openTimeList, setOpenTimeList] = useState([]);

  // 마감시간 값
  const [closeTimeList, setCloseTimeList] = useState([]);

  // 내부사진 업로드
  const [image, setImage] = useState([]);

  // 메뉴사진 업로드
  const [menuImage, setMenuImage] = useState([]);

  // 빵 선택 서버에서 받아온 값
  const [chooseBreadData, setChooseBreadData] = useState([]);

  // 선택 이미지 매개변수 담는 함수
  const [selectedImagesID, setSelectedImagesID] = useState([]);

  const BreadHouseDetailApiCall = async () => {
    try {
      const { houseId } = match.params;
      const { status, data: houseData } = await axios.get(`/admin/bread/shop/${houseId}`);

      if (status === 200) {
        setHouseDetail(houseData.data);
        setEdit(false);
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  useEffect(() => {
    BreadHouseDetailApiCall();
  }, [match.params]);

  // 오픈 모달
  const opneModal = () => {
    document.body.classList.add('Modal_Overflow');
    setModalOpen(true);
  };

  // 클로짓 모달
  const closeModal = () => {
    document.body.classList.remove('Modal_Overflow');
    setModalOpen(false);
  };

  // 빵집 주소 인풋 핸들체인지
  // const breadAddresshandleChange = (e) => {
  //   setHouseDetail({
  //     ...houseDetail,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // 취소 핸들써브밋
  const cancleHandleSubmit = () => {
    setEdit(!edit);
  };

  // 삭제 핸들써브밋
  const deleteHandleSubmit = async () => {
    const { houseId } = match.params;
    const confirm = await sweetAlertConfirm(
      '해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.'
    );
    if (confirm) {
      try {
        const { status } = await axios.delete(`/admin/bread/shop/${houseId}`);
        if (status === 200) {
          history.push('/bread_house_list');
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    // setEdit(!edit)
  };

  // 수정 핸들써브밋
  const modifyHandleSubmit = () => {
    setEdit(!edit);

    setValue({
      name: houseDetail.title,
      addressName: houseDetail.address.address,
      addressLat: houseDetail.address.lat,
      addressLon: houseDetail.address.lon,
      detailAddress: houseDetail.address.detailAddress,
      number: houseDetail.storeNumber,
      parkingEnabled: houseDetail.parkingEnabled,
      opentime: houseDetail.openTime,
      closetime: houseDetail.closeTime,
      homepage: houseDetail.link,
      holidays: houseDetail.holidays,
      checked: {
      },
      // image: selectedImagesID,
      // menuPicture: [houseDetail.menuImages],
      bossaccount: houseDetail.shopUser.name,
      bossaccountId: houseDetail.shopUser.id
    });
    setImage(houseDetail.images);
    setMenuImage(houseDetail.menuImages);

    // 영업시간 인풋 값
    const openTime = [];
    for (let i = 0; i < 24; i += 1) {
      if (i < 10) {
        openTime.push(`0${i}:00`);
      } else {
        openTime.push(`${i}:00`);
      }
    }

    // 마감시간 인풋 값
    const closeTime = [];
    for (let i = 0; i < 24; i += 1) {
      if (i < 10) {
        closeTime.push(`0${i}:00`);
      } else {
        closeTime.push(`${i}:00`);
      }
    }

    setOpenTimeList(openTime);
    setCloseTimeList(closeTime);
    setSelectedImagesID(houseDetail.bread);
    setImage(houseDetail.images);
    setMenuImage(houseDetail.menuImages);
  };

  // 저장 핸들써브밋
  const saveHandleSubmit = async () => {
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
      } else if (!holidays) {
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
        const { houseId } = match.params;
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
          day: holidays,
          breadId: selectedImagesID.map((list) => list.id)
        };

        const { status } = await axios.put(`/admin/bread/shop/${houseId}`, shopObject);
        if (status === 201) {
          BreadHouseDetailApiCall();
        }
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 빵집 텍스트 수정 핸들체인지
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  // 주차가능 핸들 체인지
  const enableParkingHandleChange = () => {
    setValue({
      ...value,
      parkingEnabled: !parkingEnabled
    });
  };

  // 휴일 핸들 체인지
  const holidayHandleChange = (e) => {
    const updateHoliday = [...value.holidays];

    const idx = updateHoliday.findIndex((item) => item === e.target.value);

    if (idx === -1) {
      updateHoliday.push(e.target.value);
    } else {
      updateHoliday.splice(idx, 1);
    }

    setValue({
      ...value,
      holidays: updateHoliday
    });
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

  // 빵 선택 키다운
  const breadSelectKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (value.choosebread) {
        breadSelectOnclick();
      }
    }
  };

  // 주소 핸들체인지
  const handleAddress = (addressData) => {
    setValue({
      ...value,
      addressLat: addressData.addressLat,
      addressLon: addressData.addressLon,
      addressName: addressData.addressName,
      address: ''
    });
    closeModal();
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

  // 내부사진 삭제
  const removeOnClick = (index) => {
    const copyArray = [...image];

    if (index !== -1) {
      copyArray.splice(index, 1);
      setImage(copyArray);
    }
  };

  // 메뉴사진 클릭시 삭제
  const menuPicOnclick = (index) => {
    const copyArray = [...menuImage];

    if (index !== -1) {
      copyArray.splice(index, 1);
      setMenuImage(copyArray);
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
                  {!edit ? (
                    <span className="col-sm-8">{houseDetail?.title || ''}</span>)
                    : (
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="내용을 입력해 주세요"
                        onChange={handleChange}
                        value={name}
                        name="name" />
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
                  빵집주소
                </span>

                <div className="form-group col-7 adressbox">
                  {!edit ? (
                    <>
                      {/* <span className="col-sm-8">주소</span><span className="col-sm-8">상세주소</span> */}
                      <span className="col-sm-8">{houseDetail ? houseDetail.address.address : ''}</span><span className="col-sm-8">{houseDetail ? houseDetail.address.detailAddress : ''}</span>
                    </>
                  ) : (
                    <>
                      <button type="button" className="btn btn-primary" onClick={opneModal}>
                        주소검색
                      </button>
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="상세주소를 입력해 주세요"
                        name="addressName"
                        value={addressName}
                        onChange={handleChange} />
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="상세주소를 입력해 주세요"
                        name="detailAddress"
                        value={detailAddress}
                        onChange={handleChange} />
                    </>
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
                  {!edit ? <span className="col-sm-8">{houseDetail?.storeNumber || ''}</span> : (
                    <input
                      type="number"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="핸드폰 번호를 입력해 주세요"
                      onChange={handleChange}
                      value={number}
                      name="number" />
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
                  영업시간
                </span>
                <div className="form-group col-7 date">
                  {!edit ? (
                    <>
                      <span className="col-sm-8"> {houseDetail?.openTime || ''}</span>
                      <span className="col-3"> ~ </span>
                      <span className="col-sm-8"> {houseDetail?.closeTime || ''}</span>
                    </>
                  ) : (
                    <>
                      <select defaultValue={opentime}>
                        <option>
                          오픈시간
                        </option>
                        {openTimeList.map((openList, index) => (
                          <option value={openList} key={`open-time-list${index}`}>{openList}</option>
                        ))}
                      </select>
                      <span className="col-3"> ~ </span>
                      <select defaultValue={closetime}>
                        <option>
                          마감시간
                        </option>
                        {closeTimeList.map((closeList, index) => (
                          <option value={closeList} key={`close-time-list${index}`}>{closeList}</option>
                        ))}
                      </select>
                    </>
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
                  주차가능 여부
                </span>
                {!edit ? (
                  <div className="form-group col-5">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    <span className="col-sm-8">{houseDetail ? houseDetail.parkingEnabled ? '가능' : '불가능' : ''}</span>
                  </div>

                ) : (
                  <div className="form-group col-8 checkbox">
                    <label>
                      <input className="mr-2" type="radio" name="enableparking" checked={!!parkingEnabled} onChange={enableParkingHandleChange} />가능
                    </label>
                    <label>
                      <input className="mr-2" type="radio" name="enableparking" checked={!parkingEnabled} onChange={enableParkingHandleChange} />불가능
                    </label>
                  </div>
                )}

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
                  {!edit ? <span className="col-sm-8">{houseDetail?.link || ''}</span> : (
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="내용을 입력해 주세요"
                      name="homepage"
                      value={homepage}
                      onChange={handleChange} />
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
                  휴일
                </span>

                <div className="form-group col-5 checkbox">
                  {!edit ? (
                    <span className="col-sm-8">
                      {houseDetail ? houseDetail.holidays.join(', ') : ''}
                    </span>
                  ) : (
                    daysList.map((dayList, index) => (
                      <label key={`holiday-list${index}`}>
                        <input type="checkbox" name="date" value={dayList} onChange={holidayHandleChange} checked={holidays.includes(dayList)} />{dayList}
                      </label>
                    )))}
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
                {edit ? (
                  <div className="form-group col-5 filebox">
                    <label htmlFor="interrior_images">사진 업로드</label>
                    <input type="file" id="interrior_images" onChange={imageHandleChange} multiple accept="image/*" />
                  </div>
                ) : '' }
              </div>

              <div className="d-flex row">
                <div className="col-2" />
                <div className="d-flex rounded row mb-5 ml-3 bread_image_box col-8">
                  {edit ? image && image.map((list, index) => (
                    <div className="card col-5 mb-3 mt-3 bread_interior rounded" key={`interior-images${index}`} onClick={() => removeOnClick(index)}>
                      <img
                        className="card-img-top"
                        src={list}
                        alt="사진"
                        style={{
                          marginTop: '10px'
                        }} />
                    </div>
                  )) : houseDetail && houseDetail.images.map((list, index) => (
                    <div className="card col-5 mb-3 mt-3 bread_interior rounded" key={`interior-images${index}`} onClick={() => removeOnClick(index)}>
                      <img
                        className="card-img-top"
                        src={list}
                        alt="사진"
                        style={{
                          marginTop: '10px'
                        }} />
                    </div>
                  ))}
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
                {edit ? (
                  <div className="form-group col-5 filebox">
                    <label htmlFor="menu_images">사진 업로드</label>
                    <input type="file" id="menu_images" onChange={menuImageHandleChange} multiple accept="image/*" />
                  </div>
                ) : ''}
              </div>

              <div className="d-flex row">
                <div className="col-2" />
                <div className="d-flex rounded row mb-5 ml-3 bread_image_box col-8">
                  {edit ? menuImage && menuImage.map((menuimage, index) => (
                    <div className="card col-5 mb-3 mt-3 bread_interior rounded" key={`menu-images${index}`} onClick={() => menuPicOnclick(index)}>
                      <img
                        className="card-img-top"
                        src={menuimage}
                        alt="사진"
                        style={{
                          marginTop: '10px'
                        }} />
                    </div>
                  )) : houseDetail && houseDetail.menuImages.map((list, index) => (
                    <div className="card col-5 mb-3 mt-3 bread_interior rounded" key={`interior-images${index}`} onClick={() => removeOnClick(index)}>
                      <img
                        className="card-img-top"
                        src={list}
                        alt="사진"
                        style={{
                          marginTop: '10px'
                        }} />
                    </div>
                  ))}
                  {}
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
                {edit ? (
                  <div className="form-group col-7 d-flex bread_search">
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
                ) : ''}
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
                {edit ? (
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
                ) : (
                  <div className="d-flex rounded row mb-5 ml-3 bread_image_box col-8">
                    <h4
                      className="choosebread"
                      style={{
                        width: '100%'
                      }}>선택된 빵
                    </h4>
                    {houseDetail && houseDetail.bread.map((breadlist) => (
                      <div className="card col-5 mb-3 mt-3 bread_interior rounded" key={`bread-list${breadlist.id}`}>
                        <img
                          className="card-img-top"
                          src={breadlist.images[0].imageUrl}
                          alt={breadlist.title}
                          style={{
                            marginTop: '10px'
                          }} />
                      </div>
                    ))}
                  </div>
                )}
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
                  {!edit ? (
                    <span className="col-sm-8">{houseDetail ? houseDetail.shopUser.name : ''}</span>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="form-control mr-2"
                        id="inputPassword4"
                        placeholder="내용을 입력해 주세요"
                        value={bossaccount}
                        name="bossaccount"
                        onChange={handleChange}
                        />
                      <button type="button" className="btn btn-primary">
                        검색
                      </button>
                    </>
                  )}
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
">
                  <img className="img" alt="bread_boss" />
                  <div className="button_wrap" role="button" tabIndex={0} aria-hidden="true">
                    <Xbutton />
                  </div>
                </div>
              </div>
            </div> */}
              <div className="col mb-4 mt-5">
                <div className="col text-right">
                  {edit ? (
                    <button type="button" className="mb-2 btn btn-danger mr-2" onClick={cancleHandleSubmit}>
                      취소
                    </button>
                  ) : (
                    <button type="button" className="mb-2 btn btn-danger mr-2" onClick={deleteHandleSubmit}>
                      삭제
                    </button>
                  )}
                  {edit ? (
                    <button type="button" className="mb-2 btn btn-primary mr-2" onClick={saveHandleSubmit}>
                      저장
                    </button>
                  ) : (
                    <button type="button" className="mb-2 btn btn-primary mr-2" onClick={modifyHandleSubmit}>
                      수정
                    </button>
                  )}
                </div>
                <div className="col text-right mt-3">
                  <Link to="/bread_house_list">
                    <div
                      className="mb-2 btn btn-secondary mr-2"
                      style={{
                        color: 'white'
                      }}>
                      <button type="button" className="btn-secondary"> 목록으로 가기 </button>
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
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default BreadHoustList;
