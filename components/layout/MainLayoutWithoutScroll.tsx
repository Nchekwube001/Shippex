import React, {FC, ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import {StatusBar} from 'react-native';
import {useAppSelector} from '../../constants/utils/hooks';
import pallete from '../../constants/colors/pallete';

interface MainLayoutProps {
  children: ReactNode;
  lightBar?: boolean;
  purpleStatus?: boolean;
  hideAvoiding?: boolean;
  statusHidden?: boolean;

  noTouchable?: boolean;
}
const MainLayoutWithoutScrollComponent: FC<MainLayoutProps> = ({
  children,
  lightBar,
  noTouchable,
  purpleStatus,
  hideAvoiding,
  statusHidden,
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);

  return (
    <>
      {hideAvoiding ? (
        <Box
          style={[globalStyle.flexOne]}
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <StatusBar
            hidden={statusHidden}
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

          <Box flex={1} backgroundColor={'mainBackground'}>
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
        </Box>
      ) : (
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
            barStyle={
              lightBar
                ? 'light-content'
                : darkMode
                ? 'light-content'
                : 'dark-content'
            }
          />

          <Box flex={1} backgroundColor={'mainBackground'}>
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
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default MainLayoutWithoutScrollComponent;
