import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import qs from 'qs';

import axios from '../../../../utils/axios';
import { errorhandler, sweetAlert } from '../../../../utils/common';

import './youtube_register.css';

function YoutubeRegister({ history, location }) {
  console.log(location.search);
  console.log(history);

  const [youtubeValue, setYoutubeValue] = useState({
    title: '',
    content: '',
    link: '',
    information: '',
    breadShopId: '' // 추가
  });
  console.log(youtubeValue.information);
  console.log(youtubeValue.breadShopId);

  const { title, content, link, information, breadShopId } = youtubeValue;
  console.log(information);
  console.log(youtubeValue);

  // 페이지 이동시(queryId)
  const [youtubeIdd, setYoutubeIdd] = useState(0);
  console.log(youtubeIdd);

  // 리스트 값 저장(빵집 정보)
  const [breadShopList, setBreadShopList] = useState([]);
  console.log(breadShopList);

  // 수정기능
  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });

    async function fetchData(youtubequeryId) {
      console.log(youtubequeryId);
      const { status, data: youtubeData } = await axios.get(`/admin/youtube/${youtubequeryId}`);
      console.log('aaa');
      try {
        if (status === 200) {
          const { data } = youtubeData;
          console.log(data);
          setYoutubeValue({
            title: data.title,
            content: data.content,
            link: data.link,
            information: data.breadShop.id
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

  // 저장했을때
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const youtubeObject = {
        title,
        content,
        link,
        breadShopId
      };
      if (youtubeIdd === 0) {
        const { status } = await axios.post('/admin/youtube', youtubeObject);
        if (status === 201) {
          history.push('/youtube_list');
        }
        return;
      }

      // 수정 put
      const { status } = await axios.put(`/admin/youtube/${youtubeIdd}`, youtubeObject);
      if (status === 201) {
        history.push('/youtube_list');
      }
    } catch (err) {
      errorhandler(err);
      console.log(err.message);
    }
  };

  // 빵집정보(사진) 인풋창
  const [youtubeInput, setYoutubeInput] = useState(null);
  console.log(youtubeInput);

  // 인풋체인지
  const handleChange = (e) => {
    setYoutubeValue({
      ...youtubeValue,
      [e.target.name]: e.target.value
    });
    setYoutubeInput(true);
  };

  // 검색버튼
  const onSearch = async () => {
    try {
      if (!information) {
        sweetAlert('값없음');
        return;
      }
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
    console.log(breadShop);
    setYoutubeValue({
      ...youtubeValue,
      breadShopId: breadShop.id
    });
    console.log(breadShop);
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
              />
            {breadShopList.length ? (

              <div className="youtube_infor">
                <ul className="youtube_input">
                  {breadShopList.map((breadShop) => (

                    <li
                      key={`breadShop-${breadShop.id}`}
                      className={`search_list ${breadShop.id === breadShopId ? 'active' : ''}`}
                      onClick={() => breadOnClick(breadShop)}>
                      <img src={breadShop.imageUrl} className="bread_list_img" />
                      <h4>{breadShop.title}</h4>
                      {breadShop.id === breadShopId && <div className="backgroundCover" />}
                    </li>

                  ))}
                </ul>
              </div>
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
            {!youtubeIdd ? '저장' : '수정'}
          </button>
        </div>
        <div className="event-search nav justify-content-end row w-100">
          <Link to="/youtube_list" className="btn btn-primary btn-sm col-2 text3">
            목록
          </Link>
        </div>
      </form>
    </div>
  );
}

export default YoutubeRegister;
