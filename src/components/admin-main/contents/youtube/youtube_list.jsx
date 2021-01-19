import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../../utils/axios';
import { errorhandler } from '../../../utils/common';

import './youtube_list.css';

const YoutubeList = () => {
  const [mapList, setMapList] = useState([]);
  console.log(mapList);

  useEffect(() => {
    async function fetchData() {
      try {
        const { status, data: youtubeData } = await axios.get('/admin/youtube');
        if (status === 200) {
          setMapList(youtubeData.list);
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="all_wrap">
        <h1 className="text">검색조건</h1>

        <form className="form_wrap">
          <div className="form-group row mt-4">
            <label htmlFor="colFormLabelLg" className="col-xs-2 col-form-label col-form-label-lg ml-3 youtube-title">
              <span>유튜브 제목</span>
            </label>
            <div className="col-sm-8">
              <input type="title" className="form-control form-control-lg" placeholder="제목을 입력해주세요" />
            </div>
          </div>

          <div className="youtube-search nav justify-content-end mt-3 mr-3">
            <button type="button" className="btn btn-secondary btn-sm col-1 mr-2">
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

          <div className="row w-100">
            <div className="col">
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
                        <th scope="col" className="border-0">
                        &#160;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {mapList.map((youtubeData) => (
                        <>
                          <tr key={youtubeData.id}>

                            <th>{youtubeData.id}</th>

                            <td>bb</td>
                            <td>cc</td>

                          </tr>
                        </>
                      ))} */}
                      {mapList.map((youtubeData) => (
                        <>
                          <tr key={youtubeData.id}>
                            <th>{youtubeData.id}</th>
                            <td><Link to={`/youtube_list/youtube_detail/${youtubeData.id}`}>{youtubeData.title}</Link></td>
                            <td><a href={youtubeData.link} target="_blank" rel="noopener noreferrer">{youtubeData.link}</a></td>
                            <td>&#160;</td>
                            <td>&#160;</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default YoutubeList;
