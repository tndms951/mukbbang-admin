import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from '../../../utils/axios';
import { errorhandler } from '../../../utils/common';

import { setBreadHouseList } from '../../../../redux/bread-house/breadHouse.actions';
import { selectBreadHouseList } from '../../../../redux/bread-house/breadHouse.selectors';

/**
 * @author 송지은
 * */

function BreadHouseList({ history, location, onBreadHouseList, breadHouseList }) {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');

  console.log(breadHouseList);

  useEffect(() => {
    const breadHouseApiCall = async () => {
      try {
        const query = qs.parse(location.search, {
          ignoreQueryPrefix: true
        });

        const { status, data: houseData } = await axios.get(`/admin/bread/shop${location.search}`);
        if (status === 200) {
          onBreadHouseList(houseData.list);
          setName(query.title || '');
          setAccount(query.account);
        }
      } catch (err) {
        errorhandler(err);
      }
    };
    breadHouseApiCall();
  }, [location.search, onBreadHouseList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // eslint-disable-next-line object-curly-newline
    const queryObject = {};

    if (name) {
      queryObject.title = name;
    }
    if (account) {
      queryObject.account = account;
    }
    const queryData = qs.stringify(queryObject);
    history.push(`/bread_house_list${queryData ? `?${queryData}` : ''}`);
  };

  const handleReset = () => {
    setName('');
    setAccount('');
  };

  const nameHandleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="col-lg-12 mb-4 mt-10">
        <div
          className="card card-small mb-3 mt-5"
          style={{
            width: '90%', margin: '0 auto'
          }}>
          <div className="card-header border-bottom">
            <h2 className="m-0">빵집 목록</h2>
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
                    id="name"
                    value={name}
                    onChange={nameHandleChange}
                    placeholder="이름을 입력해 주세요"
                  />
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
                  <Link to="/bread_house_list/bread_house_register">
                    <button type="button" className="mb-2 btn btn-outline-primary mr-2 mt-5 mb-4">
                      등록하기
                    </button>
                  </Link>
                </div>
              </div>
              <table
                className="table"
                style={{
                  boxShadow: '0 7px 70px #f1f1f1'
                }}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">이름</th>
                    <th scope="col">주소</th>
                    <th scope="col">빵집계정</th>
                    <th scope="col">빵목록</th>
                    {/* <th scope="col">리뷰</th> */}
                  </tr>
                </thead>
                <tbody>
                  {breadHouseList.map((list) => (
                    <tr className="text-center" key={`bread-list${list.id}`}>
                      <td>{list.id}</td>
                      <td>
                        <Link to={`/bread_house_list/bread_house_detail/${list.id}`}>{list.title}</Link>
                      </td>
                      <td>{list.link}</td>
                      <td>
                        <Link to={`/bread_boss_list/bread_boss_detail/${list.shopUser.id}`}>
                          {list.shopUser.name}
                        </Link>
                      </td>
                      <td>{list.bread.map((detailBread) => (
                        <Link to={`/bread_list/detail/${detailBread.id}`} key={`bread-title${detailBread.id}`}>{detailBread.title}</Link>
                      ))}
                      </td>
                      {/* <td>
                        <button type="button" className="btn btn-primary">
                          리뷰보기
                        </button>
                      </td> */}
                    </tr>

                  ))}
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

BreadHouseList.propTypes = {
  breadHouseList: PropTypes.instanceOf(Array).isRequired,
  onBreadHouseList: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = createStructuredSelector({
  breadHouseList: selectBreadHouseList
});

const mapDispatchToProps = (dispatch) => ({
  onBreadHouseList: (list) => dispatch(setBreadHouseList(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(BreadHouseList);
