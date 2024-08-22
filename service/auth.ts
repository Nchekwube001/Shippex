import {useHttp} from './http';
import {useMutation} from '@tanstack/react-query';
import {useHttpFormData} from './httpFormData';
const useAuth = () => {
  const {http} = useHttp();
  const {http: httpFormData} = useHttpFormData();
  const useSendEmailOtpMutation = () => {
    const mutationFn = async (payload: {email: string}) => {
      return await http.get<any>(`auth/verify/otp/${payload.email}`, {});
    };

    const {mutate: sendOtpMutation, isLoading: isLoadingSendOtp} =
      useMutation(mutationFn);

    return {sendOtpMutation, isLoadingSendOtp};
  };
  const useVerifyEmailOtpMutation = () => {
    const mutationFn = async (payload: {otp: number; email: string}) => {
      return await http.post<any>('auth/verify', {
        ...payload,
      });
    };

    const {mutate: verifyOtpMutation, isLoading: isLoadingVerifyOtp} =
      useMutation(mutationFn);

    return {verifyOtpMutation, isLoadingVerifyOtp};
  };
  const useInitResetPassword = () => {
    const mutationFn = async (payload: {email: string}) => {
      return await http.post<any>('auth/forgot-password', payload);
    };
    const {mutate: initResetPasswordMutation, isLoading: isLoadingInitReset} =
      useMutation(mutationFn);

    return {initResetPasswordMutation, isLoadingInitReset};
  };
  const useResetPassword = () => {
    const mutationFn = async (payload: {
      confirmPassword: string;
      token: string;
      password: string;
    }) => {
      // console.log({
      //   payload,
      // });

      return await http.post<any>('auth/forgot-password/reset', payload);
    };
    const {mutate: resetPasswordMutation, isLoading: isLoadingResetPassword} =
      useMutation(mutationFn);

    return {resetPasswordMutation, isLoadingResetPassword};
  };
  const useFileUploadMutation = () => {
    const mutationFn = async (payload: FormData) => {
      return await httpFormData.post<any>('image/upload', payload);
    };

    const {mutateAsync: uploadFileMutation, isLoading: isLoadingUplaodFile} =
      useMutation(mutationFn);

    return {uploadFileMutation, isLoadingUplaodFile};
  };
  const useLoginMutation = () => {
    const mutationFn = async (payload: {email: string; password: string}) => {
      return await http.post<any>('auth/login', payload);
    };
    const {mutate: logUserInMutation, isLoading: isLoadingLogin} =
      useMutation(mutationFn);

    return {logUserInMutation, isLoading: isLoadingLogin};
  };
  const useDeleteAccountMutation = () => {
    const mutationFn = async (payload: {}) => {
      return await http.delete<any>('user', payload);
    };
    const {mutate: deleteUserMutation, isLoading: isLoadingDelete} =
      useMutation(mutationFn);

    return {deleteUserMutation, isLoading: isLoadingDelete};
  };
  const useLogoutMutation = () => {
    const mutationFn = async (payload: {
      refreshToken: string;
      accessToken: string;
    }) => {
      return await http.post<any>('api/Account/Logout', payload);
    };
    const {mutate: logUserOutMutation, isLoading: isLoadingLogout} =
      useMutation(mutationFn);

    return {logUserOutMutation, isLoadingLogout};
  };
  const useRefreshTokenMutation = () => {
    const mutationFn = async (payload: {
      refreshToken: string;
      accessToken: string;
    }) => {
      return await http.post<any>('api/Account/RefreshToken', payload);
    };
    const {mutate: refreshTokenMutation, isLoading: isLoadingRefresh} =
      useMutation(mutationFn);

    return {refreshTokenMutation, isLoadingRefresh};
  };
  const useRegisterMutation = () => {
    const mutationFn = async (payload: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      username: string;
      gender: string;
      dob: string;
      phone: string;
      confirmPassword: string;
      // handle: string;
    }) => {
      return await http.post<any>('auth/register', payload);
    };
    const {mutate: registerUserMutation, isLoading: isLoadingRegister} =
      useMutation(mutationFn);

    return {registerUserMutation, isLoading: isLoadingRegister};
  };
  const useRegisterGoogleMutation = () => {
    const mutationFn = async (payload: {token: string}) => {
      return await http.post<any>('auth/google', payload);
    };
    const {mutate: registerUserMutation, isLoading: isLoadingRegister} =
      useMutation(mutationFn);

    return {registerUserMutation, isLoading: isLoadingRegister};
  };

  return {
    useInitResetPassword,
    useLoginMutation,
    useResetPassword,
    useRegisterMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useFileUploadMutation,
    useSendEmailOtpMutation,
    useVerifyEmailOtpMutation,
    useRegisterGoogleMutation,
    useDeleteAccountMutation,
  };
};

export default useAuth;
