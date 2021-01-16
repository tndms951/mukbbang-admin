import React from 'react';

import './youtube_list.css';

const youtubeList = () => (
  <>
    <div className="all_wrap">
      <h1 className="text">검색조건</h1>

      <form className="form_wrap">
        <div className="form-group row mt-4">
          <label htmlFor="colFormLabelLg" className="col-xs-2 col-form-label col-form-label-lg youtube-title">
            <span>빵이름</span>
          </label>
          <div className="col-sm-8">
            <input type="title" className="form-control form-control-lg" placeholder="제목을 입력해주세요" />
          </div>
        </div>
      </form>
    </div>
  </>
);

export default youtubeList;
