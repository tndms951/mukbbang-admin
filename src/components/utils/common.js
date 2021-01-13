/* eslint-disable no-useless-escape */
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const isEmailValid = (value) => {
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{3,3}$/i;
  return !regExp.test(value);
};

export const sweetAlert = (title, icon = 'error') => (
  MySwal.fire({
    title,
    icon
  })
);

export const errorhandler = (err) => {
  if (err && err.response) {
    const { data } = err.response;
    const { message } = data;
    sweetAlert(message);
  } else {
    sweetAlert('네트워크가 불안정합니다. 다시 시도해 주세요.');
  }
};

// eslint-disable-next-line arrow-body-style
export const sweetAlertConfirm = async (title) => {
  return new Promise((resolve) => {
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
};
