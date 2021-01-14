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

/**
 * @author 송지은
 * */

function BreadBossList({ breadBossList, onBreadBossList, location, history }) {
  const [name, setName] = useState('');
  const [enabled, setEnabled] = useState(null);

  useEffect(() => {
    const bossListApiCall = async () => {
      try {
        const query = qs.parse(location.search, {
          ignoreQueryPrefix: true
        });
        const { status, data: bossData } = await axios.get(`/admin/shop${location.search}`);
        if (status === 200) {
          onBreadBossList(bossData.list);
          setName(query.name || '');
          setEnabled(query.enabled);
        }
      } catch (err) {
        errorhandler(err);
      }
    };
    bossListApiCall();
  }, [location.search, onBreadBossList]);

  const handleReset = () => {
    setName('');
    setEnabled(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // eslint-disable-next-line object-curly-newline
    const queryObject = {};

    if (name) {
      queryObject.name = name;
    }
    if (enabled) {
      queryObject.valid = enabled;
    }
    const queryData = qs.stringify(queryObject);
    history.push(`/bread_boss_list${queryData ? `?${queryData}` : ''}`);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const selectHandleChange = (e) => {
    setEnabled(e.target.value);
  };

  return (
    <>
      <div className="col-lg-11 card mb-5 mt-5 mr-auto ml-auto">
        <div className="mb-4 mt-10">
          <div className="card-header border-bottom">
            <h2 className="m-0">빵집 사장 목록</h2>
          </div>
          <form onSubmit={handleSubmit}>
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
                    placeholder="이름을 입력해 주세요"
                    onChange={handleChange}
                    value={name}
                    name="name"
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
                  <select className="form-control" defaultValue={enabled} onChange={selectHandleChange}>
                    <option value="enabled" readOnly>
                      선택하세요
                    </option>
                    <option value="true">사용중</option>
                    <option value="false">탈퇴</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3 mt-5">
                <div className="col text-right">
                  <button
                    type="button"
                    className="mb-2 btn btn-secondary mr-2"
                    onClick={handleReset}>
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
                      <td>{bossData.id}</td>
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
                      <td>{bossData.enabled ? '사용중' : '탈퇴'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
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
