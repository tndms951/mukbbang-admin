import { array } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';

import './bread_detail.css';

function Detail({ match, history }) {
  const [value, setValue] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });
  // 서버에 받아온값 저장
  const [DataList, setDataList] = useState(null);
  console.log(DataList);

  useEffect(() => {
    async function fetchData() {
      try {
        const { breadId } = match.params;
        console.log(breadId);
        const { status, data: detailData } = await axios.get(`/admin/bread/${breadId}`);
        console.log(detailData);
        if (status === 200) {
          const { data } = detailData;
          setDataList(data);
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    fetchData();
  }, []);

  // 삭제 버튼
  const onDelete = async () => {
    try {
      const { breadId } = match.params;
      const { status } = await axios.delete(`/admin/bread/${breadId}`);
      if (status === 200) {
        history.push('/bread_list');
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  // 수정 핸들써브밋
  const handleSubmit = async () => {
    try {
      const { breadId } = match.params;
      const putChange = {
        title: value.title,
        content: value.content,
        imageUrl: value.imageUrl
      };
      const { status } = await axios.put(`/admin/bread/${breadId}`, putChange);
      if (status === 201) {
        setDataList({
          ...value,
          title: value.title,
          content: value.content,
          imageUrl: value.imageUrl
        });
      }
    } catch (err) {
      errorhandler(err);
    }
  };
  return (
    <>
      <div className="container event_wrap">
        <form className="form_wrap">
          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title">
              <span className="text1">빵 이름</span>
              <span className="contentName"> {DataList && DataList.title} </span>
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title">
              <span className="text1">빵 소개</span>
              <span className="contentName"> {DataList && DataList.content} </span>
            </div>
          </div>

          <div className="form-group input-group input-group-lg row justify-content-start">
            <div htmlFor="colFormLabelLg" className="col-xs-2 col-form-label title">
              <span className="text1">빵 이미지</span>
              <span className="contentName">
                {DataList && (
                  <img src={DataList.images[0].imageUrl} alt="빵 이미지" className="bread_image" />
                )}
              </span>
            </div>
            <div
              className="custom-file event_inage_input col-sm-6"
              style={{
                height: 'auto'
              }}
            />
          </div>
          <div className="search nav justify-content-end row">
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={onDelete}>
              삭제
            </button>

            <div className="row">
              <div className=" nav justify-content-end">
                <Link
                  to="/bread_list/bread_register"
                  className="btn btn-primary modify"
                  onClick={handleSubmit}>
                  수정
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Detail;
