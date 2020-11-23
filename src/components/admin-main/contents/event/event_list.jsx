import React from 'react';
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom';
import './event_list.css';

import Resgister from './event-register/event_register';

const EventList = () => {
  return (
    <>
      <div className="event_wrap">
        <div>
          <h1 className="text">검색조건</h1>

          <form>
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
          </form>

          <div className="search nav justify-content-end">
            <button type="button" className="btn btn-secondary btn-sm col-1">
              초기화
            </button>
            <button type="button" className="btn btn-primary btn-sm col-1">
              검색
            </button>
          </div>
        </div>

        <div className="event_table">
          <div className="button_wrap nav justify-content-end">
            <BrowserRouter>
              <Link to="/event/register" className="btn btn-primary col-2 register">
                등록하러가기
              </Link>
              <Switch>
                <Route exact path="/register" component={Resgister} />
              </Switch>
            </BrowserRouter>
          </div>

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
                      <tr>
                        <td>1</td>
                        <td>파리바게트(클릭시 이동)</td>
                        <td>
                          <a href="/">www.naver.com(클릭시 새창)</a>
                        </td>
                        <td>2020-11-23</td>
                        <td>2020-12-31</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>투썸</td>
                        <td>
                          <a href="/">www.naver.com(클릭시 새창)</a>
                        </td>
                        <td>2020-11-23</td>
                        <td>2020-12-31</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>등등</td>
                        <td>
                          <a href="/">www.naver.com(클릭시 새창)</a>
                        </td>
                        <td>2020-11-23</td>
                        <td>2020-12-31</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventList;
