import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';

import axios from '../../../utils/axios';
import { errorhandler } from '../../../utils/common';

import './youtube_list.css';

const YoutubeList = ({ history, location }) => {
  // 리스트 값
  const [mapList, setMapList] = useState([]);

  // 검색조회
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const query = qs.parse(location.search, {
          ignoreQueryPrefix: true
        });

        const { status, data: youtubeData } = await axios.get(`/admin/youtube${location.search}`);
        console.log(youtubeData);
        if (status === 200) {
          setMapList(youtubeData.list);
          setTitle(query.title || '');
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    fetchData();
  }, [location.search]);

  // 제목 핸들러
  const handleChange = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  // 검색조회
  const handleSearch = (e) => {
    e.preventDefault();
    // eslint-disable-next-line object-curly-newline
    const queryObject = {};

    if (title) {
      queryObject.title = title;
    }
    console.log(title);
    console.log(queryObject);

    const queryData = qs.stringify(queryObject);
    history.push(`/youtube_list${queryData ? `?${queryData}` : ''}`);
  };

  // 초기화 버튼
  const handleReset = () => {
    setTitle('');
  };

  return (
    <>
      <div className="all_wrap">
        <h1 className="text">검색조건</h1>

        <form className="form_wrap" onSubmit={handleSearch}>
          <div className="form-group row mt-4">
            <label htmlFor="colFormLabelLg" className="col-xs-2 col-form-label col-form-label-lg ml-3 youtube-title">
              <span>유튜브 제목</span>
            </label>
            <div className="col-sm-8">
              <input
                type="title"
                className="form-control form-control-lg"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={handleChange}
                />
            </div>
          </div>
          <div className="youtube-search nav justify-content-end mt-3 mr-3">
            <button type="button" className="btn btn-secondary btn-sm col-1 mr-2" onClick={handleReset}>
              초기화
            </button>
            <button type="submit" className="btn btn-primary btn-sm col-1">
              검색
            </button>
          </div>

          <div className="mr-3">
            <div className="mt-3 nav justify-content-end ">
              <Link to="/youtube_list/youtube_register" className="btn btn-primary col-2 register">
                등록하러가기
              </Link>
            </div>
          </div>
        </form>

        <div className="row w-100 m-auto">
          <div className="col mr-5 ml-5">
            <div className="card card-small mb-4">
              <div className="card-header border-bottom">
                <h6 className="m-0">Active Users</h6>
              </div>
              <div className="card-body p-0 pb-3 text-center">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        idx
                      </th>
                      <th scope="col" className="border-0">
                        유트브제목
                      </th>
                      <th scope="col" className="border-0">
                        링크
                      </th>
                      <th scope="col" className="border-0">
                        &#160;
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {mapList.map((youtubeData) => (
                      <tr key={`youtubeData-${youtubeData.id}`}>
                        <th>{youtubeData.id}</th>
                        <td>
                          <Link to={`/youtube_list/youtube_detail/${youtubeData.id}`}>{youtubeData.title}</Link>
                        </td>
                        <td>
                          <a href={youtubeData.link} target="_blank" rel="noopener noreferrer">
                            {youtubeData.link}
                          </a>
                        </td>

                        <td>&#160;</td>
                        <td>&#160;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

YoutubeList.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired
};

export default YoutubeList;
