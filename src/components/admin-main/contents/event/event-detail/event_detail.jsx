/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';
import CloseButton from '../../../../shared/button/close_button';
import './event_detail.css';

const Detail = ({ match, history }) => {
  const [value, setValue] = useState({
    title: '',
    link: '',
    startAt: '',
    endAt: '',
    imageName: '이미지를 첨부해주세요',
    imageUrl: ''
  });

  // 서버에 받아온 값 저장
  const [listDate, setListDate] = useState(null);

  // 수정,취소 값 버튼
  const [modify, setModify] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { eventId } = match.params;
        const { status, data: detailData } = await axios.get(`/admin/event/${eventId}`);
        if (status === 200) {
          const { data } = detailData;
          setListDate(data);
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    fetchData();
  }, [match.params]);

  // 수정 취소 버튼시
  const handleEdit = (e) => {
    e.preventDefault();

    setModify(!modify);
    setValue({
      ...value,
      title: listDate.title,
      imageUrl: listDate.imageUrl,
      link: listDate.link,
      startAt: new Date(listDate.startAt),
      endAt: new Date(listDate.endAt)
    });
  };
  console.log(value);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const onDelete = async () => {
    try {
      const { eventId: eventId2 } = match.params;
      const { status } = await axios.delete(`/admin/event/${eventId2}`);
      if (status === 200) {
        history.push('/event');
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 시작날짜 핸들체인지
  const startChange = (date) => {
    setValue({
      ...value,
      startAt: date
    });
  };

  // 마지막날짜 핸들체인지
  const endChange = (date) => {
    setValue({
      ...value,
      endAt: date
    });
  };

  // 이미지 핸들체인지
  const ImagehandleChange = async (e) => {
    try {
      const { name } = e.target.files[0];
      const imageFormData = new FormData();
      imageFormData.append('imgFile', e.target.files[0]);
      const { status, data: imageData } = await axios.post('/upload/event', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (status === 200) {
        const { data } = imageData;
        setValue({
          ...value,
          imageName: name,
          imageUrl: data.imageUrl
        });
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 저장 핸들써브밋
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { eventId: eventId3 } = match.params;
      // const { title, imageUrl, link, startAt, endAt } = value;
      const putChange = {
        title: value.title,
        imageUrl: value.imageUrl,
        link: value.link,
        startAt: moment(value.startAt).format('YYYY-MM-DD'),
        endAt: moment(value.endAt).format('YYYY-MM-DD')
      };

      const { status } = await axios.put(`/admin/event/${eventId3}`, putChange);

      if (status === 201) {
        setListDate({
          ...value,
          title: value.title,
          imageUrl: value.imageUrl,
          link: value.link,
          startAt: value.startAt,
          endAt: value.endAt
        });
        setModify(!modify);
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 삭제버튼
  const resetInput = () => {
    setValue({
      ...value,
      imageName: '이미지를 첨부해주세요!!!',
      imageUrl: ''
    });
  };

  return (
    <div className="container event_wrap">
      <form className="form_wrap">
        <div className="form-group row justify-content-start">
          <label
            htmlFor="colFormLabelLg"
            className="col-xs-2 col-form-label col-form-label-lg title">
            <span className="text1">이벤트 제목</span>
          </label>
          {modify ? (
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="제목을 입력해주세요"
                onChange={handleChange}
                name="title"
                value={value.title}
              />
            </div>
          ) : (
            <div className="col-sm-7">
              <div className="col-sm-7 wrap1">
                <span className="contentName">{listDate && listDate.title}</span>
              </div>
            </div>
          )}
        </div>

        <div className="form-group input-group input-group-lg row justify-content-start">
          <label htmlFor="colFormLabelLg" className="col-xs-2 col-form-label title">
            <span className="text1">이벤트 이미지</span>
          </label>
          <div
            className="custom-file event_inage_input col-sm-6"
            style={{
              display: 'inline-flex',
              height: 'auto'
            }}>
            {modify ? (
              value.imageUrl ? (
                <div className="d-flex all_wrap">
                  <img src={value.imageUrl} alt="이벤트 이미지" className="image2" />
                  <div
                    className="button_wrap"
                    onClick={resetInput}
                    role="button"
                    tabIndex={0}
                    aria-hidden="true">
                    <CloseButton />
                  </div>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    name="registerImage"
                    className="custom-file-input"
                    onChange={ImagehandleChange}
                    // placeholder="" //파일에서는 placeholder가 안먹음!
                    // value={registerImage} //이미지에서는 value값 넣으면 에러!
                  />

                  <label
                    className="custom-file-label image_label  event_image_label rounded "
                    htmlFor="inputGroupFile01">
                    {value.imageName}
                  </label>
                </>
              )
            ) : (
              <div className="custom-file event_inage_input col-sm-6 wrap1">
                <span className="contentName">
                  {listDate && (
                    <img src={listDate.imageUrl} alt="이벤트 이미지" className="image" />
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="form-group row justify-content-start">
          <label
            htmlFor="colFormLabelLg"
            className="col-xs-2 col-form-label col-form-label-lg title">
            <span className="text1">이벤트 링크</span>
          </label>
          {modify ? (
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="링크를 입력해주세요"
                onChange={handleChange}
                name="link"
                value={value.link}
              />
            </div>
          ) : (
            <div className="col-sm-7 wrap1">
              <span className="contentName">{listDate && listDate.link}</span>
            </div>
          )}
        </div>

        <div className="form-group row justify-content-start align-items-center">
          <label
            htmlFor="colFormLabelLg"
            className="col-xs-2 col-form-label col-form-label-lg title">
            <span className="text1">이벤트 날짜</span>
          </label>
          {modify ? (
            <div className="col-sm-5 myContainer">
              <DatePicker
                className="form-control input2"
                locale="ko" // 달력 한글화
                selected={value.startAt} // 날짜 state
                placeholderText="시작 날짜를 입력해주세요"
                dateFormat="yyyy-MM-dd" // 여기서 y를 대문자로하면 에러남!
                onChange={startChange}
              />
              <span className="wave h5">~</span>
              <DatePicker
                className="form-control input2"
                locale="ko"
                selected={value.endAt}
                placeholderText="마지막 날짜를 입력해주세요"
                dateFormat="yyyy-MM-dd"
                onChange={endChange}
              />
            </div>
          ) : (
            <div className="col-sm-5 myContainer wrap1 contentName">
              {listDate && moment(listDate.startAt).format('YYYY-MM-DD')}
              <span className="wave h5">~</span>
              {listDate && moment(listDate.endAt).format('YYYY-MM-DD')}
            </div>
          )}
        </div>

        <div className="search nav justify-content-end row">
          {modify ? (
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={handleEdit}>
              취소
            </button>
          ) : (
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={onDelete}>
              삭제
            </button>
          )}
          {modify ? (
            <button
              type="submit"
              className="btn btn-primary btn-sm col-1 save_button"
              onClick={handleSubmit}>
              저장
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary btn-sm col-1 modify"
              onClick={handleEdit}>
              수정
            </button>
          )}
        </div>
        <div className="search nav justify-content-end home_wrap">
          <Link to="/event" className="btn btn-primary btn-sm col-2 home">
            목록
          </Link>
        </div>
      </form>
    </div>
  );
};

Detail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default Detail;
