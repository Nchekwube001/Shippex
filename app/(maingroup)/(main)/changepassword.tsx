import ButtonComponent from '@/components/button/ButtonComponent';
import HeaderComponent from '@/components/header/Header';
import Box from '@/components/layout/Box';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Loader from '@/components/loader/Loader';
import SuccessComponent from '@/components/success/SuccessComponent';
import TextComponent from '@/components/text/TextComponent';
import PasswordInputComponent from '@/components/textInputs/PasswordInputComponent';
import {passwordPattern, passwordText} from '@/constants/utils/constants';
import {useAppDispatch} from '@/constants/utils/hooks';
import {hashString} from '@/constants/utils/utils';
import globalStyle from '@/globalStyle/globalStyle';
import {showToast} from '@/reducerSlices/toastSlice';
import useLogout from '@/service/logout';
import useProfile from '@/service/profile';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';

const ChangePassword = () => {
  const {useChangePasswordMutation} = useProfile();
  const dispatch = useAppDispatch();
  const {logout} = useLogout();

  const {changePasswordMutation, isLoadingChangePassword, isSuccess} =
    useChangePasswordMutation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      passwordConfirm: '',
      oldPassword: '',
    },
  });
  const watchPassword = watch('password');
  const resetPassword = (data: any) => {
    // console.log({
    //   oldPassword: data.oldPassword,
    //   confirmNewPassword: data.passwordConfirm,
    //   newPassword: data.password,
    // });

    changePasswordMutation(
      {
        oldPassword: hashString(data.oldPassword),
        confirmNewPassword: hashString(data.passwordConfirm),
        newPassword: hashString(data.password),
      },
      {
        onSuccess: () => {
          dispatch(
            showToast({
              message:
                'Password changed successfully, please login with your new credentials',
              status: 1,
            }),
          );
          logout();
        },
      },
    );
  };
  return (
    <>
      {isSuccess ? (
        <SuccessComponent
          title="Password Successfully Changed"
          desc="You have successfully changed your password. Use the new password to sign in to your Kinnect app."
          btnText="Okay, Go To Settings"
          btnOnPress={() => {}}
        />
      ) : isLoadingChangePassword ? (
        <Loader />
      ) : (
        <LayoutWithSafeArea>
          <Box flex={1} style={[globalStyle.px1p6]}>
            <HeaderComponent text="" />
            <Box flex={1} style={[globalStyle.justifyBetween]}>
              <Box>
                <Box
                  style={[
                    globalStyle.pt4,
                    globalStyle.flexrow,
                    globalStyle.alignItemsCenter,
                    globalStyle.w10,
                  ]}>
                  <TextComponent
                    style={[
                      globalStyle.fontSize20,
                      globalStyle.fontMatterMedium,
                      globalStyle.fontWeight600,
                    ]}>
                    Change Password
                  </TextComponent>
                </Box>
                <Box style={[globalStyle.pt0p8]}>
                  <TextComponent style={[globalStyle.fontSize14]}>
                    Provide your current and new password below.
                  </TextComponent>
                </Box>
                <Box style={[globalStyle.pt2p4]}>
                  <Controller
                    control={control}
                    name="oldPassword"
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
                        title="Old password"
                        placeholder={'Enter old password'}
                        errorText={errors?.oldPassword?.message}
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
                        // editable={!isLoadingRegister}
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
                <Box style={[globalStyle.pb3, globalStyle.pt3]}>
                  <ButtonComponent
                    title="Reset Password"
                    onPress={handleSubmit(resetPassword)}
                    // onPress={() => {
                    //   navigate('loginStack', {
                    //     screen: 'loginScreen',
                    //   });
                    // }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </LayoutWithSafeArea>
      )}
    </>
  );
};

export default ChangePassword;
