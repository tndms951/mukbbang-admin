import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { errorhandler } from '../../../../utils/common';
import axios from '../../../../utils/axios';

import './youtube_detail.css';

function YoutubeDetail({ match, history }) {
  // 서버에 받아온값 저장
  const [dataList, setDataList] = useState(null);
  console.log(dataList);

  useEffect(() => {
    async function fetchData() {
      try {
        const { youtubeId } = match.params;

        const { status, data: detailData } = await axios.get(`/admin/youtube/${youtubeId}`);
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
  const handleReset = async () => {
    try {
      const { youtubeId } = match.params;
      const { status } = await axios.delete(`/admin/youtube/${youtubeId}`);
      if (status === 200) {
        history.push('/youtube_list');
      }
    } catch (err) {
      errorhandler(err);
    }
  };

  return (
    <>
      <div className="container youtube_wrap p-5 bg-light">
        <form className="form_wrap">
          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg youtube_title w-100">
              <span className="text1">유튜브 제목</span>
              <span className="contentName">{dataList && dataList.title} </span>
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg youtube_title w-100"
              >
              <span className="text1">
                유튜브 내용
              </span>
              <span className="contentName">
                {dataList && dataList.content}
              </span>
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg youtube_title w-100">
              <span className="text1">
                유튜브 링크
              </span>
              <span className="contentName">
                {dataList && dataList.link}
              </span>
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg youtube_title w-100">
              <span className="text1">
                빵집 정보 &nbsp;&nbsp;
              </span>
              <span className="contentName information_img ml-5">
                <img src={dataList && dataList.breadShop.imageUrl} className=" w-50 mt-4" />
              </span>
            </div>
          </div>

          <div className="youtube_search nav justify-content-end row">
            <button type="button" className="btn btn-secondary btn-sm col-1 button_init" onClick={handleReset}>
              삭제
            </button>

            <div className="row">
              <div className="nav justify-content-end">
                <Link
                  to={`/youtube_list/youtube_register?youtubeId=${dataList?.id}`}
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

export default YoutubeDetail;
