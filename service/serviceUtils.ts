import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {BASE_URL} from './config';
import {useAppDispatch} from '../constants/utils/hooks';
import {showToast} from '../reducerSlices/toastSlice';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const useHandleUnAuthenticatedError = () => {
  // const {useRefreshTokenMutation} = useAuth();
  const dispatch = useAppDispatch();

  // const {access_token, refreshs_token} = useAppSelector(
  //   state => state.isLoggedIn,
  // );

  // const {refreshTokenMutation} = useRefreshTokenMutation();
  const handleUnAuthenticatedError = async (error: AxiosError | any) => {
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;
    if (error === null)
      throw new Error('Unrecoverable error!! occured, Try again');
    if (axios.isAxiosError(error)) {
      // console.log({axiosError: error});

      //here we have a type guard check, error inside this if will be treated as AxiosError
      const response = error?.response;

      if (response) {
        //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
        const resData = response?.data;

        if (
          (resData?.message === 'Un-authenticated!' ||
            resData?.statusCode === '401') &&
          originalRequest
        ) {
          // originalRequest._retry! = true;
          // refreshTokenMutation(
          //   {
          //     accessToken: access_token!,
          //     refreshToken: refreshs_token!,
          //   },
          //   {
          //     onSuccess: (refreshRes: any) => {
          //       const payload = refreshRes;
          //       originalRequest.headers.Authorization = `Bearer ${payload.accessToken}`;
          //       return http(originalRequest);
          //     },
          //   },
          // );
        } else {
          const responeData = error?.response?.data;

          dispatch(
            showToast({
              status: 2,
              message:
                responeData?.message ??
                responeData?.error ??
                'An error occurred, try again later',
            }),
          );
        }
      }
    }
  };

  return {
    handleUnAuthenticatedError,
  };
};

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setHeaderToken = (token: string) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const removeHeaderToken = () => {
  //client.defaults.headers.common.Authorization = null;
  delete http.defaults.headers.common.Authorization;
};
export const defaultPayload = {};

export const fetchNewToken = async () => {
  try {
    const token: string = await http
      .get('https://test-api.example.com/refresh-token')
      .then(res => res.data.token);
    return token;
  } catch (error) {
    return null;
  }
};

export const refreshAuth = async (failedRequest: any) => {
  const newToken = await fetchNewToken();

  if (newToken) {
    failedRequest.response.config.headers.Authorization = 'Bearer ' + newToken;
    setHeaderToken(newToken);
    // you can set your token in storage too
    // setToken({ token: newToken });
    return Promise.resolve(newToken);
  } else {
    // you can redirect to login page here
    // router.push("/login");
    return Promise.reject();
  }
};
