import React from 'react';
import './admin_main.css';

function content() {
  return (
    <div className="main_wrap">
      <div className="main_title">관리자 프로젝트 사용 서비스</div>
      <div className="bread-house">
        <table border="1" bordercolor="#5c5c5c" width="100%" height="350">
          <tbody>
            <tr>
              <th width="20%" align="center" className="title">
                빵집목록
              </th>
              <td className="content">
                상점 정보[주소/영업시간/주차여부/상점사진] 등록으로 상점 정보를 쉽게 찾아볼 수 있는
                페이지 입니다.
              </td>
            </tr>
            <tr>
              <th width="20%" align="center" className="title">
                빵 목록
              </th>
              <td className="content">
                빵을 등록/수정/삭제 하여 동네 빵 리스트를 볼수 있는 페이지 입니다.
              </td>
            </tr>
            <tr>
              <th width="20%" align="center" className="title">
                빵집 사장 목록
              </th>
              <td className="content">빵집 사장님들 목록을 확인할 수 있는 페이지 입니다. </td>
            </tr>
            <tr>
              <th width="20%" align="center" className="title">
                유튜브 목록
              </th>
              <td className="content">
                유튜버들에 빵,빵집 리뷰를 남긴 등록하여 솔직한 리뷰를 참고 할 수 있는 페이지 입니다.
              </td>
            </tr>
            <tr>
              <th width="20%" align="center" className="title">
                이벤트 목록
              </th>
              <td className="content">
                해당 빵집에 대한 이벤트 설정으로 이벤트 리스트를 참고 할 수 있는 페이지 입니다.
              </td>
            </tr>
            <tr>
              <th width="20%" align="center" className="title">
                공지사항 목록
              </th>
              <td className="content">
                해당 빵집에 대한 공지사항 리스트를 참고 할 수 있는 페이지 입니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default content;
