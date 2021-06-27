import React, { useEffect, useState } from 'react';
import qs from 'qs';
import axios from '../axios';

import { errorhandler } from '../common';

import './address.css';

/**
 * @author 송지은
 * */

function Modal({ closeModal, el, handleAddress }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    document.body.classList.add('Modal_Overflow');
    return () => {
      document.body.classList.remove('Modal_Overflow');
    };
  }, []);

  const handlerChange = (e) => {
    setName(e.target.value);
  };

  const addressApiCall = async (addressName, currentPage) => {
    const limit = 20;
    try {
      setIsLoading(true);
      const queryObject = {
        name: addressName,
        page: currentPage,
        limit
      };
      const query = qs.stringify(queryObject);
      const { status, data: addressData } = await axios.get(`/util/address?${query}`);
      const { data } = addressData;
      setIsLoading(false);
      if (status === 200) {
        setAddress(currentPage === 1 ? data.list : [...address, ...data.list]);
        setPage(currentPage);
        setIsEnd(data.pagination.isEnd);
      }
    } catch (err) {
      setIsLoading(false);
      errorhandler(err);
    }
  };

  const loadMoreHandler = () => {
    if (!isLoading) {
      addressApiCall(name, page + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      addressApiCall(name, 1);
    }
  };

  return (
    <>
      <div className="Modal-overlay" ref={el} onClick={closeModal} />
      <div className="Modal">
        <div className="form-wrap">
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control title col-9 mr-2"
              id="inputPassword4"
              placeholder="도로명 주소를 입력해 주세요"
              name="name"
              value={name}
              onChange={handlerChange}
            />
            <button type="submit" className="btn btn-primary">
              검색
            </button>
            <button className="xbutton material-icons" type="button" onClick={closeModal}>
              close
            </button>
          </form>
        </div>
        <div className="content">
          <ul className="address">
            {address.map((addressData, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li
                className="addresslist"
                key={`address-list${index}`}
                onClick={() => handleAddress(addressData.roadAddress)}>
                {addressData.roadAddress.addressName}
              </li>
            ))}
            <div
              className={`addresslist ${isLoading ? 'text-danger' : ''}`}
              style={{
                textAlign: 'center'
              }}
              onClick={loadMoreHandler}>
              {address.length && !isEnd ? (
                <button type="button" disabled={isLoading}>
                  더보기
                </button>
              ) : null}
            </div>
          </ul>
        </div>
        <div className="button-wrap">
          <button type="submit"> Confirm </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
