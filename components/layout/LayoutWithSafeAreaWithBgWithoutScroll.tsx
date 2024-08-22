import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import pallete from '../../constants/colors/pallete';
import {StatusBar} from 'react-native';
import {useAppSelector} from '../../constants/utils/hooks';
import layoutBg from '../../assets/images/personalityBg.png';
import SuccessBg from '../../assets/images/SuccessBg.png';
import {SafeAreaView} from 'react-native-safe-area-context';
interface MainLayoutProps {
  children: ReactNode;
  grayBg?: boolean;
  transparent?: boolean;
  showAvoiding?: boolean;
  purpleStatus?: boolean;
  lightBar?: boolean;
  greenImg?: boolean;
  purpleDarkBg?: boolean;
  noTouchable?: boolean;
  successBg?: boolean;
}
const LayoutWithSafeAreaWithBgWithoutScroll: FC<MainLayoutProps> = ({
  children,
  showAvoiding = true,
  transparent,
  noTouchable,
  purpleStatus,
  lightBar,
  successBg,
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  return (
    <>
      {showAvoiding ? (
        <KeyboardAvoidingView
          style={[globalStyle.flexOne, globalStyle.bgTransparent]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
          <ImageBackground
            source={successBg ? SuccessBg : layoutBg}
            style={[globalStyle.w10, globalStyle.h10]}>
            <SafeAreaView
              style={[
                globalStyle.flexOne,
                globalStyle.bgTransparent,

                globalStyle.ptStatus, // transparent && globalStyle.bgTransparent,
                // purpleDarkBg && globalStyle.bgPurpleDark,
                // darkMode && globalStyle.bgDarkPrimary,
              ]}>
              <Box
                flex={1}
                // backgroundColor={
                //   purpleDarkBg ? 'bgPurpleDark' : 'mainBackground'
                // }
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
          </ImageBackground>
        </KeyboardAvoidingView>
      ) : (
        <Box
          style={[globalStyle.flexOne]}
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
          <ImageBackground
            source={successBg ? SuccessBg : layoutBg}
            style={[globalStyle.w10, globalStyle.h10]}>
            <SafeAreaView
              style={[
                globalStyle.flexOne,
                // darkMode && globalStyle.bgDarkPrimary,
              ]}>
              <Box flex={1} style={[transparent && globalStyle.bgTransparent]}>
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
          </ImageBackground>
        </Box>
      )}
    </>
  );
};

export default LayoutWithSafeAreaWithBgWithoutScroll;
