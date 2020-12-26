import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from '../../../utils/axios';

import './bread_list.css';

function BreadList() {
  const [mapList, setMapList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { status, data: breadData } = await axios.get('/admin/bread');
        console.log(breadData);
        if (status === 200) {
          setMapList(breadData.list);
        }
      } catch (err) {
        if (err && err.response) {
          const { data } = err.response;
          alert(data.message);
        } else {
          alert('네트워크가 불안정 합니다.');
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="all_wrap">
        <h1 className="text">검색조건</h1>

        <form className="form_wrap">
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
                // value={title}
                // onChange={handleChange}
              />
            </div>
          </div>
          <div className="search nav justify-content-end">
            <button type="button" className="btn btn-secondary btn-sm col-1">
              초기화
            </button>
            <button type="submit" className="btn btn-primary btn-sm col-1">
              검색
            </button>
          </div>

          <div className="event_table">
            <div className="button_wrap nav justify-content-end">
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
                    {/* <tr>
                      <td>지수빵집</td>
                      <td>1</td>
                      <td>&#160;</td>
                      <td>&#160;</td>
                      <td>&#160;</td>
                    </tr> */}
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
