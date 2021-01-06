import React, { useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ko from 'date-fns/locale/ko';

import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';
import CloseButton from '../../../../shared/button/close_button';

import './event_register.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

/**
 * @author song-jisu / 이벤트(등록하러가기)
 */

function Resgister({ history }) {
  const [value, setValue] = useState({
    title: '',
    link: ''
  });

  // 달력 날짜 변경 시 기준점이 되는 날짜
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 이미지
  const [registerImage, setRegisterImage] = useState({
    imageName: '이미지를 첨부해주세요',
    imageUrl: ''
  });

  // 이미지 삭제 Ref
  const imageRef = useRef(null);

  const { title, link } = value;

  // 이미지 삭제버튼
  const resetInput = () => {
    /*
      const { current } = imageRef;
      current.value = '';
      files에는 input기록이 남아았어서 직접 삭제를 해줘야 기록이 없어짐 text value는 직접 설정할수있지만 file value는 설정못하기때문
      이걸 없앤이유는 삼항연산자를 사용하면 value값이 사라져서 직접 초기화 할필요없어서 삭제함
    */
    setRegisterImage({
      imageName: '이미지를 첨부해주세요',
      imageUrl: ''
    });
  };

  // 핸들체인지
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  // 이미지 핸들체인지
  const ImagehandleChange = async (e) => {
    try {
      // 이미지 API
      const { name } = e.target.files[0];
      const imageFormData = new FormData();
      imageFormData.append('imgFile', e.target.files[0]);
      const { status, data: imageData } = await axios.post('/upload/event', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (status === 200) {
        const { data } = imageData;
        setRegisterImage({
          ...registerImage,
          imageName: name,
          imageUrl: data.imageUrl
        });
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 날짜 핸들체인지
  const starthandleChange = (date) => {
    setStartDate(date);
  };

  const endhandleChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerObject = {
        title: value.title,
        link: value.link,
        imageUrl: registerImage.imageUrl,
        startAt: moment(startDate).format('YYYY-MM-DD'),
        endAt: moment(endDate).format('YYYY-MM-DD')
      };
      // 제목, 이미지, 링크, 날짜 API
      const { status } = await axios.post('/admin/event', registerObject);
      if (status === 201) {
        history.push('/event');
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 취소버튼
  const handleRemove = () => {
    setValue({
      title: '',
      link: ''
    });
    setRegisterImage({
      imageName: '이미지를 첨부해주세요',
      imageUrl: ''
    });

    setStartDate('');
    setEndDate('');
  };

  return (
    <>
      <div className="container event_wrap">
        <form className="form_wrap" onSubmit={handleSubmit}>
          <div className="event-form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span className="text1">이벤트 제목</span>
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="제목을 입력해주세요"
                onChange={handleChange}
                value={title}
                name="title"
              />
            </div>
          </div>
          <div className="event-form-group input-group input-group-lg row justify-content-start">
            <label htmlFor="colFormLabelLg" className="col-xs-2 col-form-label event-title">
              <span className="text1">이벤트 이미지</span>
            </label>
            <div
              className="custom-file event_inage_input col-sm-6"
              style={{
                display: 'inline-flex',
                height: 'auto'
              }}>
              {registerImage.imageUrl ? (
                <>
                  <div className="d-flex">
                    <div className="image_wrap">
                      <div className="any_image">
                        <img src={registerImage.imageUrl} alt="" className="image2" />
                      </div>
                      <div
                        className="event-button_wrap"
                        onClick={resetInput}
                        role="button"
                        tabIndex={0}
                        aria-hidden="true">
                        <CloseButton />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    name="registerImage"
                    className="custom-file-input"
                    onChange={ImagehandleChange}
                    ref={imageRef}
                    // placeholder="" //파일에서는 placeholder가 안먹음!
                    // value={registerImage} //이미지에서는 value값 넣으면 에러!
                  />

                  <label
                    className="custom-file-label image_label  event_image_label rounded image"
                    htmlFor="inputGroupFile01">
                    {registerImage.imageName}
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="event-form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span className="text1">이벤트 링크</span>
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="링크를 입력해주세요"
                onChange={handleChange}
                value={link}
                name="link"
              />
            </div>
          </div>

          <div className="event-form-group row justify-content-start align-items-center">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span className="text1">이벤트 날짜</span>
            </label>
            <div className="col-sm-5 myContainer">
              <DatePicker
                className="form-control input2"
                locale="ko" // 달력 한글화
                selected={startDate} // 날짜 state
                onChange={starthandleChange} // 날짜 설정 콜백 함수
                placeholderText="시작 날짜를 입력해주세요"
                dateFormat="yyyy-MM-dd" // 여기서 y를 대문자로하면 에러남!
              />
              <span className="wave h5">~</span>
              <DatePicker
                className="form-control input2"
                locale="ko"
                selected={endDate}
                onChange={endhandleChange}
                placeholderText="마지막 날짜를 입력해주세요"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div className="event-search nav justify-content-end row">
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={handleRemove}>
              취소
            </button>

            <button type="submit" className="btn btn-primary btn-sm col-1">
              저장
            </button>
          </div>
          <div className="event-search nav justify-content-end row">
            <Link to="/event" className="btn btn-primary btn-sm col-2 text3">
              목록
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

Resgister.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired
};

export default Resgister;
