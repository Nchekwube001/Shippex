import React from 'react';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import {Entypo} from '@expo/vector-icons';
import PressableComponent from '@/components/pressable/PressableComponent';
import palette from '@/constants/colors/pallete';
import TextComponent from '@/components/text/TextComponent';
import {router} from 'expo-router';
import TitleDescBox from '@/components/utility/TitleDescRow';
import {Controller, useForm} from 'react-hook-form';
import PasswordInputComponent from '@/components/textInputs/PasswordInputComponent';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    // mode: 'onBlur',
    defaultValues: {
      url: '',
      password: '',
      username: '',
    },
  });

  const logUserIn = () => {
    router.replace('/shipment');
  };
  return (
    <LayoutWithSafeAreaWithoutScroll>
      <Box
        flex={1}
        style={[
          globalStyle.justifyBetween,
          globalStyle.pt1p6,
          globalStyle.px2,
          globalStyle.pb2p4,
        ]}>
        <Box>
          <Box>
            <PressableComponent
              onPress={() => router.back()}
              style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}>
              <Entypo name="chevron-left" color={palette.primary} size={20} />
              <TextComponent primary style={[]}>
                Cancel
              </TextComponent>
            </PressableComponent>
          </Box>
          <Box style={[globalStyle.pt2p4]}>
            <TitleDescBox
              title="Login"
              desc="Please enter your First, Last name and your phone number in order to register"
            />
          </Box>

          <Box style={[globalStyle.pt4]}>
            <Controller
              name="url"
              control={control}
              rules={{
                required: {
                  message: 'URL is required',
                  value: true,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputComponent
                  value={value}
                  onBlur={onBlur}
                  errorText={errors.url?.message}
                  onChangeText={onChange}
                  placeholder="URL"
                />
              )}
            />
          </Box>
          <Box style={[globalStyle.pt2p2]}>
            <Controller
              name="username"
              control={control}
              rules={{
                required: {
                  message: 'Username is required',
                  value: true,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputComponent
                  value={value}
                  onBlur={onBlur}
                  errorText={errors.username?.message}
                  onChangeText={onChange}
                  placeholder="Username"
                />
              )}
            />
          </Box>
          <Box style={[globalStyle.pt2p2]}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: {
                  message: 'Password is required',
                  value: true,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <PasswordInputComponent
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorText={errors.password?.message}
                  placeholder="Password"
                />
              )}
            />
          </Box>
        </Box>
        <Box>
          <ButtonComponent title="Login" onPress={handleSubmit(logUserIn)} />
        </Box>
      </Box>
    </LayoutWithSafeAreaWithoutScroll>
  );
};

export default Login;
