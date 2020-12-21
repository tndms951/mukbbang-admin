import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';

import axios from '../../../../utils/axios';
import './event_detail.css';

const Detail = ({ match, history }) => {
  const [value, setValue] = useState({
    title: '',
    imageUrl: '',
    link: '',
    startAt: '',
    endAt: ''
  });
  console.log(value);

  // 서버에 받아온 값 저장
  const [listDate, setListDate] = useState(null);

  // 수정,취소 값 버튼
  const [modify, setModify] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { eventId } = match.params;
        // console.log(eventId);
        const { status, data: detailData } = await axios.get(`/admin/event/${eventId}`);
        if (status === 200) {
          const { data } = detailData;
          console.log(detailData);
          setListDate(data);
        }
      } catch (err) {
        if (err && err.response) {
          const { data } = err.response;
          const { message } = data;
          alert(message);
        } else {
          alert('네트원크가 불안정합니다. 다시 시도해 주세요');
        }
      }
    }
    fetchData();
  }, []);

  // 수정 취소 버튼시
  const handleEdit = (e) => {
    e.preventDefault();

    setModify(!modify);
    setValue({
      title: listDate.title,
      imageUrl: listDate.imageUrl,
      link: listDate.link,
      startAt: new Date(listDate.startAt),
      endAt: new Date(listDate.endAt)
    });
  };

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
      if (err && err.response) {
        const { data } = err.response;
        const { message } = data;
        alert(message);
      } else {
        alert('네트워크가 불안정합니다. 다시 시도해주세요');
      }
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

  // 저장 핸들써브밋
  const handleSubmit = async () => {
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
        // console.log('수정성공');
        if (value.startAt === value.endAt) {
          alert('날짜를 다시 선택해주세요');
        } else {
          alert('오류');
        }
      }
    } catch (err) {
      if (err && err.response) {
        const { data } = err.response;
        const { message } = data;
        alert(message);
      } else {
        alert('네트워크가 불안정합니다. 다시 시도해 주세요');
      }
    }
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
          {!modify ? (
            <div className="custom-file event_inage_input col-sm-6">
              <input
                type="file"
                name="registerImage"
                className="custom-file-input"
                onChange={handleChange}
              />
              <label
                className="custom-file-label image_label  event_image_label rounded"
                htmlFor="inputGroupFile01">
                {value.imageUrl}
              </label>
            </div>
          ) : (
            <div className="custom-file event_inage_input col-sm-6 wrap1">
              <span className="contentName">
                {listDate && <img src={listDate.imageUrl} alt="이벤트 이미지" className="image" />}
              </span>
            </div>
          )}
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
                // onChange={handleChange}
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
            <button type="button" className="btn btn-primary btn-sm col-1" onClick={handleSubmit}>
              저장
            </button>
          ) : (
            <button type="submit" className="btn btn-primary btn-sm col-1" onClick={handleEdit}>
              수정
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Detail;
