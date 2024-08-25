import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React, {FC, ReactNode} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
import {StatusBar} from 'expo-status-bar';
import Box from './Box';
import pallete from '../../constants/colors/pallete';
import {SafeAreaView} from 'react-native-safe-area-context';
interface MainLayoutProps {
  children: ReactNode;
  transparent?: boolean;
  grayBg?: boolean;
  purpleBg?: boolean;
}
const LayoutWithSafeArea: FC<MainLayoutProps> = ({children}) => {
  return (
    <>
      {
        <KeyboardAvoidingView
          style={[globalStyle.flexOne]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <StatusBar backgroundColor={pallete.white} style={'dark'} />

          <SafeAreaView
            style={[
              globalStyle.flexOne,
              globalStyle.bgWhite,
              globalStyle.ptStatus,
            ]}>
            <Box flex={1} backgroundColor={'mainBackground'} style={[]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={[globalStyle.flexOne]}>
                {children}
              </ScrollView>
            </Box>
          </SafeAreaView>
        </KeyboardAvoidingView>
      }
    </>
  );
};

export default LayoutWithSafeArea;
