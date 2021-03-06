import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import qs from 'qs';

// 리덕스 부분
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import axios from '../../../utils/axios';
import { selectNoticeList } from '../../../../redux/notice/notice.selectors';
import { setNoticeList } from '../../../../redux/notice/notice.actions';
import { errorhandler } from '../../../utils/common';

import './notice_list.css';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * @author 송지은
 * */

function NoticeList({ noticeList, onNoticeList, location, history }) {
  // 달력 날짜 변경 시 기준점이 되는 시작 날짜 끝 날짜
  const [startDate, setStartDate] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const noticeListApiCall = async () => {
      try {
        const query = qs.parse(location.search, {
          ignoreQueryPrefix: true
          // 문자열 맨 앞에 ?를 생략
        });
        const { status, data: noticeData } = await axios.get(`/admin/notice${location.search}`);

        if (status === 200) {
          onNoticeList(noticeData.list);
          setTitle(query.title || '');
          setStartDate(query.startDate ? new Date(query.startDate) : null);
        }
      } catch (err) {
        errorhandler(err);
      }
    };
    noticeListApiCall();
  }, [location.search, onNoticeList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // eslint-disable-next-line object-curly-newline
    const queryObject = {};

    if (title) {
      queryObject.title = title;
    }
    if (startDate) {
      queryObject.startDate = moment(startDate).format('YYYY-MM-DD');
    }
    const queryData = qs.stringify(queryObject);
    history.push(`/notice${queryData ? `?${queryData}` : ''}`);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleReset = () => {
    setTitle('');
    setStartDate(null);
  };

  return (
    <div className="wrap_template card-header">
      <div className="border-bottom mb-5">
        <h2 className="row justify-content-md-start m-3">검색조건</h2>
      </div>
      <form className="form_wrap" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="inputEmail3" className="h3 col-sm-1 col-form-label">
            제목
          </label>
          <div className="input-group mb-3 col">
            <input
              type="text"
              className="form-control"
              placeholder="제목을 입력해주세요"
              aria-describedby="basic-addon2"
              value={title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <label htmlFor="inputPassword3" className="h3 col-sm-1">
            날짜
          </label>
          <div className="input-group col-sm-11">
            <DatePicker
              className="form-control col"
              selected={startDate}
              onChange={setStartDate} // value 값이 바뀔때
              locale="ko" // 달력 한글화
              placeholderText="처음 날짜를 선택하세요"
            />
          </div>
        </div>
        <div className="button-group row justify-content-md-end">
          <button
            type="button"
            className="submit mb-2 btn btn-secondary mr-2"
            onClick={handleReset}>
            초기화
          </button>
          <button type="submit" className="submit mb-2 btn btn-primary mr-1">
            검색
          </button>
        </div>
        <div
          className="button-group submit_wrap row justify-content-md-end"
          style={{
            marginBottom: '2%',
            marginTop: '5%'
          }}>
          <Link to="/notice/notice_register">
            <button type="button" className="mb-2 btn btn-outline-primary mr-1">
              등록하기
            </button>
          </Link>
        </div>
      </form>
      <div className="row">
        <div className="col">
          <div className="mb-4">
            <div className="card-header border-bottom">
              <h6 className="m-0">검색 결과</h6>
            </div>
            <div className="p-0 pb-3 text-center">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      공지사항 제목
                    </th>
                    <th scope="col" className="border-0">
                      내용
                    </th>
                    <th scope="col" className="border-0">
                      시작날짜
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {noticeList.map((noticeData) => (
                    <tr key={`notice-list${noticeData.id}`}>
                      <th>{noticeData.id}</th>
                      <td>
                        {/* <Link to={noticeData.link}>{noticeData.link}</Link> */}
                        <Link to={`/notice/notice_detail/${noticeData.id}`}>
                          {noticeData.title}
                        </Link>
                      </td>
                      <td>{noticeData.content}</td>
                      <td>{noticeData.startAt.substring(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav
                aria-label="Page navigation example "
                style={{
                  width: '18%',
                  margin: '8% auto 0 auto'
                }}>
                <ul className="pagination">
                  <li className="page-item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NoticeList.propTypes = {
  noticeList: PropTypes.instanceOf(Array).isRequired,
  onNoticeList: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = createStructuredSelector({
  noticeList: selectNoticeList
});

const mapDispatchToProps = (dispatch) => ({
  onNoticeList: (list) => dispatch(setNoticeList(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoticeList);
