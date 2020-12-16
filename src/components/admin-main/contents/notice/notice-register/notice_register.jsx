import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import qs from 'qs';
import axios from '../../../../utils/axios';

import 'react-datepicker/dist/react-datepicker.css';

/**
 * @author 송지은
 * */

function NoticeRegister({ history, location }) {
  const [value, setValue] = useState({
    title: '',
    content: '',
    startDate: null
  });

  // 시작 날짜, 끝 날짜
  // const [startDate, setStartDate] = useState(null);

  const [noticeId, setNoticeId] = useState(null);

  const { title, content, startDate } = value;

  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    const fetchData = async () => {
      try {
        const { status, data: noticeData } = await axios.get(`/admin/notice/${query.id}`);
        if (status === 200) {
          const { data } = noticeData;
          setValue({
            title: data.title,
            content: data.content,
            startDate: new Date(data.startAt)
          });
        }
        // console.log(noticeData);
      } catch (err) {
        if (err && err.response) {
          const { data } = err.response;
          const { message } = data;
          alert(message);
        } else {
          alert('네트워크가 불안정합니다. 다시 시도해 주세요.');
        }
      }
    };
    if (query && query.noticeId) {
      setNoticeId(query.noticeId);
      fetchData();
    }
  }, []);

  // 폼 내용 변경시 사용되는 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerObject = {
        title: value.title,
        startAt: moment(startDate).format('YYYY-MM-DD'),
        content: value.content
      };
      const { status } = noticeId
        ? await axios.put(`/admin/notice/${noticeId}`, registerObject)
        : await axios.post('/admin/notice', registerObject);
      // const { status, data: registerData } = await axios.post('/admin/notice', registerObject);
      if (status === 201) {
        // console.log(registerData);
        history.push(noticeId ? `/notice/${noticeId}` : '/notice');
      }
    } catch (err) {
      console.log('에러');
      if (err && err.response) {
        console.log(err.response);
        const { data } = err.response;
        const { message } = data;
        alert(message);
        console.log(data);
      } else {
        alert('네트워크가 불안정합니다. 다시 시도해 주세요.');
      }
    }
  };

  // 제목, 내용 handelchange
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  // 날짜 handlechange
  const handleDate = (date) => {
    console.log(date);
    setValue({
      ...value,
      startDate: date
    });
  };

  return (
    <>
      <div
        className="wrap_template container"
        style={{
          margin: '4% auto 35% auto'
        }}>
        <form className="quick-post-form form-grop" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="row">
              <label className="col-sm-2 form_font col-form-label">공지사항 제목</label>
              <input
                type="text"
                className="form-control col-sm-9 mb-3"
                id="exampleInputEmail1"
                placeholder="제목을 입력해 주세요"
                onChange={handleChange}
                name="title"
                value={title}
              />
            </div>
            <div className="row">
              <label className=" col-sm-2 form_font col-form-label mb-3">공지사항 날짜</label>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={handleDate} // value 값이 바뀔때
                locale="ko" // 달력 한글화
                placeholderText="처음 날짜를 선택하세요"
                name="setStartDate"
                value={startDate}
              />
            </div>
            <div className="row">
              <label className="col-sm-2 form_font col-form-label">공지사항 내용</label>
              <textarea
                className="form-control col-sm-9 mb-3"
                placeholder="내용을 입력해 주세요"
                onChange={handleChange}
                name="content"
                value={content}
              />
            </div>
          </div>
          <div className="row-sm-8">
            <span
              className="col-sm-8"
              style={{
                marginLeft: '72%'
              }}
            />
            <button type="button" className="col-sm-1 btn btn-secondary mr-2">
              취소
            </button>
            <button type="submit" className="col-sm-1 btn btn-accent">
              {noticeId ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NoticeRegister;
