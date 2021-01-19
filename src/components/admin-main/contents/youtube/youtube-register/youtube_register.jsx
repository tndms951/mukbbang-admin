import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../utils/axios';

import { errorhandler } from '../../../../utils/common';

import './youtube_register.css';

function YoutubeRegister({ history }) {
  const [youtubeValue, setYoutubeValue] = useState({
    title: '',
    content: '',
    link: '',
    information: ''
  });
  console.log(youtubeValue);

  const { title, content, link, information } = youtubeValue;

  // 인풋체인지
  const handleChange = (e) => {
    setYoutubeValue({
      ...youtubeValue,
      [e.target.name]: e.target.value
    });
  };

  // 저장했을때
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const youtubeObject = {
        title: youtubeValue.title,
        content: youtubeValue.content,
        link: youtubeValue.link,
        breadId: youtubeValue.information
      };
      const { status } = await axios.post('/admin/youtube', youtubeObject);
      if (status === 201) {
        history.push('/youtube_list');
      }
    } catch (err) {
      errorhandler(err);
      console.log(err.message);
    }
  };

  return (
    <div className="container p-5 bg-light">
      <form className="form_wrap" onSubmit={handleSubmit}>
        <div className="form-group row justify-content-start">
          <label
            htmlFor="colFormLabelLg"
            className="col-xs-2 col-form-label col-form-label-lg ml-3 youtube-title">
            <span className="text1">유튜브 제목</span>
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="내용을 입력해주세요"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row justify-content-start">
          <label
            htmlFor="colFormLabelLg"
            className="col-xs-2 col-form-label col-form-label-lg ml-3 youtube-title">
            <span className="text1">유튜브 내용</span>
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="내용을 입력해주세요"
              name="content"
              value={content}
              onChange={handleChange}
              />
          </div>
        </div>

        <div className="form-group row justify-content-start">
          <label
            htmlFor="colFormLabelLg"
            className="col-xs-2 col-form-label col-form-label-lg ml-3 youtube-title">
            <span className="text1">유튜브 링크</span>
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="내용을 입력해주세요"
              name="link"
              value={link}
              onChange={handleChange}
              />
          </div>
        </div>

        <div className="form-group row justify-content-start">
          <label
            htmlFor="colFormLabelLg"
            className="col-xs-2 col-form-label col-form-label-lg ml-3 youtube-title">
            <span className="text1">  &nbsp; 빵집 정보 &nbsp; </span>
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="내용을 입력해주세요"
              name="information"
              value={information}
              onChange={handleChange}
              />
            <ul className="search_list">
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
        </div>

        <div className="event-search nav justify-content-end row w-100">
          <button type="button" className="btn btn-secondary btn-sm col-1 mr-2">
            취소
          </button>

          <button type="submit" className="btn btn-primary btn-sm col-1">
            저장
          </button>
        </div>
        <div className="event-search nav justify-content-end row w-100">
          <Link to="/bread_list" className="btn btn-primary btn-sm col-2 text3">
            목록
          </Link>
        </div>
      </form>
    </div>
  );
}

export default YoutubeRegister;
