import React from 'react';
import { Link } from 'react-router-dom';

function breadHouseList() {
  return (
    <>
      <div className="card card-small mb-3 mt-5">
        <div className="col-lg-12 mb-4 mt-10">
          <div className="card-header border-bottom">
            <h2 className="m-0">빵집 목록</h2>
          </div>
          <form>
            <div className="mr-5 ml-5 mt-5 mb-4">
              <div className="row justify-content-start">
                <span
                  className="col-2"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  이름
                </span>
                <div className="form-group col-5">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="이름을 입력해 주세요"
                  />
                </div>
              </div>
              <div className="row justify-content-start">
                <span
                  className="col-2"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                  빵집 계정
                </span>
                <div className="form-group col-5">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="빵집계정을 입력해 주세요"
                  />
                </div>
                {/* <div className="form-group col-md-4">
                <select className="form-control">
                  <option value="" readOnly>
                    선택하세요
                  </option>
                  <option value="true">사용중</option>
                  <option value="false">탈퇴</option>
                </select>
              </div> */}
              </div>
              <div className="row mb-3 mt-5">
                <div className="col text-right">
                  <button type="button" className="mb-2 btn btn-secondary mr-2">
                    초기화
                  </button>
                  <button type="submit" className="mb-2 btn btn-primary mr-2">
                    검색
                  </button>
                </div>
              </div>
              <div className="row text-right">
                <div className="col">
                  <Link to="/bread_house_list/bread_house_register">
                    <button type="button" className="mb-2 btn btn-outline-primary mr-2 mt-5 mb-4">
                      등록하기
                    </button>
                  </Link>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">이름</th>
                    <th scope="col">주소</th>
                    <th scope="col">빵집계정</th>
                    <th scope="col">빵목록</th>
                    <th scope="col">리뷰</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td>무야</td>
                    <Link to="/bread_house_list/bread_house_detail">
                      <td>힝무</td>
                    </Link>
                    <td>이야아앙</td>
                    <td>난나</td>
                    <td>웅</td>
                    <td>
                      <button type="button" className="btn btn-primary">
                        리뷰보기
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
        {/* <Pagenation totalPages={12} currentPage={6} /> */}
      </div>
    </>
  );
}

export default breadHouseList;
