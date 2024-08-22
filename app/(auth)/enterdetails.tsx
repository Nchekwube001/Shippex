import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import CheckboxComponent from '@/components/checkBox/Checkbox';
import globalStyle from '@/globalStyle/globalStyle';
import Box from '@/components/layout/Box';
import TextComponent from '@/components/text/TextComponent';
import PressableComponent from '@/components/pressable/PressableComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import {router} from 'expo-router';
import PhonePickerTextInputComponent from '@/components/textInputs/PhonePickerTextInputComponent';
import {
  isOver18,
  trimEmail,
  trimPhone,
  validatePhone,
} from '@/constants/utils/utils';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import {
  appName,
  emailPattern,
  genderList,
  genderInterface,
} from '@/constants/utils/constants';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Loader from '@/components/loader/Loader';
import LogoComponent from '@/components/globals/LogoComponent';
import DateTime from '@/components/dateTime/DateTime';
import SelectComponent from '@/components/select/SelectComponent';
import {setRegisteringUser} from '@/reducerSlices/registeringUserSlice';
import {useAppDispatch, useAppSelector} from '@/constants/utils/hooks';
import dayjs from 'dayjs';
import BottomSheetComponent from '@/components/bottomSheet/BottomSheetComponent';
import CloseIcon from '@/assets/svgs/closeIconWithBorder.svg';
import SocialLoginComponent from '@/components/uttility/SocialLoginComponent';
import {showToast} from '@/reducerSlices/toastSlice';

