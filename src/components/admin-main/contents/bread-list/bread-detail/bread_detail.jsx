// import { array } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';

import './bread_detail.css';

function Detail({ match, history }) {
  // 서버에 받아온값 저장
  const [dataList, setDataList] = useState(null);

  // 이미지 값 저장
  const [breadImageList, setBreadImageList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { breadId } = match.params;

        const { status, data: detailData } = await axios.get(`/admin/bread/${breadId}`);

        if (status === 200) {
          const { data } = detailData;
          setDataList(data);
          setBreadImageList(data.images);
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

  return (
    <>
      <div className="container event_register_wrap">
        <form className="form_wrap">
          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span className="text1">빵 이름</span>
              <span className="contentName"> {dataList && dataList.title} </span>
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span className="text1">빵 소개</span>
              <span className="contentName"> {dataList && dataList.content} </span>
            </div>
          </div>

          <div className="form-group input-group input-group-lg row justify-content-start">
            <div htmlFor="colFormLabelLg" className="col-xs-2 col-form-label event-title">
              <span className="text1">빵 이미지</span>
              <span className="contentName">
                <div className="image_wrap">
                  {dataList?.images.map((imageData, index) => (
                    <div className="d-flex bread-image" key={`image-${index}`}>
                      <img src={imageData.imageUrl} alt="빵 이미지" className="bread_image1" />
                    </div>
                  ))}
                </div>
              </span>
            </div>
            <div
              className="custom-file event_inage_input col-sm-6"
              style={{
                height: 'auto'
              }}
            />
          </div>
          <div className="event-search nav justify-content-end row">
            <button
              type="button"
              className="btn btn-secondary btn-sm col-1 button_init"
              onClick={onDelete}>
              삭제
            </button>

            <div className="row">
              <div className="nav justify-content-end">
                <Link
                  to={`/bread_list/bread_register?breadId=${dataList?.id}`}
                  className="btn btn-primary modify">
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
