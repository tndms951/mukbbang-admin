import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../utils/axios';
import './event_list.css';

const EventList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { status, data: eventData } = await axios.get('/admin/event1');
        console.log(eventData);
        if (status === 200) {
          setList(eventData.list);
        }
      } catch (err) {
        if (err && err.response) {
          // console.log(err.response); response는 콘솔에 찍을 수 없음
          const { data } = err.response;
          console.log(err.response);
          alert(data.message);
        } else {
          alert('네트워크가 불안정합니다. 다시 시도해주세요');
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="event_wrap">
        <h1 className="text">검색조건</h1>

        <form className="form_wrap">
          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title"
            >
              <span>제목</span>
            </label>
            <div className="col-sm-8">
              <input
                type="email"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="제목을 입력해주세요"
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title"
            >
              <span>날짜</span>
            </label>
            <div className="col-sm-2">
              <input type="date" className="form-control form-control-lg" id="colFormLabelLg" />
            </div>
            <span className="text2">~</span>
            <div className="col-sm-2">
              <input
                type="date"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="col-form-label-lg"
              />
            </div>
          </div>

          <div className="search nav justify-content-end">
            <button type="button" className="btn btn-secondary btn-sm col-1">
              초기화
            </button>
            <button type="button" className="btn btn-primary btn-sm col-1">
              검색
            </button>
          </div>

          <div className="event_table">
            <div className="button_wrap nav justify-content-end">
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
                    {list.map((eventData) => (
                      <tr key={`event-list-${eventData.id}`}>
                        <td>{eventData.id}</td>
                        <td>{eventData.title}</td>
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
      </div>
    </>
  );
};

export default EventList;
