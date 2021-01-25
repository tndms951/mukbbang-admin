import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import moment from 'moment';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import axios from '../../../../utils/axios';
import { errorhandler, sweetAlertConfirm } from '../../../../utils/common';

// 캘린더 한국어 지정
registerLocale('ko', ko);

function NoticeDetail({ match, history }) {
  const [value, setValue] = useState({
    title: '',
    content: '',
    startDate: ''
  });

  const [notice, setNotice] = useState(null);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const { noticeId } = match.params;
    const noticeDetailApiCall = async () => {
      try {
        const { status, data: detailData } = await axios.get(`/admin/notice/${noticeId}`);
        if (status === 200) {
          const { data } = detailData;
          setNotice(data);
        }
      } catch (err) {
        errorhandler(err);
      }
    };
    noticeDetailApiCall();
  }, [match.params]);

  // 삭제 api 연결
  const onDeleteClick = async () => {
    const { noticeId } = match.params;

    const confirm = await sweetAlertConfirm(
      '해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.'
    );
    if (confirm) {
      try {
        const { status } = await axios.delete(`/admin/notice/${noticeId}`);
        if (status === 200) {
          history.push('/notice');
        }
      } catch (err) {
        errorhandler(err);
      }
    }
  };

  // 목록으로 바로 가기
  const onClicklist = () => {
    history.push('/notice');
  };

  // textarea 핸들체인지
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

  // 저장 핸들써브밋
  const handleSubmit = async () => {
    const { noticeId } = match.params;
    try {
      const modifyObject = {
        title: value.title,
        content: value.content,
        startAt: moment(value.startDate).format('YYYY-MM-DD')
      };

      const { status } = await axios.put(`/admin/notice/${noticeId}`, modifyObject);
      if (status === 201) {
        setNotice({
          ...value,
          title: value.title,
          content: value.content,
          startAt: value.startDate
        });
        setEdit(!edit);
      }
    } catch (err) {
      if (err && err.response) {
        const { data } = err.response;
        const { message } = data;
        Swal.fire(message);
      }
    }
  };

  // 수정 온클릭
  const handleEdit = (e) => {
    // e.preventDefault();

    setEdit(!edit);
    setValue({
      title: notice.title,
      content: notice.content,
      startDate: new Date(notice.startAt)
    });
  };

  return (
    <>
      <div
        className="card-body"
        style={{
          margin: '4% auto 35%'
        }}>
        <form className="quick-post-form">
          <div>
            <div
              className="row justify-content-center"
              style={{
                marginBottom: '3%'
              }}>
              <label
                className="col-sm-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                공지사항 제목
              </label>
              {edit ? (
                <input
                  type="text"
                  className="form-control col-sm-8"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="제목을 입력해주세요"
                  onChange={handleChange}
                  name="title"
                  value={value.title}
                />
              ) : (
                <span className="col-sm-8">{notice && notice.title}</span>
              )}
            </div>
            <div
              className="row justify-content-center"
              style={{
                marginBottom: '3%'
              }}>
              <label
                className="col-sm-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '0px'
                }}>
                공지사항 날짜
              </label>
              <div
                className="col-sm-8"
                style={{
                  paddingLeft: '0px',
                  display: 'flex'
                }}>
                {edit ? (
                  <DatePicker
                    className="form-control"
                    selected={value.startDate}
                    onChange={handleDate} // only when value has changed
                    locale="ko" // 달력 한글화
                    placeholderText="처음 날짜를 선택하세요"
                    name="setStartDate"
                    value={value.startDate}
                  />
                ) : (
                  // <p>하이하이!!</p>
                  <span className="col-sm-8">
                    {notice && moment(notice.startAt).format('YYYY-MM-DD')}
                  </span>
                )}
              </div>
            </div>
            <div
              className="row justify-content-center"
              style={{
                marginBottom: '10%'
              }}>
              <label
                className="col-sm-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                공지사항 내용
              </label>
              {edit ? (
                <textarea
                  className="form-control col-sm-8"
                  placeholder="내용을 압력해 주세요"
                  value={value.content}
                  name="content"
                  onChange={handleChange}>
                  {value.content}
                </textarea>
              ) : (
                <span className="col-sm-8">{notice && notice.content}</span>
              )}
            </div>
            <div className="mb-0 row ">
              <div className="col-sm-9" />
              <div className="col-sm-3 text-right">
                {edit ? (
                  <button
                    type="button"
                    className="delete btn btn-danger"
                    style={{
                      marginRight: '2%',
                      width: '49%'
                    }}
                    onClick={handleEdit}>
                    취소
                  </button>
                ) : (
                  <button
                    type="button"
                    className="delete btn btn-danger"
                    style={{
                      marginRight: '2%',
                      width: '49%'
                    }}
                    onClick={onDeleteClick}>
                    삭제
                  </button>
                )}
                {edit ? (
                  <button
                    type="button"
                    className="modify btn btn-accent"
                    style={{
                      width: '49%'
                    }}
                    onClick={handleSubmit}>
                    저장
                  </button>
                ) : (
                  <button
                    type="button"
                    className="modify btn btn-accent"
                    style={{
                      width: '49%'
                    }}
                    onClick={handleEdit}>
                    수정
                  </button>
                )}
              </div>

              <div className="col-sm-9 text-right" />
              <hr />
              <button
                type="submit"
                className="btn btn-secondary col-sm-1"
                style={{
                  width: '100%',
                  marginTop: '5%',
                  marginLeft: '9%'
                }}
                onClick={onClicklist}>
                목록
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

NoticeDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default NoticeDetail;
