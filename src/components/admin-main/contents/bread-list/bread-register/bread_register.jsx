import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from '../../../../utils/axios';
import { errorhandler } from '../../../../utils/common';
import CloseButton from '../../../../utils/button/close_button';

import './bread_register.css';

/**
 * @author song-jisu /빵(등록하러가기)
 */

const BreadRegister = ({ history, location, match }) => {
  // const [aaa, setAaa] = useState(null);

  // 만들어보기
  // useEffect(() => {
  //   async function fetchData() {
  //     const { breadId } = match.params;
  //     console.log(breadId);
  //     const query = queryString.parse(location.search);
  //     // return query;
  //     console.log(location);
  //     console.dir(match);
  //     const { status, data: registerData } = await axios.get(`/admin/bread/${breadId}`);
  //     try {
  //       if (status === 200) {
  //         const { data } = registerData;
  //         setAaa(data);
  //         alert('성공');
  //       }
  //     } catch (err) {
  //       alert('오류');
  //     }
  //   }
  //   fetchData();
  // }, []);

  // 빵이름 소개
  const [breadContent, setBreadContent] = useState({
    title: '',
    content: ''
  });

  // 빵 이미지
  const [breadImage, setBreadImage] = useState({
    imageUrl: ''
  });

  // 여러 이미지 담는곳
  const [registerImageList, setRegisterImageList] = useState([]);

  const { title, content } = breadContent;

  // 빵이름 소개 핸들체인지
  const handleChange = (e) => {
    setBreadContent({
      ...breadContent,
      [e.target.name]: e.target.value
    });
    console.log(e.target);
    console.log(breadContent);
  };

  // 이미지 핸들체인지
  const ImagehandleChange = async (e) => {
    try {
      const { files } = e.target;
      console.log(files);
      const imageLength = files.length + registerImageList.length;
      if (imageLength > 8) {
        alert('이미지를 초과했습니다.');
        return;
      }

      const imageFormData = new FormData();
      for (let i = 0; i < files.length; i += 1) {
        imageFormData.append('imgFile', e.target.files[i]);
      }
      const { status, data: imageData } = await axios.post('/upload/bread', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (status === 200) {
        const { data: { imageUrl: newImageUrlList } } = imageData;
        const newimageList = [];
        console.log('성공');
        console.log(newImageUrlList);
        newImageUrlList.forEach((image) => {
          const newImage = {
            imageUrl: image
          };
          newimageList.push(newImage);
        });
      }
    } catch (err) {
      errorhandler(err);
      // console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const breadObject = {
        title: breadContent.title,
        content: breadContent.content,
        imageUrl: [breadImage.imageUrl]
      };
      return;

      const { status, data: breadData } = await axios.post('/admin/bread', breadObject);
      console.log(breadData);
      if (status === 201) {
        history.push('/bread_list');
      }
    } catch (err) {
      errorhandler(err);
      console.log(err.message);
    }
  };
  const handleRemove = () => {
    setBreadContent({
      title: '',
      content: ''
    });
    setBreadImage({
      imageUrl: ''
    });
  };

  const resetInput = () => {
    setBreadImage({
      imageUrl: ''
    });
  };

  return (
    <>
      <div className="container event_wrap">
        <form className="form_wrap" onSubmit={handleSubmit}>
          <div className="form-group row justify-content-start">
            <label
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title">
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
              className="col-xs-2 col-form-label col-form-label-lg title">
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

          <div className="form-group row justify-content-start">
            <div
              htmlFor="colFormLabelLg"
              className="col-xs-2 col-form-label col-form-label-lg title">
              <span className="text1">빵 이미지</span>
            </div>
            <label className="btn btn-primary btn-file col-sm-1 add_file">
              파일추가
              <input
                type="file"
                style={{
                  display: 'none'
                }}
                onChange={ImagehandleChange}
                name="breadImage"
                multiple
              />
            </label>
          </div>
          <div className="image_file1">
            <div className="image_wrap1">
              {breadImage.imageUrl ? (
                <>
                  <div className="any_image">
                    <img src={breadImage.imageUrl} alt="" className="image3" />
                  </div>
                  <div className="button_wrap1" onClick={resetInput}>
                    <CloseButton />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="search nav justify-content-end row w-100">
            <button type="button" className="btn btn-secondary btn-sm col-1" onClick={handleRemove}>
              취소
            </button>

            <button type="submit" className="btn btn-primary btn-sm col-1">
              저장
            </button>
          </div>
          <div className="search nav justify-content-end row w-100">
            <Link to="/bread_list" className="btn btn-primary btn-sm col-2 text3">
              목록
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default BreadRegister;
