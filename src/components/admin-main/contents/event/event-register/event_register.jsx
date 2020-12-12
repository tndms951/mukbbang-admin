import React, { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import axios from '../../../../utils/axios';

import './event_register.css';
import 'react-datepicker/dist/react-datepicker.css';

import ko from 'date-fns/locale/ko';

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

  const { title, link } = value;

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
      console.log(e.target.files[0]);
      const imageFormData = new FormData();
      imageFormData.append('imgFile', e.target.files[0]);
      const { status, data: imageData } = await axios.post('/upload/event', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (status === 200) {
        const { data } = imageData;
        console.log(data);
        setRegisterImage({
          ...registerImage,
          imageName: name,
          imageUrl: data.imageUrl
        });
        console.log('이미지성공');
      }
    } catch (err) {
      console.log('오류');
      if (err && err.response) {
        const { data } = err.response;
        alert(data.message);
      } else {
        alert('네트워크가 불안정합니다.');
      }
    }
  };

  // 날짜 핸들체인지
  const starthandleChange = (date) => {
    setStartDate(date);
    console.log(date);
  };
  const endhandleChange = (date) => {
    setEndDate(date);
    console.log(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerObject = {
        title: value.title,
        link: value.link,
        imageUrl: registerImage,
        startAt: moment(startDate).format('YYYY-MM-DD'),
        endAt: moment(endDate).format('YYYY-MM-DD')
      };
      console.log(registerObject);

      // 제목, 이미지, 링크, 날짜 API
      const { status, data: registerData } = await axios.post('/admin/event', registerObject);
      console.log(registerData);
      if (status === 201) {
        // alert('나머지성공!');
        history.push('/event');
      }
    } catch (err) {
      if (err && err.response) {
        const { data } = err.response;
        alert(data.message);
      } else {
        alert('네트워크가 불안정합니다.');
      }
    }
  };

  // 취소버튼
  const handleRemove = () => {
    setValue({
      title: '',
      link: ''
    });
    setStartDate('');
    setEndDate('');
  };

  // 이미지 삭제버튼

  const resetInput = () => {
    const { imageUrl } = registerImage;
    console.log(imageUrl);
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
                name="registerImage"
                className="custom-file-input"
                onChange={ImagehandleChange}
                placeholder="여긴왜 이게 안먹음?"
                // value={registerImage}
                // value={registerImage} //이미지에서는 value값 넣으면 에러!
              />
              <label
                className="custom-file-label image_label  event_image_label rounded"
                htmlFor="inputGroupFile01">
                {registerImage.imageName}
              </label>
              {registerImage.imageUrl && <img src={registerImage.imageUrl} alt="" />}
            </div>
            <div className="delect_button col-xl-5 delect_button">
              <button
                type="button"
                className="btn btn-secondary col-sm-2 btn-pull-right delect_button rounded"
                onClick={resetInput}>
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
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={handleRemove}>
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
