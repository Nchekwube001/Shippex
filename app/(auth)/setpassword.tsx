import React, {useMemo} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import globalStyle from '@/globalStyle/globalStyle';
import LogoComponent from '@/components/globals/LogoComponent';
import Box from '@/components/layout/Box';
import PasswordCheck from '@/assets/svgs/PasswordCheck.svg';
import PasswordUncheck from '@/assets/svgs/PasswordUncheck.svg';
import TextComponent from '@/components/text/TextComponent';
import {Controller, useForm} from 'react-hook-form';
import {
  containsEightVal,
  containsLowercase,
  containsOneVal,
  containsSpecial,
  containsUppercase,
  hashString,
} from '@/constants/utils/utils';
import {passwordPattern, passwordText} from '@/constants/utils/constants';
import PasswordInputComponent from '@/components/textInputs/PasswordInputComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import {router} from 'expo-router';
import {useAppSelector} from '@/constants/utils/hooks';
import useAuth from '@/service/auth';
import Loader from '@/components/loader/Loader';

const SetPassword = () => {
  const {
    control,
    formState: {errors},
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });
  const watchPassword = watch('password');
  const {useRegisterMutation} = useAuth();
  const {isLoading, registerUserMutation} = useRegisterMutation();
  const {dob, email, firstName, gender, lastName, phoneNumber, username} =
    useAppSelector(state => state.registeringUser);
  const tickLists = useMemo(
    () => [
      {
        text: '1 special character',
        isValid: containsSpecial(watchPassword),
      },
      {
        text: 'At least 1 uppercase',
        isValid: containsUppercase(watchPassword),
      },
      {
        text: 'At least 1 lowercase',
        isValid: containsLowercase(watchPassword),
      },
      {
        text: 'At least 1 number',
        isValid: containsOneVal(watchPassword),
      },

      {
        text: 'Minimum of 8 characters',
        isValid: containsEightVal(watchPassword),
      },
    ],
    [watchPassword],
  );
  const registerUser = () => {
    registerUserMutation(
      {
        email,
        confirmPassword: hashString(watchPassword),
        password: hashString(watchPassword),
        firstname: firstName,
        lastname: lastName,
        phone: phoneNumber,
        dob,
        gender,
        username,
      },
      {
        onSuccess: () => {
          router.navigate('verifyemail');
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
          <Box style={[globalStyle.px2p4, globalStyle.pt2p4, globalStyle.pb2]}>
            <LogoComponent />
            <Box style={[globalStyle.pt2p4]}>
              <TextComponent
                secondary
                style={[
                  globalStyle.fontMatterBold,
                  globalStyle.fontWeight500,
                  globalStyle.fontSize22,
                ]}>
                Set Password
              </TextComponent>
            </Box>
            <Box style={[globalStyle.pt0p8]}>
              <TextComponent style={[globalStyle.fontSize12]}>
                Input and confirm your password below
              </TextComponent>
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
              <Box
                style={[
                  globalStyle.flexrow,
                  globalStyle.mt1p2,
                  globalStyle.flexwrap,
                  globalStyle.bgTextInput,
                  globalStyle.borderRadius4,
                  globalStyle.p0p8,
                ]}>
                {tickLists.map(({text, isValid}, index) => (
                  <Box
                    key={index.toString()}
                    style={[
                      globalStyle.mr1,
                      // globalStyle.mb1p2,
                      // globalStyle.px1p6,
                      globalStyle.py0p6,
                      globalStyle.br,
                      globalStyle.flexrow,
                      globalStyle.alignItemsCenter,
                      // {
                      //   backgroundColor: bg,
                      // },
                    ]}>
                    {isValid ? (
                      <PasswordCheck width={22} height={22} />
                    ) : (
                      <PasswordUncheck width={22} height={22} />
                    )}
                    <TextComponent
                      style={[
                        globalStyle.fontSize12,
                        globalStyle.fontMatterLight,
                        globalStyle.pl0p4,
                        //   isValid && globalStyle.textGreen20,
                      ]}>
                      {text}
                    </TextComponent>
                  </Box>
                ))}
              </Box>
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
            <Box style={[globalStyle.pt4, globalStyle.w10]}>
              <ButtonComponent
                title="Continue"
                onPress={handleSubmit(registerUser)}
                // onPress={() => {
                //   router.navigate('verifyemail');
                //   dispatch(
                //     showToast({
                //       status: 2,
                //       message: 'An error occurred, try again later',
                //     }),
                //   );
                // }}
              />
            </Box>
          </Box>
        </LayoutWithSafeArea>
      )}
    </>
  );
};

export default SetPassword;
