import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import qs from 'qs';
import PropTypes from 'prop-types';

import axios from '../../../../utils/axios';
import { sweetAlert, errorhandler } from '../../../../utils/common';

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
      } catch (err) {
        errorhandler(err);
      }
    };
    if (query && query.noticeId) {
      setNoticeId(query.noticeId);
      fetchData();
    }
  }, [location.search]);

  // 폼 내용 변경시 사용되는 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title) {
        sweetAlert('제목을 입력해주세요.');
      } else if (!startDate) {
        sweetAlert('날짜를 입력해주세요.');
      } else if (!content) {
        sweetAlert('내용을 입력해주세요.');
      } else {
        const registerObject = {
          title,
          startAt: moment(startDate).format('YYYY-MM-DD'),
          content
        };
        const { status } = noticeId
          ? await axios.put(`/admin/notice/${noticeId}`, registerObject)
          : await axios.post('/admin/notice', registerObject);
        if (status === 201) {
          history.push(noticeId ? `/notice/${noticeId}` : '/notice');
        }
      }
    } catch (err) {
      errorhandler(err);
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

NoticeRegister.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default NoticeRegister;
