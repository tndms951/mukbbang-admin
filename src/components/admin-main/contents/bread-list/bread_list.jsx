import React, { useEffect, useState } from 'react';
import qs from 'qs';

import { Link } from 'react-router-dom';
import axios from '../../../utils/axios';
import { errorhandler } from '../../../utils/common';

import './bread_list.css';

function BreadList({ history, location }) {
  // 리스트 받아온 값
  const [mapList, setMapList] = useState([]);
  // console.log(mapList);

  // 검색조회
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const query = qs.parse(location.search, {
          ignoreQueryPrefix: true
        });
        const { status, data: breadData } = await axios.get(`/admin/bread${location.search}`);
        console.log(breadData);
        if (status === 200) {
          setMapList(breadData.list);
          setTitle(query.title || '');
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    fetchData();
  }, [location.search]);

  // title 핸들체인지
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  // 검색조회
  const handleSearch = (e) => {
    e.preventDefault();
    // eslint-disable-next-line object-curly-newline
    const queryObject = {};
    console.log(queryObject);
    if (title) {
      queryObject.title = title;
    }
    const queryData = qs.stringify(queryObject);
    history.push(`/bread_list${queryData ? `?${queryData}` : ''}`);
    console.log(queryData);
  };

  // 초기화 핸들체인지
  const handleReset = () => {
    setTitle('');
  };

  return (
    <>
      <div className="all_wrap">
        <h1 className="text">검색조건</h1>

        <form className="form_wrap" onSubmit={handleSearch}>
          <div className="form-group row">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title">
              <span>빵이름</span>
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
          <div className="search nav justify-content-end">
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={handleReset}>
              초기화
            </button>
            <button type="submit" className="btn btn-primary btn-sm col-1">
              검색
            </button>
          </div>

          <div className="event_table">
            <div className="event_button_wrap nav justify-content-end ">
              <Link to="/bread_list/bread_register" className="btn btn-primary col-2 register">
                등록하러가기
              </Link>
            </div>
          </div>
        </form>
        <div className="row">
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
                        빵idx
                      </th>
                      <th scope="col" className="border-0">
                        빵이름
                      </th>
                      <th scope="col" className="border-0">
                        &#160;
                      </th>
                      <th scope="col" className="border-0">
                        &#160;
                      </th>
                      <th scope="col" className="border-0">
                        &#160;
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mapList.map((breadData) => (
                      <tr key={breadData.id}>
                        <>
                          <th> {breadData.id} </th>

                          <td>
                            <Link to={`/bread_list/detail/${breadData.id}`}>{breadData.title}</Link>
                          </td>

                          <td>&#160;</td>
                          <td>&#160;</td>
                          <td>&#160;</td>
                        </>
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
}

export default BreadList;
