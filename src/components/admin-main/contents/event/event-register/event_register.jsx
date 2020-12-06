import React, { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';

import './event_register.css';
import 'react-datepicker/dist/react-datepicker.css';

import ko from 'date-fns/locale/ko';

registerLocale('ko', ko);

/**
 * @author song-jisu / 이벤트(등록하러가기)
 */

function Resgister() {
  // formData
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    link: ''
  });
  console.log(formData);

  // 달력 날짜 변경 시 기준점이 되는 날짜
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { title, imageUrl, link } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="container event_wrap">
        <form className="form_wrap" onSubmit={handleSubmit}>
          <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title">
              <span className="text1">이벤트 제목</span>
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="제목을 입력해주세요"
                onChange={handleChange}
                value={title}
                name="title"
              />
            </div>
          </div>
          <div className="form-group input-group input-group-lg row justify-content-start">
            <label htmlFor="colFormLabelLg" className="col-xs-2 col-form-label title">
              <span className="text1">이벤트 이미지</span>
            </label>
            <div className="custom-file event_inage_input col-sm-6">
              <input
                type="file"
                name="imageUrl"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={handleChange}
                value={imageUrl}
              />

              <label
                className="custom-file-label image_label  event_image_label rounded"
                htmlFor="inputGroupFile01">
                이미지를 첨부해주세요
              </label>
            </div>

            <div className="delect_button col-xl-5 delect_button">
              <button
                type="button"
                className="btn btn-secondary col-sm-2 btn-pull-right delect_button rounded">
                삭제
              </button>
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title">
              <span className="text1">이벤트 링크</span>
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control form-control-lg "
                id="colFormLabelLg"
                placeholder="링크를 입력해주세요"
                onChange={handleChange}
                value={link}
                name="link"
              />
            </div>
          </div>

          <div className="form-group row justify-content-start align-items-center">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title">
              <span className="text1">이벤트 날짜</span>
            </label>
            <div className="col-sm-5 myContainer">
              <DatePicker
                className="form-control input2"
                locale="ko" // 달력 한글화
                selected={startDate} // 날짜 state
                onChange={(date) => setStartDate(date)} // 날짜 설정 콜백 함수
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              <span className="wave h5">~</span>
              <DatePicker
                className="form-control input2"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>

          {/* <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title"
            >
              <span className="text1">이벤트 내용</span>
            </label>
            <div className="col-sm-7">
              <input
                type="email"
                className="form-control form-control-lg evnet_content"
                id="colFormLabelLg"
                placeholder="내용을 입력해주세요"
              />
            </div>
          </div> */}

          <div className="search nav justify-content-end row">
            <button type="button" className="btn btn-secondary btn-sm col-1">
              취소
            </button>
            <button type="submit" className="btn btn-primary btn-sm col-1">
              저장
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Resgister;
