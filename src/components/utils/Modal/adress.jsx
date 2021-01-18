import React, { useEffect, useState } from 'react';
import qs from 'qs';
import axios from '../axios';

import { errorhandler } from '../common';

import './adress.css';
import { array } from 'prop-types';

function Modal({ closeModal, el }) {
  const [name, setName] = useState('');
  const [adress, setAdress] = useState([]);
  console.log(adress);

  useEffect(() => {
    document.body.classList.add('Modal_Overflow');
    return () => {
      document.body.classList.remove('Modal_Overflow');
    };
  }, []);

  const handlerChange = (e) => {
    setName(e.target.value);
  };

  const adressApiCall = async (addressName) => {
    try {
      const queryObject = {
        name: addressName,
        page: 1,
        limit: 20
      };
      const query = qs.stringify(queryObject);
      console.log(`/util/address?${query}`);

      const { status, data: addressData } = await axios.get(`/util/address?${query}`);
      // console.log(data);
      if (status === 200) {
        setAdress(addressData.data.list);
        console.log(addressData.data.list);
      }
    } catch (err) {
      console.log(err);
      errorhandler(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adressApiCall(name);
  };

  const onClick = () => {
    console.log(adress);
    console.log(
      {
        ...adress
      },
      adress[2]
    );

    console.log('뭔데');
  };

  return (
    <>
      <div className="Modal-overlay" ref={el} onClick={closeModal} />
      <div className="Modal">
        <div>
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control title col-9 mr-2"
              id="inputPassword4"
              placeholder="내용을 입력해 주세요"
              name="name"
              value={name}
              onChange={handlerChange}
            />
            <button type="submit" className="btn btn-primary">
              검색
            </button>
            <button type="button" onClick={closeModal}>
              X
            </button>
          </form>
        </div>
        <div className="content">
          {/* <ul>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora nulla, non
              molestiae dicta ducimus. Et unde laborum eveniet ex quod doloribus quae, aliquam
              beatae atque, vero assumenda rem quo?
            </li>
          </ul>
          <ul className="content">
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora nulla, non
              molestiae dicta ducimus. Et unde laborum eveniet ex quod doloribus quae, aliquam
              beatae atque, vero assumenda rem quo?
            </li>
          </ul> */}
          <ul className="address">
            {adress.map((addressData, index) => {
              console.log(addressData);
              // eslint-disable-next-line react/no-array-index-key
              return (
                <li className="adresslist" key={`address-list${index}`} onClick={onClick}>
                  {addressData.roadAddress.addressName}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="button-wrap">
          <button> Confirm </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
