import React, {FC, ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import {StatusBar} from 'react-native';
import pallete from '../../constants/colors/pallete';

interface MainLayoutProps {
  children: ReactNode;
  lightBar?: boolean;
  grayBg?: boolean;
  noTouchable?: boolean;
}
const MainLayoutComponent: FC<MainLayoutProps> = ({
  children,
  noTouchable,
  lightBar,
}) => {
  return (
    <KeyboardAvoidingView
      style={[globalStyle.flexOne]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        backgroundColor={lightBar ? pallete.black : pallete.white}
        barStyle={lightBar ? 'light-content' : 'dark-content'}
      />

      <Box flex={1} backgroundColor={'mainBackground'}>
        {noTouchable ? (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={[globalStyle.flexOne]}>
              {children}
            </ScrollView>
          </>
        ) : (
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
            style={[globalStyle.flexOne]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={[globalStyle.flexOne]}>
              {children}
            </ScrollView>
          </TouchableWithoutFeedback>
        )}
      </Box>
    </KeyboardAvoidingView>
  );
};

export default MainLayoutComponent;
