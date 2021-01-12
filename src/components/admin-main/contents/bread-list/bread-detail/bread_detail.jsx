// import { array } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';
import CloseButton from '../../../../shared/button/close_button';

import './bread_detail.css';

function Detail({ match, history }) {
  const [value, setValue] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  // 서버에 받아온값 저장
  const [dataList, setDataList] = useState(null);
  console.log(dataList);

  // 이미지 값 저장 (이거추가)
  const [breadImageList, setBreadImageList] = useState([]);
  console.log(breadImageList);

  useEffect(() => {
    async function fetchData() {
      try {
        const { breadId } = match.params;
        console.log(breadId);

        const { status, data: detailData } = await axios.get(`/admin/bread/${breadId}`);
        console.log(detailData);
        console.log(detailData.data.images);
        console.log(detailData.data.id);

        if (status === 200) {
          const { data } = detailData;
          setDataList(data);
          setBreadImageList(data.images); // 이거추가
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

  // 삭제버튼
  const resetInput = () => {
    setValue({
      ...value,
      imageUrl: ''
    });
  };

  return (
    <>
      <div className="container event_wrap">
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

                    {/*
                    <img src={dataList && dataList.images} alt="빵 이미지" className="bread_image" />
                    <div
                    className="button_wrap"
                    onClick={resetInput}
                    role="button"
                    tabIndex={0}
                    aria-hidden="true">
                    <CloseButton />
                    </div> */}
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
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={onDelete}>
              삭제
            </button>

            <div className="row">
              <div className=" nav justify-content-end">
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
