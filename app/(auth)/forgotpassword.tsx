import React, {useState} from 'react';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import ButtonComponent from '@/components/button/ButtonComponent';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import {Controller, useForm} from 'react-hook-form';
import {
  emailPattern,
  passwordPattern,
  passwordText,
} from '@/constants/utils/constants';
import globalStyle from '@/globalStyle/globalStyle';
import Box from '@/components/layout/Box';
import TextComponent from '@/components/text/TextComponent';
import LogoComponent from '@/components/globals/LogoComponent';
import PasswordInputComponent from '@/components/textInputs/PasswordInputComponent';
import {hashString, trimEmail} from '@/constants/utils/utils';
import useAuth from '@/service/auth';
import {router} from 'expo-router';
import {showToast} from '@/reducerSlices/toastSlice';
import {useAppDispatch} from '@/constants/utils/hooks';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      otp: '',
    },
  });
  const watchPassword = watch('password');

  const dispatch = useAppDispatch();
  const {useResetPassword, useInitResetPassword} = useAuth();
  const {initResetPasswordMutation, isLoadingInitReset} =
    useInitResetPassword();

  const {resetPasswordMutation, isLoadingResetPassword} = useResetPassword();
  const sendOtp = (data: any) => {
    initResetPasswordMutation(
      {
        email: trimEmail(data.email),
      },
      {
        onSuccess: initRes => {
          dispatch(
            showToast({
              message:
                initRes?.data?.message ??
                'OTP has been sent to your email address',
              status: 1,
            }),
          );
          setStep(2);
        },
      },
    );
  };
  const resetPassword = (data: any) => {
    resetPasswordMutation(
      {
        token: hashString(data.otp),
        password: hashString(data.password),
        confirmPassword: hashString(data.passwordConfirm),
      },
      {
        onSuccess: resetRes => {
          // console.log({
          //   loginRes,
          // });
          dispatch(
            showToast({
              message:
                resetRes?.data?.message ?? 'Password successfully changed',
              status: 1,
            }),
          );
          router.replace('login');
        },
      },
    );
  };
  return (
    <LayoutWithSafeAreaWithoutScroll>
      <>
        {step === 1 && (
          <Box flex={1} style={[globalStyle.px1p6]}>
            <Box flex={1} style={[globalStyle.justifyBetween]}>
              <Box>
                <Box
                  style={[
                    globalStyle.pt2p4,
                    // globalStyle.flexrow,
                    // globalStyle.alignItemsCenter,
                    // globalStyle.w10,
                  ]}>
                  <LogoComponent />
                  <Box style={[globalStyle.pt2p4]}>
                    <TextComponent
                      secondary
                      style={[
                        globalStyle.fontMatterBold,
                        globalStyle.fontWeight500,
                        globalStyle.fontSize22,
                      ]}>
                      Forgot Your Password?
                    </TextComponent>
                  </Box>
                </Box>
                <Box style={[globalStyle.pt0p8]}>
                  <TextComponent style={[globalStyle.fontSize12]}>
                    Provide your registered email address below to reset your
                    password.
                  </TextComponent>
                </Box>
                <Box style={[globalStyle.pt2p4]}>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                      pattern: {
                        value: emailPattern,
                        message: 'Enter a valid email',
                      },
                    }}
                    render={({field: {value, onBlur, onChange}}) => (
                      <TextInputComponent
                        editable={!isLoadingInitReset}
                        title="Email address"
                        placeholder={'Enter your email address'}
                        errorText={errors?.email?.message}
                        value={value}
                        keyboardType="email-address"
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box style={[globalStyle.pb3]}>
                <ButtonComponent
                  loading={isLoadingInitReset}
                  title="Recover password"
                  onPress={handleSubmit(sendOtp)}
                />
              </Box>
            </Box>
          </Box>
        )}
        {step === 2 && (
          <Box flex={1} style={[globalStyle.justifyBetween, globalStyle.px1p6]}>
            <Box>
              <Box style={[globalStyle.pt2p4]}>
                <LogoComponent />
                <Box style={[globalStyle.pt2p4]}>
                  <TextComponent
                    style={[
                      globalStyle.fontMatterBold,
                      globalStyle.fontWeight500,
                      globalStyle.fontSize22,
                    ]}>
                    Reset Password
                  </TextComponent>
                </Box>
              </Box>
              <Box style={[globalStyle.pt0p8]}>
                <TextComponent
                  style={[
                    globalStyle.fontSize13,
                    globalStyle.fontMatterLight,
                    globalStyle.fontWeight500,
                  ]}>
                  Input and confirm your new password below
                </TextComponent>
              </Box>
              <Box style={[globalStyle.pt2p4]}>
                <Controller
                  control={control}
                  name="otp"
                  rules={{
                    required: {
                      value: true,
                      message: 'OTP is required',
                    },
                  }}
                  render={({field: {onBlur, onChange, value}}) => (
                    <TextInputComponent
                      editable={!isLoadingResetPassword}
                      title="OTP"
                      placeholder={'Enter OTP'}
                      errorText={errors?.otp?.message}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      keyboardType="number-pad"
                    />
                  )}
                />
              </Box>
              <Box style={[globalStyle.pt2p4]}>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    pattern: {
                      value: passwordPattern,
                      message: passwordText,
                    },
                  }}
                  render={({field: {value, onBlur, onChange}}) => (
                    <PasswordInputComponent
                      editable={!isLoadingResetPassword}
                      title="New password"
                      placeholder={'Enter new password'}
                      errorText={errors?.password?.message}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Box>
              <Box style={[globalStyle.pt2p4]}>
                <Controller
                  control={control}
                  name="passwordConfirm"
                  rules={{
                    required: {
                      value: true,
                      message: 'Input your new password',
                    },
                    pattern: {
                      value: passwordPattern,
                      message: passwordText,
                    },
                    validate: value =>
                      value === watchPassword || 'The passwords do not match',
                    minLength: {
                      value: 8,
                      message: 'Password should be at least 8 characters',
                    },
                  }}
                  render={({field: {value, onBlur, onChange}}) => (
                    <PasswordInputComponent
                      editable={!isLoadingResetPassword}
                      value={value}
                      title="Confirm Password"
                      placeholder={'Confirm new password'}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorText={errors?.passwordConfirm?.message}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box style={[globalStyle.pb3]}>
              <ButtonComponent
                title="Reset Password"
                onPress={handleSubmit(resetPassword)}
                loading={isLoadingResetPassword}
                // onPress={() => {
                //   navigate('loginStack', {
                //     screen: 'loginScreen',
                //   });
                // }}
              />
            </Box>
          </Box>
        )}
      </>
    </LayoutWithSafeAreaWithoutScroll>
  );
};

export default ForgotPassword;
