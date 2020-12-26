import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from '../../../utils/axios';
import Pagenation from '../pagenation/pagination';
import { errorhandler } from '../../../utils/common';

import { setBreadBossList } from '../../../../redux/bread-boss/breadBoss.actions';
import { selectBreadBossList } from '../../../../redux/bread-boss/breadBoss.selectors';

function BreadBossList({ breadBossList, onBreadBossList, location }) {
  // const [breadBossList, setBreadBossList] = useState([]);

  const [name, setName] = useState('');

  const [enabled, setEnabled] = useState(null);

  useEffect(() => {
    const bossListApiCall = async () => {
      try {
        const query = qs.parse(location.search, {
          ignoreQueryPrefix: true
        });
        const { status, data: bossData } = await axios.get('/admin/shop');
        if (status === 200) {
          console.log('연결성공!!!!!');
          console.log(bossData.list);
          onBreadBossList(bossData.list);
          // setBreadBossList(bossData.list);
        }
      } catch (err) {
        errorhandler(err);
      }
    };
    console.log(breadBossList);
    bossListApiCall();
  }, []);

  const handleReset = () => {
    setName('');
    setEnabled(null);
  };

  return (
    <>
      <div className="col-lg-12 mb-4 mt-10">
        <div className="card card-small mb-3 mt-5">
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
            <div className="row justify-content-start">
              <span
                className="col-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                탈퇴 여부
              </span>
              <div className="form-group col-md-4">
                <select className="form-control">
                  <option readOnly>선택하세요</option>
                  <option>사용중</option>
                  <option>탈퇴</option>
                </select>
              </div>
            </div>
            <div className="row mb-3 mt-5">
              <div className="col text-right">
                <button type="button" className="mb-2 btn btn-secondary mr-2" onClick={handleReset}>
                  초기화
                </button>
                <button type="submit" className="mb-2 btn btn-primary mr-2">
                  검색
                </button>
              </div>
            </div>
            <div className="row text-right">
              <div className="col">
                <Link to="/bread_boss_list/register">
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
                  <th scope="col">핸드폰 번호</th>
                  <th scope="col">프로필 이미지</th>
                  <th scope="col">탈퇴 여부</th>
                </tr>
              </thead>
              <tbody>
                {breadBossList.map((bossData) => (
                  <tr className="text-center" key={`breadBoss-list${bossData.id}`}>
                    <th>{bossData.id}</th>
                    <td>
                      <Link to={`/bread_boss_list/bread_boss_detail/${bossData.id}`}>
                        {bossData.name}
                      </Link>
                    </td>
                    <td>{bossData.phoneNumber}</td>
                    <td>
                      <img
                        src={bossData.imageUrl}
                        alt=""
                        style={{
                          width: '80px'
                        }}
                      />
                    </td>
                    <td>{bossData.enabled === 'true' ? '사용중' : '탈퇴'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagenation totalPages={12} currentPage={6} />
      </div>
    </>
  );
}

BreadBossList.propTypes = {
  breadBossList: PropTypes.instanceOf(Array).isRequired,
  onBreadBossList: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = createStructuredSelector({
  breadBossList: selectBreadBossList
});

const mapDispatchToProps = (dispatch) => ({
  onBreadBossList: (list) => dispatch(setBreadBossList(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(BreadBossList);

// export default BreadBossList;