const EnterDetails = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    control,
    formState: {errors},
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNo: '',
      // email: 'granduaseryuloru@gmail.com',
      // firstName: 'Gran',
      // lastName: 'D',
      // username: 'grandigory',
      // phoneNo: '08096296302',
    },
  });
  const watchUsername = watch('username');
  if (!watchUsername) {
  }
  const {currentCountry} = useAppSelector(state => state.flagList);
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState<genderInterface>({
    desc: '',
    value: '',
  });

  const [dob, setDob] = useState(new Date());

  // console.log({
  //   isOver: ,
  // });

  const [agree, setAgree] = useState(false);
  const onNext = (data: any) => {
    if (!isOver18(dob)) {
      dispatch(
        showToast({
          message: 'You have to be at least 18 years old to use this app',
          status: 2,
        }),
      );
    } else {
      dispatch(
        setRegisteringUser({
          email: trimEmail(data.email),
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          phoneNumber: currentCountry.dial_code + trimPhone(data.phoneNo),
          gender: gender?.value,
          dob: dayjs(dob).format('YYYY-MM-DD'),
        }),
      );
      router.navigate('setpassword');
    }
  };
  if (!onNext) {
  }
  return (
    <>
      <BottomSheetComponent
        grayBg
        setShowBlur={setShowModal}
        showBlur={showModal}>
        <Box
          style={[
            globalStyle.w10,
            globalStyle.pb3,
            globalStyle.pt1p6,
            // styles.maxHeight,
          ]}>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.justifyBetween,
              globalStyle.alignItemsCenter,
              globalStyle.px2p4,
            ]}>
            <Box>
              <TextComponent
                style={[
                  globalStyle.fontSize16,
                  globalStyle.fontWeight500,
                  globalStyle.fontGroteskMedium,
                ]}>
                Select gender
              </TextComponent>
            </Box>
            <PressableComponent onPress={() => setShowModal(false)}>
              <CloseIcon />
            </PressableComponent>
          </Box>
          <Box>
            {genderList.map(({desc, value}, index) => (
              <PressableComponent
                onPress={() => {
                  setGender({
                    desc,
                    value,
                  });
                  setShowModal(false);
                }}
                key={index.toString()}
                style={[
                  globalStyle.w10,
                  globalStyle.flexrow,
                  globalStyle.alignItemsCenter,
                  globalStyle.px2p4,
                  globalStyle.py1p6,
                ]}>
                <Box>
                  <TextComponent style={[globalStyle.fontWeight500]}>
                    {desc}
                  </TextComponent>
                </Box>
              </PressableComponent>
            ))}
          </Box>
        </Box>
      </BottomSheetComponent>
      {false ? (
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
                Create an Account
              </TextComponent>
            </Box>
            <Box style={[globalStyle.pt0p8]}>
              <TextComponent style={[globalStyle.fontSize12]}>
                Fill the fields below to create your {appName} account.
              </TextComponent>
            </Box>
            <Box
              style={[
                globalStyle.pt2p4,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
              ]}>
              <Box style={[globalStyle.w5, globalStyle.pr0p8]}>
                <Controller
                  control={control}
                  name="firstName"
                  rules={{
                    required: {
                      value: true,
                      message: 'First name is required',
                    },
                  }}
                  render={({field: {onBlur, onChange, value}}) => (
                    <TextInputComponent
                      //   editable={!(isLoadingAirtime || isLoadingTransReq)}
                      title="First name"
                      placeholder={'Enter first name'}
                      errorText={errors?.firstName?.message}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Box>
              <Box style={[globalStyle.w5, globalStyle.pl0p8]}>
                <Controller
                  control={control}
                  name="lastName"
                  rules={{
                    required: {
                      value: true,
                      message: 'Last name is required',
                    },
                  }}
                  render={({field: {onBlur, onChange, value}}) => (
                    <TextInputComponent
                      //   editable={!(isLoadingAirtime || isLoadingTransReq)}
                      title="Last name"
                      placeholder={'Enter last name'}
                      errorText={errors?.lastName?.message}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box style={[globalStyle.pt2p4, globalStyle.w10]}>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                }}
                render={({field: {value, onBlur, onChange}}) => (
                  <TextInputComponent
                    title="Username"
                    placeholder={'Enter username'}
                    errorText={errors?.username?.message}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Box>
            <Box style={[globalStyle.pt2p4, globalStyle.w10]}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: 'Email address is required',
                  },
                  pattern: {
                    value: emailPattern,
                    message: 'Enter a valid email',
                  },
                }}
                render={({field: {value, onBlur, onChange}}) => (
                  <TextInputComponent
                    title="Email address"
                    keyboardType="email-address"
                    placeholder={'Enter email address'}
                    errorText={errors?.email?.message}
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
                globalStyle.alignItemsCenter,
                globalStyle.w10,
              ]}>
              <Controller
                control={control}
                name="phoneNo"
                rules={{
                  required: {
                    value: true,
                    message: 'Phone number is required',
                  },
                  validate: value =>
                    validatePhone(value) || 'Phone number is not valid',
                }}
                render={({field: {onBlur, onChange, value}}) => (
                  // <></>
                  <PhonePickerTextInputComponent
                    title="Phone number"
                    keyboardType="number-pad"
                    placeholder={'Enter Phone number'}
                    errorText={errors?.phoneNo?.message}
                    onChangeText={onChange}
                    // setValue={setContactValue}
                    value={value}
                    // showContacts
                    onBlur={onBlur}
                  />
                )}
              />
            </Box>
            <Box
              style={[
                globalStyle.pt2p4,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
              ]}>
              <Box style={[globalStyle.w5, globalStyle.pr0p8]}>
                <SelectComponent
                  value={gender?.desc}
                  label="Gender"
                  placeholder="--select option--"
                  onPress={() => {
                    setShowModal(true);
                  }}
                />
              </Box>
              <Box style={[globalStyle.w5, globalStyle.pl0p8]}>
                <DateTime
                  date={dob}
                  placeholder="dd / mm / yy"
                  setDate={setDob}
                  initial
                  title="Date of birth"
                />
              </Box>
            </Box>
            <Box
              style={[
                globalStyle.pt1p6,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.w10,
              ]}>
              <Box>
                <CheckboxComponent
                  value={agree}
                  setValue={val => setAgree(val)}
                />
              </Box>
              <Box
                style={[
                  globalStyle.ml0p8,
                  globalStyle.flexwrap,
                  globalStyle.flexrow,
                ]}
                flex={1}>
                <TextComponent
                  style={[globalStyle.fontSize11, globalStyle.fontWeight400]}>
                  By signing up, you agree to&nbsp;
                </TextComponent>
                <PressableComponent
                  onPress={() => {
                    router.push('termsauth');
                  }}>
                  <TextComponent
                    primary
                    style={[
                      globalStyle.fontSize11,
                      globalStyle.fontWeight500,
                      globalStyle.underline,
                    ]}>
                    Terms & Conditions&nbsp;
                  </TextComponent>
                </PressableComponent>
                <TextComponent
                  style={[globalStyle.fontSize11, globalStyle.fontWeight400]}>
                  and&nbsp;
                </TextComponent>
                <PressableComponent
                  onPress={() => {
                    router.push('privacyauth');
                  }}>
                  <TextComponent
                    primary
                    style={[
                      globalStyle.fontSize11,
                      globalStyle.fontWeight500,
                      globalStyle.underline,
                    ]}>
                    Privacy Policy
                  </TextComponent>
                </PressableComponent>
              </Box>
            </Box>
            <Box style={[globalStyle.pt4, globalStyle.w10]}>
              <ButtonComponent
                disabled={!agree}
                title="Continue"
                onPress={handleSubmit(onNext)}
                // onPress={() => {
                //   router.navigate('setpassword');
                // }}
              />
            </Box>
            <Box
              style={[
                globalStyle.pt3p2,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.justifyCenter,
              ]}>
              <TextComponent style={[]}>Already have an account?</TextComponent>
              <PressableComponent
                onPress={() => router.navigate('login')}
                style={[globalStyle.ml0p4]}>
                <TextComponent
                  secondary
                  style={[globalStyle.fontWeight500, globalStyle.underline]}>
                  Sign In
                </TextComponent>
              </PressableComponent>
            </Box>
            <SocialLoginComponent />
          </Box>
        </LayoutWithSafeArea>
      )}
    </>
  );
};

export default EnterDetails;
