/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const UserCheckHOC = (WrapperComponent) => {
  const HOC = (props) => {
    const history = useHistory(); // 라우터가 없을때 라이브러리로 가져와서 사용하는것
    const location = useLocation(); // 라우터가 없을때 라이브러리로 가져와서 사용하는것

    const bringUserToken = localStorage.getItem('token');
    useEffect(() => {
      if (!bringUserToken) {
        const comeAddress = encodeURIComponent(location.pathname + location.search);
        history.push(`/signin?move_address=${comeAddress}`);
      }
    }, []);

    return bringUserToken && <WrapperComponent {...props} />;
  };

  return HOC;
};

export default UserCheckHOC;
