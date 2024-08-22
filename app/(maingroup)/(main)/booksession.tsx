import React, {useState} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import HeaderComponent from '@/components/header/Header';
import TitleDescBox from '@/components/uttility/TitleDescBox';
import {Controller, useForm} from 'react-hook-form';
import useProfile from '@/service/profile';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import DateTime from '@/components/dateTime/DateTime';
import ButtonComponent from '@/components/button/ButtonComponent';
import Loader from '@/components/loader/Loader';
import SuccessComponent from '@/components/success/SuccessComponent';
import {router} from 'expo-router';
import dayjs from 'dayjs';

const BookSession = () => {
  const {useGetProfile, useBookSession} = useProfile();
  const {profileData} = useGetProfile();
  const {bookSessionMutation, isLoadingBookSession, isSuccess} =
    useBookSession();
  const userProfile = profileData?.user ?? {};
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: `${userProfile?.firstname ?? ''} ${userProfile?.lastname}`,
      email: `${userProfile?.email ?? ''}`,
      reason: '',
    },
  });
  const [dob, setDob] = useState(new Date());
  const [tob, setTob] = useState(new Date());
  const bookSession = (data: any) => {
    bookSessionMutation({
      email: data?.email ?? '',
      name: data?.name ?? '',
      reason: data?.reason ?? '',
      date: dayjs(dob).format('YYYY-MM-DD'),
      time: dayjs(tob).format('hh:mm'),
    });
  };
  return (
    <>
      {isSuccess ? (
        <SuccessComponent
          title="Session Booked"
          desc="You have successfully booked a session. You'll get a confirmation message to confirm this booking."
          btnText="Back To Settings"
          btnOnPress={() => router.replace('profile')}
          secondBtnText="Go To Dashboard"
          secondBtnOnPress={() => router.replace('home')}
        />
      ) : isLoadingBookSession ? (
        <Loader />
      ) : (
        <LayoutWithSafeArea>
          <Box flex={1} style={[globalStyle.px1p6]}>
            <HeaderComponent text="" />
            <Box flex={1} style={[globalStyle.pt4]}>
              <TitleDescBox
                title="Book A Session"
                bigText
                desc="Fill the fields below to book a coaching session."
              />
              <Box style={[globalStyle.pt2p4]}>
                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: {
                      value: true,
                      message: 'Name is required',
                    },
                  }}
                  render={({field: {value, onBlur, onChange}}) => (
                    <TextInputComponent
                      title="Name"
                      placeholder={'Enter name'}
                      errorText={errors?.name?.message}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={false}
                    />
                  )}
                />
              </Box>
              <Box style={[globalStyle.pt2p4]}>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: {
                      value: true,
                      message: 'email is required',
                    },
                  }}
                  render={({field: {value, onBlur, onChange}}) => (
                    <TextInputComponent
                      title="Email"
                      placeholder={'Enter email'}
                      errorText={errors?.email?.message}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={false}
                    />
                  )}
                />
              </Box>
              <Box style={[globalStyle.pt2p4]}>
                <Controller
                  control={control}
                  name="reason"
                  rules={{}}
                  render={({field: {value, onBlur, onChange}}) => (
                    <TextInputComponent
                      title="Reason for Session"
                      placeholder={'Enter Reason'}
                      errorText={errors?.reason?.message}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      multiline
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
                  <DateTime
                    date={dob}
                    placeholder="dd / mm / yy"
                    setDate={setDob}
                    initial
                    title="Date of birth"
                  />
                </Box>
                <Box style={[globalStyle.w5, globalStyle.pl0p8]}>
                  <DateTime
                    date={tob}
                    placeholder="00 : 00 : 00 AM"
                    setDate={setTob}
                    initial
                    title="Date of birth"
                    pickerType="time"
                  />
                </Box>
              </Box>
              <Box style={[globalStyle.py3]}>
                <ButtonComponent
                  title="Submit"
                  onPress={handleSubmit(bookSession)}
                />
              </Box>
            </Box>
          </Box>
        </LayoutWithSafeArea>
      )}
    </>
  );
};

export default BookSession;
