/* eslint-disable no-useless-escape */
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const isEmailValid = (value) => {
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{3,3}$/i;
  return !regExp.test(value);
};

// alert창 라이브러리
export const sweetAlert = (title, icon = 'error') => (
  MySwal.fire({
    title,
    icon
  })
);

// 성공시 alert창
export const sweetAlertSuccess = (title, icon = 'success') => {
  MySwal.fire({
    icon,
    title
  });
};

// 에러 핸들러
export const errorhandler = (err) => {
  if (err && err.response) {
    const { data } = err.response;
    const { message } = data;
    sweetAlert(message);
  } else {
    sweetAlert('네트워크가 불안정합니다. 다시 시도해 주세요.');
  }
};

// alert 확인창
export const sweetAlertConfirm = async (title) => new Promise((resolve) => {
  Swal.fire({
    title,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '예',
    cancelButtonText: '아니요'
  }).then((result) => resolve(result.isConfirmed));
});

// 날짜 체크박스
export const daysList = ['월', '화', '수', '목', '금', '토', '일'];
