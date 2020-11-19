import React from 'react';
import './event_list.css';

const EventList = () => {
  return (
    <>
      <div className="event_wrap">
        <div>
          <h1 className="text">검색조건</h1>

          <form>
            <div className="form-group row">
              <label
                forHtml="colFormLabelLg"
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
                forHtml="colFormLabelLg"
                className="col-xs-2 col-form-label col-form-label-lg title"
              >
                <span>날짜</span>
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control form-control-lg input"
                  id="colFormLabelLg"
                />
              </div>
              <span className="text2">~</span>
              <div className="col-sm-4">
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
            <button type="button" className="btn btn-secondary btn-sm col-2">
              초기화
            </button>
            <button type="button" className="btn btn-primary btn-sm col-2">
              검색
            </button>
          </div>
        </div>

        <div className="event_table">
          <div className="button_wrap nav justify-content-end">
            <button type="button" className="btn btn-primary col-2">
              등록하기
            </button>
          </div>
          <table class="table table-hover table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">이벤트idx</th>
                <th scope="col">이벤트제목</th>
                <th scope="col">이벤트링크</th>
                <th scope="col">시작날짜</th>
                <th scope="col">마감날짜</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EventList;
