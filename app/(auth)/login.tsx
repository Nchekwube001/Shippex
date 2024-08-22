import React from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import LogoComponent from '@/components/globals/LogoComponent';
import {Controller, useForm} from 'react-hook-form';
import {
  emailPattern,
  passwordPattern,
  passwordText,
} from '@/constants/utils/constants';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import PasswordInputComponent from '@/components/textInputs/PasswordInputComponent';
import PressableComponent from '@/components/pressable/PressableComponent';
import TextComponent from '@/components/text/TextComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import {router} from 'expo-router';
import {hashString, trimEmail} from '@/constants/utils/utils';
import useAuth from '@/service/auth';
import {setAlreadyAuth} from '@/reducerSlices/authCheckSlice';
import {setAcessToken, setLoginStatus} from '@/reducerSlices/loginSlice';
import {useAppDispatch} from '@/constants/utils/hooks';
import {setUserDisplayData} from '@/reducerSlices/userDisplayData';
import Loader from '@/components/loader/Loader';
import {setLoggedInUser} from '@/reducerSlices/loggedInUserSlice';
import {useQueryClient} from '@tanstack/react-query';
import SocialLoginComponent from '@/components/uttility/SocialLoginComponent';

const Login = () => {
  const {useLoginMutation} = useAuth();
  const {isLoading, logUserInMutation} = useLoginMutation();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      // email: 'oyakhireemmanuel8@gmail.com',
      // password: 'Halleluyah@1',
      // email: 'granc@gmail.com',
      // password: 'Qwerty1@$',
      // email: 'kiki@kinnectapp.net',
      // password: 'Qwerty1$@',
      email: 'richardebboh@gmail.com',
      password: '55G4f8,4',
      // email: 'unekwesburner@gmail.com',
      // password: 'P@ssword1',
    },
  });
  const logUserIn = async (data: any) => {
    const trimmedEmail = trimEmail(data.email);
    logUserInMutation(
      {
        email: trimmedEmail,
        password: hashString(data.password),
      },
      {
        onSuccess: async loginRes => {
          dispatch(
            setAcessToken({
              access_token: loginRes?.data?.data?.token ?? '',
              refresh_token: loginRes?.data?.data?.token ?? '',
            }),
          );
          queryClient.invalidateQueries();

          dispatch(
            setAlreadyAuth({
              alreadyAuth: true,
            }),
          );
          dispatch(
            setLoginStatus({
              loggedIn: true,
            }),
          );
          dispatch(
            setLoggedInUser({
              email: trimmedEmail,
            }),
          );
          // if (remember) {
          //   dispatch(
          //     setLoggedInUser({
          //       email: trimEmail(data.email),
          //     }),
          //   );
          //   await Keychain.setGenericPassword(trimmedEmail, data.password);
          // }

          dispatch(
            setUserDisplayData({
              ...loginRes?.data?.data?.profile,
            }),
          );
          reset();
          router.replace('/home');
        },
      },
    );
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <LayoutWithSafeArea>
          <Box style={[globalStyle.px2p4, globalStyle.pt2p4]}>
            <LogoComponent />
            <Box style={[globalStyle.pt4]}>
              <TextComponent
                secondary
                style={[
                  globalStyle.fontMatterBold,
                  globalStyle.fontWeight500,
                  globalStyle.fontSize22,
                ]}>
                Sign In to your account
              </TextComponent>
            </Box>
            <Box style={[globalStyle.pt0p8]}>
              <TextComponent style={[globalStyle.fontSize12]}>
                Fill the fields below to sign in to your account
              </TextComponent>
            </Box>
            <Box style={[globalStyle.pt3p2]}>
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
                    title="Password"
                    placeholder={'Enter your password'}
                    errorText={errors?.password?.message}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Box>
            <Box
              style={[
                globalStyle.pt2p4,
                globalStyle.flexrow,
                globalStyle.justifyEnd,
              ]}>
              <PressableComponent
                onPress={() => {
                  router.navigate('forgotpassword');
                }}>
                <TextComponent
                  secondary
                  style={[globalStyle.fontWeight500, globalStyle.underline]}>
                  Forgot Password?
                </TextComponent>
              </PressableComponent>
            </Box>
            <Box style={[globalStyle.pt4]}>
              <ButtonComponent
                title="Login"
                onPress={handleSubmit(logUserIn)}
              />
            </Box>
            {/* {devicehasbiometric && isAvailable && emailValue === email && (
          <Box
            style={[
              globalStyle.pt1p2,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
            ]}>
            <PressableComponent onPress={getCredentials}>
              <FingerPrintIcon />
            </PressableComponent>
          </Box>
        )} */}
            <SocialLoginComponent />

            <Box
              style={[
                globalStyle.pt2p4,
                globalStyle.pb2p4,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.justifyCenter,
              ]}>
              <TextComponent gray style={[]}>
                Don't have an account?
              </TextComponent>
              <PressableComponent
                onPress={() => {
                  router.navigate('enterdetails');
                }}
                style={[globalStyle.ml0p4]}>
                <TextComponent
                  secondary
                  style={[globalStyle.fontWeight500, globalStyle.underline]}>
                  Create account
                </TextComponent>
              </PressableComponent>
            </Box>
          </Box>
        </LayoutWithSafeArea>
      )}
    </>
  );
};

export default Login;
