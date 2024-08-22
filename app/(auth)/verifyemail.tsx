/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import globalStyle from '@/globalStyle/globalStyle';
import VerifyLayout from '@/components/layout/VerifyLayout';
import Box from '@/components/layout/Box';
import {router} from 'expo-router';
import {useAppDispatch, useAppSelector} from '@/constants/utils/hooks';
import {hashString, maskEmail} from '@/constants/utils/utils';
import {setAcessToken} from '@/reducerSlices/loginSlice';
import {showToast} from '@/reducerSlices/toastSlice';
import useAuth from '@/service/auth';

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState('');

  const {useSendEmailOtpMutation, useVerifyEmailOtpMutation} = useAuth();
  const {isLoadingSendOtp, sendOtpMutation} = useSendEmailOtpMutation();
  const {isLoadingVerifyOtp, verifyOtpMutation} = useVerifyEmailOtpMutation();
  const dispatch = useAppDispatch();

  const sendOTP = () => {
    sendOtpMutation(
      {
        email,
      },
      {
        onSuccess: sendSucc => {
          dispatch(
            showToast({
              message: 'OTP sent to your email address',
              status: 1,
            }),
          );
          // console.log({
          //   sendSucc: sendSucc?.data?.data?.verificationOtp,
          // });
          setOtp(sendSucc?.data?.data?.verificationOtp ?? '');
        },
      },
    );
  };
  useEffect(() => {
    sendOTP();
  }, []);

  const verifyOTP = () => {
    verifyOtpMutation(
      {
        otp: hashString(otp),
        email,
      },
      {
        onSuccess: verifySucc => {
          // console.log({
          //   verifySucc: verifySucc?.data,
          // });
          dispatch(
            setAcessToken({
              access_token: verifySucc?.data?.data?.token ?? '',
              refresh_token: verifySucc?.data?.data?.token ?? '',
            }),
          );
          router.replace('home');
        },
      },
    );
  };
  const {email} = useAppSelector(state => state.registeringUser);
  return (
    <LayoutWithSafeAreaWithoutScroll>
      <Box flex={1} style={[globalStyle.px1p6]}>
        <VerifyLayout
          btnText="Verify"
          error={error}
          onResendPress={sendOTP}
          onSubmit={verifyOTP}
          otp={otp}
          setError={setError}
          setOtp={setOtp}
          isLoading={isLoadingSendOtp || isLoadingVerifyOtp}
          title="Verify Your Email"
          to={maskEmail(email ?? '')}
        />
      </Box>
    </LayoutWithSafeAreaWithoutScroll>
  );
};

export default VerifyEmail;
