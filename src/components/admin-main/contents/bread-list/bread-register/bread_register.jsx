import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';

import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';
import CloseButton from '../../../../shared/button/close_button';

import './bread_register.css';

/**
 * @author song-jisu /빵(등록하러가기)
 */

const BreadRegister = ({ history, location }) => {
  // 빵이름 소개
  const [breadContent, setBreadContent] = useState({
    title: '',
    content: ''
  });

  // 여러 이미지 담는곳
  const [registerImageList, setRegisterImageList] = useState([]);
  // console.log(registerImageList);

  // 페이지 이동시
  const [breadId, setBreadId] = useState(-1);
  // console.log(breadId);

  // 만들어보기
  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    // console.log(query);

    async function fetchData(breadqueryId) {
      // console.log(breadqueryId); // 매개변수사용해서 아래 query가 필요없음 아래처럼 뺄수 있고 매개변수로사용할수있고 2가지 방법있음!

      // const { breadId } = query;
      // console.log(breadId);
      const { status, data: registerData } = await axios.get(`/admin/bread/${breadqueryId}`);
      try {
        if (status === 200) {
          const { data } = registerData;
          setBreadContent({
            title: data.title,
            content: data.content
          });
          setRegisterImageList(data.images);
        }
      } catch (err) {
        errorhandler(err);
      }
    }
    if (query.breadId) {
      fetchData(query.breadId);
      setBreadId(query.breadId);
    }
  }, [location.search]);

  const { title, content } = breadContent;

  // 빵이름 소개 핸들체인지
  const handleChange = (e) => {
    setBreadContent({
      ...breadContent,
      [e.target.name]: e.target.value
    });

    // console.log(breadContent);
  };

  // 이미지 핸들체인지
  const ImagehandleChange = async (e) => {
    try {
      const { files } = e.target;
      // console.log(files);
      const imageLength = files.length + registerImageList.length;
      if (imageLength > 8) {
        alert('이미지를 초과했습니다.');
      }

      const imageFormData = new FormData();
      for (let i = 0; i < files.length; i += 1) {
        imageFormData.append('imgFile', e.target.files[i]);
      }

      // console.log(imageFormData);

      const { status, data: imageData } = await axios.post('/upload/bread', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (status === 200) {
        const { data: { imageUrl: newImageUrlList } } = imageData;
        // console.log(newImageUrlList);
        // console.log(imageData);

        const newimageList = [];
        newImageUrlList.forEach((image) => {
          const newImage = {
            imageUrl: image
          };
          newimageList.push(newImage);
        });
        setRegisterImageList([...registerImageList, ...newimageList]);
      }
    } catch (err) {
      errorhandler(err);
      // console.log(err.message);
    }
  };

  // 저장했을때
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const arr = [];
      for (let i = 0; i < registerImageList.length; i += 1) {
        arr.push(registerImageList[i].imageUrl);
      }

      const breadObject = {
        title: breadContent.title,
        content: breadContent.content,
        imageUrl: arr
      };
      // console.log(breadObject);

      if (breadId === -1) {
        const { status, data: breadData } = await axios.post('/admin/bread', breadObject);
        console.log(breadData);
        if (status === 201) {
          history.push('/bread_list');
        }
        return;
      }

      const { status } = await axios.put(`/admin/bread/${breadId}`, breadObject);
      if (status === 201) {
        history.push(`/bread_list/detail/${breadId}`);
      }
    } catch (err) {
      errorhandler(err);
      // console.log(err.message);
    }
  };

  const goback = () => {
    history.goBack();
  };

  const resetInput = (index) => {
    const deleteImageList = [...registerImageList];
    deleteImageList.splice(index, 1);
    setRegisterImageList(deleteImageList);
  };

  return (

    <>
      <div className="container event_wrap">
        <form className="form_wrap" onSubmit={handleSubmit}>
          <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span className="text1">빵 이름</span>
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="내용을 입력해주세요"
                name="title"
                onChange={handleChange}
                value={title}
                />
            </div>
          </div>

          <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span className="text1">빵 소개</span>
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="내용을 입력해주세요"
                name="content"
                onChange={handleChange}
                value={content}
              />
            </div>
          </div>

          <div className="form-group row justify-content-start bread_image_wrap">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg event-title">
              <span className="text1">빵 이미지</span>
            </div>

            <div className="register_file_wrap">
              <label className="btn btn-primary btn-file col-xs-1 add_file">
                파일추가
                {registerImageList.length !== 8 && (
                <input
                  type="file"
                  onChange={ImagehandleChange}
                  name="breadImage"
                  multiple
               />
                )}

              </label>
            </div>

            <div className="image_file1">
              <div className="image_wrap1">

                {registerImageList.map((imageDataA, index) => (
                  <div className="d-flex bread-image" key={`image-${index}`}>
                    <img
                      src={imageDataA.imageUrl}
                      alt=""
                      className="bread_image1"
                         />
                    <div
                      className="bread_button_wrap"
                      onClick={() => resetInput(index)}
                      role="button"
                      tabIndex={0}
                      aria-hidden="true">
                      <CloseButton />
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="event-search nav justify-content-end row w-100">
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={goback}>
              취소
            </button>

            <button type="submit" className="btn btn-primary btn-sm col-1">
              {breadId === -1 ? '저장' : '수정'}
            </button>
          </div>
          <div className="event-search nav justify-content-end row w-100">
            <Link to="/bread_list" className="btn btn-primary btn-sm col-2 text3">
              목록
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

BreadRegister.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired
};

export default BreadRegister;
