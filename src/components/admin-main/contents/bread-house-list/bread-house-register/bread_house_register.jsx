import React from 'react';

// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { TimePicker } from 'antd';
import moment from 'moment';

function BreadHoustList() {
  const format = 'HH:mm';

  return (
    <>
      <div className="col-lg-12 mb-4 mt-10">
        <form>
          <div
            className="card card-small mb-5 mt-5"
            style={{
              padding: '5%'
            }}>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵집이름
              </span>

              <div className="form-group col-5">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="name"
                />
              </div>
            </div>

            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵집주소
              </span>

              <div className="form-group col-5">
                <button type="button" className="btn btn-primary">
                  주소검색
                </button>
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵집 전화번호
              </span>
              <div className="form-group col-5">
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="핸드폰 번호를 입력해 주세요"
                  name="phoneNumber"
                />
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                영업시간
              </span>
              <div className="form-group col-5">
                {/* <DatePicker
                  // selected={this.state.startDate}
                  // onChange={this.handleChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="LLL"
                /> */}
                <input
                  type="time"
                  name="time"
                  style={{
                    padding: '4px 11px 4px',
                    border: '1px solid #d9d9d9'
                  }}
                  id="timepicker"
                  value="00:00"
                />
                {/* <TimePicker
                  defaultValue={moment('12:08', format)}
                  format={format}
                  placeholderText="시작시간"
                  name="시작 시간"
                /> */}
                <span className="col-3"> ~ </span>
                {/* <TimePicker
                  defaultValue={moment('12:08', format)}
                  format={format}
                  placeholderText="시작시간"
                  // value="시작시간"
                /> */}
                <input
                  type="time"
                  name="time"
                  style={{
                    padding: '4px 11px 4px',
                    border: '1px solid #d9d9d9'
                  }}
                  id="timepicker"
                  value="00:00"
                />
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                홈페이지
              </span>

              <div className="form-group col-5">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="name"
                />
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                휴일
              </span>

              <div className="form-group col-5">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="name"
                />
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                사진
              </span>

              <div className="form-group col-5">
                <button type="file" className="btn btn-primary">
                  사진업로드
                </button>
                {/* <input type="file">인풋 사진 업로드</input> */}
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                메뉴사진
              </span>

              <div className="form-group col-5">
                <button type="button" className="btn btn-primary">
                  사진업로드
                </button>
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵 선택
              </span>

              <div className="form-group col-5">
                <button type="button" className="btn btn-primary">
                  빵 선택
                </button>
              </div>
            </div>
            <div className="row justify-content-start mb-3">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                빵집 계정
              </span>

              <div className="form-group col-5">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="내용을 입력해 주세요"
                  name="name"
                />
              </div>
            </div>
            {/* <div className="row justify-content-start">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                프로필 사진
              </span>
              <div className="form-group col-5">
                <div className="input-group mb-3">
                  <input type="file" className="form-control" name="profileName" />
                  <label className="input-group-text">Upload</label>
                </div>
                <div className="image_wrap">
                  <img className="img" alt="bread_boss" />
                  <div className="button_wrap" role="button" tabIndex={0} aria-hidden="true">
                    <Xbutton />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col mb-4 mt-5">
              <div className="col text-right">
                <button type="button" className="mb-2 btn btn-secondary mr-2">
                  취소
                </button>
                <button type="submit" className="mb-2 btn btn-primary mr-2">
                  등록
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BreadHoustList;
