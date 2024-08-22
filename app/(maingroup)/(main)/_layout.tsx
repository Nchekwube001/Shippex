import React from 'react';
import {Stack} from 'expo-router';

const MainLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="completeprofile" />
      <Stack.Screen name="personalitytest" />
    </Stack>
  );
};

export default MainLayout;
