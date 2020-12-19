import React from 'react';

function BreadBossDetail() {
  return (
    <>
      <h1>빵집 사장 디테일 페이지 !!!!!!!!!!!!!!!!</h1>
      <div className="col-lg-12 mb-4 mt-10">
        <div className="card card-small mb-5 mt-5">
          <div className="card-header border-bottom">
            <h2 className="m-0">빵집 사장 목록</h2>
          </div>
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
                  // value="myCoolPassword"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BreadBossDetail;
