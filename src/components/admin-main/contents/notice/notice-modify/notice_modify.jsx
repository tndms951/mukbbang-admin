// import React, { useEffect, useState } from 'react';
// import DatePicker, { registerLocale } from 'react-datepicker';
// import ko from 'date-fns/locale/ko';
// import { Link } from 'react-router-dom';

// import moment from 'moment';
// import Swal from 'sweetalert2';

// import axios from '../../../../utils/axios';

// // 캘린더 한국어 지정
// registerLocale('ko', ko);

// function NoticeModify({ match, history }) {
//   const [notice, setNotice] = useState(null);

//   const [value, setValue] = useState({
//     title: '',
//     content: '',
//     startDate: ''
//   });

//   // 삭제 api
//   const onDeleteClick = async () => {
//     const { id } = match.params;
//     if (window.confirm('해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
//       try {
//         const { status } = await axios.delete(`/admin/notice/${id}`);
//         if (status === 200) {
//           history.push('/notice');
//           console.log(status);
//         }
//       } catch (err) {
//         if (err && err.response) {
//           const { data } = err.response;
//           const { message } = data;
//           Swal.fire(message);
//         } else {
//           Swal.fire('네트워크가 불안정합니다. 다시 시도해 주세요.');
//         }
//       }
//     }
//   };

//   // 목록으로 바로 가기
//   const onClicklist = () => {
//     history.push('/notice');
//   };

//   // // 수정페이지로 이동하기
//   // const onClickModify = () => {
//   //   history.push('/modify/id');
//   // };

//   useEffect(() => {
//     const { id } = match.params;
//     const noticeModifyApiCall = async () => {
//       try {
//         const { status, data: modifyData } = await axios.put(`/admin/notice/${id}`);
//         if (status === 201) {
//           const { data } = modifyData;
//           console.log(modifyData);
//           setNotice(data);
//         }
//       } catch (err) {
//         if (err && err.response) {
//           console.log(err.response);
//           const { data } = err.response;
//           console.log(data);
//           const { message } = data;
//           alert(message);
//         } else {
//           alert('에러 뭥미');
//         }
//       }
//     };
//     noticeModifyApiCall();
//   }, []);

//   return (
//     <>
//       <div className="card-body">
//         <form className="quick-post-form">
//           <div>
//             <div
//               className="row justify-content-center"
//               style={{
//                 marginBottom: '3%'
//               }}>
//               <label
//                 className="col-sm-2"
//                 style={{
//                   fontSize: '14px',
//                   fontWeight: '600'
//                 }}>
//                 공지사항 제목
//               </label>
//               <input
//                 type="text"
//                 className="form-control col-sm-8"
//                 id="exampleInputEmail1"
//                 aria-describedby="emailHelp"
//                 name="title"
//                 value={value.title}>
//                 {notice && notice.title}
//               </input>
//               {/* <span className="col-sm-8">{notice && notice.title}</span> */}
//             </div>
//             <div
//               className="row justify-content-center"
//               style={{
//                 marginBottom: '3%'
//               }}>
//               <label
//                 className="col-sm-2"
//                 style={{
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   marginBottom: '0px'
//                 }}>
//                 공지사항 날짜
//               </label>
//               <div
//                 className="col-sm-8"
//                 style={{
//                   paddingLeft: '0px',
//                   display: 'flex'
//                 }}>
//                 {/* <DatePicker
//                   className="form-control"
//                   selected={startDate}
//                   // onSelect={handleDateSelect} //when day is clicked
//                   onChange={setStartDate} // only when value has changed
//                   locale="ko" // 달력 한글화
//                   placeholderText="처음 날짜를 선택하세요"
//                   name="setStartDate"
//                   value={setStartDate}
//                 /> */}
//                 <span className="col-sm-8">
//                   {notice && moment(notice.startAt).format('YYYY-MM-DD')}
//                 </span>
//               </div>
//             </div>
//             <div
//               className="row justify-content-center"
//               style={{
//                 marginBottom: '10%'
//               }}>
//               <label
//                 className="col-sm-2"
//                 style={{
//                   fontSize: '14px',
//                   fontWeight: '600'
//                 }}>
//                 공지사항 내용
//               </label>
//               {/* <textarea
//                 className="form-control col-sm-8"
//                 placeholder="내용을 압력해 주세요"
//                 value={content}>
//                 {value.content}
//               </textarea> */}
//               <span className="col-sm-8">{notice && notice.content}</span>
//             </div>
//             <div className="mb-0 row ">
//               <div className="col-sm-9" />
//               <button
//                 type="submit"
//                 className="delete btn btn-danger col-sm-1"
//                 style={{
//                   marginRight: '1%'
//                 }}
//                 onClick={onDeleteClick}>
//                 삭제
//               </button>
//               <button type="submit" className="modify btn btn-accent col-sm-1">
//                 수정
//               </button>
//               <div className="col-sm-9" />
//               <hr />
//               {/* <Link to="/notice"> */}
//               <button
//                 type="submit"
//                 className="btn btn-secondary col-sm-1"
//                 style={{
//                   width: '100%',
//                   marginTop: '5%',
//                   marginLeft: '9%'
//                 }}
//                 onClick={onClicklist}>
//                 목록
//               </button>
//               {/* </Link> */}
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default NoticeModify;
