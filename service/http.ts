import {http, useHandleUnAuthenticatedError} from './serviceUtils';

import {useAppSelector} from '../constants/utils/hooks';
export const useHttp = () => {
  const {access_token} = useAppSelector(state => state.isLoggedIn);
  const {handleUnAuthenticatedError} = useHandleUnAuthenticatedError();

  http.interceptors.request.use(params => {
    if (access_token) {
      params.headers.Authorization = `Bearer ${access_token}`;
    }

    return params;
  });
  http.interceptors.response.use(
    async response => {
      return response;
    },
    error => {
      handleUnAuthenticatedError(error);
      return Promise.reject(error);
    },
  );

  return {
    http,
  };
};
