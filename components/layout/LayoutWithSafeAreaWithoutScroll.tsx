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
import {StatusBar} from 'react-native';
import {useAppSelector} from '../../constants/utils/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
interface MainLayoutProps {
  children: ReactNode;
  grayBg?: boolean;
  transparent?: boolean;
  showAvoiding?: boolean;
  purpleStatus?: boolean;
  lightBar?: boolean;
  purpleDarkBg?: boolean;
  noTouchable?: boolean;
  purpleBg?: boolean;
}
const LayoutWithSafeAreaWithoutScroll: FC<MainLayoutProps> = ({
  children,
  showAvoiding = true,
  transparent,
  noTouchable,
  purpleStatus,
  lightBar,
  purpleDarkBg,
  purpleBg,
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  return (
    <>
      {showAvoiding ? (
        <KeyboardAvoidingView
          style={[globalStyle.flexOne]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <StatusBar
            backgroundColor={
              purpleStatus
                ? pallete.primaryDark
                : darkMode
                ? pallete.black
                : pallete.white
            }
            barStyle={darkMode || purpleBg ? 'light-content' : 'dark-content'}
          />

          <SafeAreaView
            style={[
              globalStyle.flexOne,
              globalStyle.bgWhite,
              globalStyle.ptStatus,
              transparent && globalStyle.bgTransparent,
              purpleDarkBg && globalStyle.bgPurpleDark,
              purpleBg && globalStyle.bgPurpleLayout,

              // darkMode && globalStyle.bgDarkPrimary,
            ]}>
            <Box
              flex={1}
              backgroundColor={purpleDarkBg ? 'bgPurpleDark' : 'mainBackground'}
              style={[
                transparent && globalStyle.bgTransparent,
                purpleBg && globalStyle.bgPurpleLayout,
              ]}>
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
      ) : (
        <Box flex={1}>
          <StatusBar
            backgroundColor={
              purpleStatus
                ? pallete.primaryDark
                : darkMode
                ? pallete.black
                : pallete.white
            }
            barStyle={
              lightBar
                ? 'light-content'
                : darkMode
                ? 'light-content'
                : 'dark-content'
            }
          />
          <SafeAreaView
            style={[
              globalStyle.flexOne,
              globalStyle.bgWhite,
              transparent && globalStyle.bgTransparent,
              purpleDarkBg && globalStyle.bgPurpleDark,
              // darkMode && globalStyle.bgDarkPrimary,
            ]}>
            <Box
              flex={1}
              backgroundColor={purpleDarkBg ? 'bgPurpleDark' : 'mainBackground'}
              style={[transparent && globalStyle.bgTransparent]}>
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
        </Box>
      )}
    </>
  );
};

export default LayoutWithSafeAreaWithoutScroll;
