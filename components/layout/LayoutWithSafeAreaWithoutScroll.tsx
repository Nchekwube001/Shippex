import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import pallete from '../../constants/colors/pallete';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
interface MainLayoutProps {
  children: ReactNode;
  noTouchable?: boolean;
  primaryStatus?: boolean;
}
const LayoutWithSafeAreaWithoutScroll: FC<MainLayoutProps> = ({
  children,
  noTouchable,
  primaryStatus,
}) => {
  return (
    <>
      {
        <KeyboardAvoidingView
          style={[globalStyle.flexOne]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <StatusBar
            backgroundColor={primaryStatus ? pallete.primary : pallete.white}
            style={primaryStatus ? 'light' : 'dark'}
          />

          <SafeAreaView
            style={[
              globalStyle.flexOne,
              globalStyle.bgWhite,
              globalStyle.ptStatus,
              primaryStatus && globalStyle.bgPrimary,
            ]}>
            <Box
              flex={1}
              backgroundColor={'mainBackground'}
              style={[primaryStatus && globalStyle.bgPrimary]}>
              {noTouchable ? (
                <>{children}</>
              ) : (
                <TouchableWithoutFeedback
                  accessible={false}
                  onPress={Keyboard.dismiss}
                  style={[globalStyle.flexOne]}>
                  {children}
                </TouchableWithoutFeedback>
              )}
            </Box>
          </SafeAreaView>
        </KeyboardAvoidingView>
      }
    </>
  );
};

export default LayoutWithSafeAreaWithoutScroll;
