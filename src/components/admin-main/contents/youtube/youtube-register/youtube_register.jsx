import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import qs from 'qs';

import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';

import './youtube_register.css';

function YoutubeRegister({ history, location }) {
  const [youtubeValue, setYoutubeValue] = useState({
    title: '',
    content: '',
    link: '',
    information: ''
  });
  console.log(youtubeValue);

  // 페이지 이동시
  const [youtubeIdd, setYoutubeIdd] = useState(-1);

  // 리스트 값 저장(빵집 정보)
  const [breadShopList, setBreadShopList] = useState([]);

  // 수정기능
  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });

    async function fetchData(youtubequeryId) {
      console.log(youtubequeryId);
      const { status, data: youtubeData } = await axios.get(`/admin/youtube/${youtubequeryId}`);
      console.log(youtubeData);
      try {
        if (status === 200) {
          const { data } = youtubeData;
          console.log(data);
          setYoutubeValue({
            title: data.title,
            content: data.content,
            link: data.link,
            information: data.breadId
          });
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    if (query.youtubeId) {
      console.log(query);
      fetchData(query.youtubeId);
      setYoutubeIdd(query.youtubeId);
    }
  }, [location.search]);

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

  const [youtubeInput, setYoutubeInput] = useState(false);

  // input창 나오게하기
  const openInput = () => {
    setYoutubeInput(true);
  };

  // 검색버튼
  const onSearch = async () => {
    try {
      const { status, data: searchData } = await axios.get(`/admin/bread/shop?title=${information}`);
      console.log(searchData);
      if (status === 200) {
        const { list } = searchData;
        setBreadShopList(list);
        console.log(list);
      }
    } catch (err) {
      console.log(err);
      errorhandler(err);
    }
  };

  // 취소 버튼
  const handlegoBack = () => {
    history.goBack();
  };

  // 사진 클릭시
  const breadOnClick = (breadShop) => {
    setYoutubeValue({
      ...youtubeValue,
      information: breadShop.id
    });
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
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="내용을 입력해주세요"
              name="information"
              autoComplete="off" // 인풋클릭시 아래박스 안뜨게
              value={information}
              onChange={handleChange}
              onClick={openInput}
              />
            {breadShopList.length ? (
              <ul className="youtube_input">
                {breadShopList.map((breadShop) => (
                  <li
                    key={`breadShop-${breadShop.id}`}
                    className="search_list search_list_click"
                    onClick={() => breadOnClick(breadShop)}>
                    <img src={breadShop.imageUrl} className="bread_list_img" />
                    <h4>{breadShop.title}</h4>
                  </li>
                ))}
              </ul>
            ) : null}

          </div>
          <button type="button" className="btn btn-secondary btn-sm col-1 mr-2 youtube_search" onClick={onSearch}>
            검색
          </button>
        </div>

        <div className="event-search nav justify-content-end row w-100">
          <button type="button" className="btn btn-secondary btn-sm col-1 mr-2" onClick={handlegoBack}>
            취소
          </button>

          <button type="submit" className="btn btn-primary btn-sm col-1">
            {youtubeIdd === -1 ? '저장' : '수정'}
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
