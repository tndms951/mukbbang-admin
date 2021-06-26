import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import qs from 'qs';
import DatePicker from 'react-datepicker';

import axios from '../../../utils/axios';
import { setCurrentEvent } from '../../../../redux/event/event.actions';
import { selectEventList } from '../../../../redux/event/event.selectors';
import PageNation from '../pagenation/pagenation';
import { errorhandler } from '../../../utils/common';

import './event_list.css';

const EventList = ({ eventList, onEventList, history, location }) => {
  // 검색조회
  const [title, setTitle] = useState('');

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = qs.parse(location.search, {
          ignoreQueryPrefix: true
        });

        const { status, data: eventData } = await axios.get(`/admin/event${location.search}`);
        if (status === 200) {
          onEventList(eventData.list);
          setTitle(query.title || '');
          setStartDate(query.startDate ? new Date(query.startDate) : null);
          setEndDate(query.endDate ? new Date(query.endDate) : null);
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    fetchData();
  }, [location.search, onEventList]);

  // title 핸들체인지
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  // 초기화 버튼
  const handleReset = () => {
    setTitle('');
    setStartDate(null);
    setEndDate(null);
  };

  // 검색조회
  const handleSearch = (e) => {
    e.preventDefault();

    // eslint-disable-next-line object-curly-newline
    const queryObject = {};

    if (title) {
      queryObject.title = title;
    }
    if (startDate) {
      queryObject.startDate = moment(startDate).format('YYYY-MM-DD');
    }
    if (endDate) {
      queryObject.endDate = moment(endDate).format('YYYY-MM-DD');
    }
    const queryData = qs.stringify(queryObject);

    history.push(`/event${queryData ? `?${queryData}` : ''}`);
  };

  return (
    <>
      <div className="event_wrap">
        <h1 className="text">검색조건</h1>

        <form className="form_wrap" onSubmit={handleSearch}>
          <div className="event-form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span>제목</span>
            </label>
            <div className="col-sm-8">
              <input
                type="title"
                className="form-control form-control-lg"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="event-form-group row justify-content-start align-items-center">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span>날짜</span>
            </label>
            <div className="col-sm-10 myContainer">
              <DatePicker
                className="form-control form-control-lg input2"
                placeholderText="시작 날짜를 입력해주세요"
                dateFormat="yyyy-MM-dd"
                selected={startDate}
                onChange={setStartDate}
              />

              <span className="text2 wave">~</span>

              <DatePicker
                className="form-control form-control-lg input2"
                placeholderText="마지막 날짜를 입력해주세요"
                dateFormat="yyyy-MM-dd"
                selected={endDate}
                onChange={setEndDate}
              />
            </div>
          </div>

          <div className="event-search nav justify-content-end">
            <button
              type="button"
              className="btn btn-secondary btn-sm col-1 button_init"
              onClick={handleReset}>
              초기화
            </button>
            <button type="submit" className="btn btn-primary btn-sm col-1">
              검색
            </button>
          </div>

          <div className="event_register">
            <div className="event_button_wrap nav justify-content-end">
              <Link to="/event/event_register" className="btn btn-primary col-2 register">
                등록하러가기
              </Link>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col">
            <div className="card card-small mb-4">
              <div className="card-header border-bottom">
                <h6 className="m-0">Active Users</h6>
              </div>
              <div className="card-body p-0 pb-3 text-center">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        이벤트idx
                      </th>
                      <th scope="col" className="border-0">
                        이벤트제목
                      </th>
                      <th scope="col" className="border-0">
                        이벤트링크
                      </th>
                      <th scope="col" className="border-0">
                        시작날짜
                      </th>
                      <th scope="col" className="border-0">
                        마감날짜
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventList.map((eventData) => (
                      <tr key={`event-list${eventData.id}`}>
                        <td>{eventData.id}</td>
                        <td className="line">
                          <Link to={`/event/event_detail/${eventData.id}`}>{eventData.title}</Link>
                        </td>
                        <td>
                          <a href={eventData.link} target="_blank" rel="noopener noreferrer">
                            {eventData.link}
                          </a>
                        </td>
                        <td>{eventData.startAt.substring(0, 10)}</td>
                        <td>{eventData.endAt.substring(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <PageNation totalPage={12} currentPage={1} />
      </div>
    </>
  );
};

EventList.propTypes = {
  eventList: PropTypes.instanceOf(Array).isRequired,
  onEventList: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = createStructuredSelector({
  eventList: selectEventList
});

const mapDispathchToProps = (dispatch) => ({
  onEventList: (list) => dispatch(setCurrentEvent(list))
});

export default connect(mapStateToProps, mapDispathchToProps)(EventList);
