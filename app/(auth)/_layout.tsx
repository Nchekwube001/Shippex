import React from 'react';
import {Stack} from 'expo-router';
import {useAppSelector} from '@/constants/utils/hooks';

type Props = {};

const AuthLayout = (props: Props) => {
  const {access_token} = useAppSelector(state => state.isLoggedIn);
  if (!props && !access_token) {
  }
  //   console.log({
  //     access_token,
  //   });

  //   if (access_token) {
  //     return <Redirect href={"/"} />;
  //   }
  return (
    <Stack
      initialRouteName="onboarding"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen
        name="login"
        // options={{
        //   presentation: 'modal',
        // }}
      />
    </Stack>
  );
};

export default AuthLayout;
