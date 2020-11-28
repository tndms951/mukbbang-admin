import React, { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';

import './event_register.css';

import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);

/**
 * @author 이벤트(등록하러가기)
 */

const Resgister = () => {
  // 달력 날짜 변경 시 기준점이 되는 날짜
  const [startDate, setStartDate] = useState(new Date());

  // https://reactdatepicker.com/ 참고
  const ExampleCustomInput = ({ value, onClick }) => (
    <button class="example-custom-input" onClick={onClick}>
      {' '}
      {value}{' '}
    </button>
  );

  // 월/일
  const getFormattedDate = (date) => {
    const month = date.toLocaleDateString('ko-KR', { month: 'long' });
    const day = date.toLocaleDateString('ko-KR', { day: 'numeric' });
    return `${month.substr(0, month.length - 1)}/${day.substr(0, day.length - 1)}`;
  };

  // 요일 반환
  const getDayName = (date) => {
    return date.toLocaleDateString('ko-KR', { weekday: 'long' }).substr(0, 1);
  };

  // 날짜 비교시 년 월 일까지만 비교하게끔
  const createDate = (date) => {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  };

  return (
    <>
      <div className="container">
        <form className="form_wrap">
          <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title"
            >
              <span className="text1">이벤트 제목</span>
            </label>
            <div className="col-sm-5">
              <input
                type="email"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="제목을 입력해주세요"
              />
            </div>
          </div>
          <div className="form-group input-group input-group-lg row justify-content-start">
            <label htmlFor="colFormLabelLg" className="col-xs-2 col-form-label title">
              <span className="text1">이벤트 이미지</span>
            </label>
            <div className="custom-file event_inage_input col-xl-6">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />

              <label className="custom-file-label image_label" htmlFor="inputGroupFile01">
                이미지를 첨부해주세요
              </label>
            </div>

            <div className="delect_button col-xl-5 delect_button">
              <button type="button" className="btn btn-secondary col-sm-2 btn-pull-right">
                삭제
              </button>
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title"
            >
              <span className="text1">이벤트 링크</span>
            </label>
            <div className="col-sm-5">
              <input
                type="email"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="링크를 입력해주세요"
              />
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title"
            >
              <span className="text1">이벤트 날짜</span>
            </label>
            <div className="col-sm-5">
              <input
                type="email"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="링크를 입력해주세요"
              />
            </div>
          </div>

          <DatePicker
            locale="ko" // 달력 한글화
            selected={startDate} // 날짜 state
            onChange={setStartDate} // 날짜 설정 콜백 함수
            customInput={<ExampleCustomInput />}
            minDate={new Date()} // 과거 날짜 disable
            popperModifiers={{
              // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
              preventOverflow: { enabled: true },
            }}
            popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
            // 토요일, 일요일 색깔 바꾸기 위함
            dayClassName={(date) =>
              getDayName(createDate(date)) === '토'
                ? 'saturday'
                : getDayName(createDate(date)) === '일'
                ? 'sunday'
                : undefined
            }
          />

          <div className="search nav justify-content-end row">
            <button type="button" className="btn btn-secondary btn-sm col-1">
              취소
            </button>
            <button type="button" className="btn btn-primary btn-sm col-1">
              저장
            </button>
          </div>
        </form>
      </div>

      {/* <div className="event_register container">
        <form className="form_wrap">
          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title"
            >
              <span className="text1">이벤트 제목</span>
            </label>
            <div className="col-sm-5">
              <input
                type="email"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="제목을 입력해주세요"
              />
            </div>
          </div>

          <div className="event_image">
            <div className="form-group input-group input-group-lg row">
              <label htmlFor="colFormLabelLg" className="col-xs-2 col-form-label title">
                <span className="text1">이벤트 이미지</span>
              </label>
              <div className="custom-file event_inage_input">
                <input
                  type="file"
                  className="custom-file-input form-control"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />

                <label
                  className="custom-file-label image_label col-sm-7"
                  htmlFor="inputGroupFile01"
                >
                  이미지를 첨부해주세요
                </label>
              </div>
            </div>
            <div className="delect_button rouw">
              <button type="button" className="btn btn-secondary col-sm-2 btn-pull-right">
                삭제
              </button>
            </div>
          </div>

          <div className="search nav justify-content-end row">
            <button type="button" className="btn btn-secondary btn-sm col-1">
              초기화
            </button>
            <button type="button" className="btn btn-primary btn-sm col-1">
              검색
            </button>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default Resgister;
