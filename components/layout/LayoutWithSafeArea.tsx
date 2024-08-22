import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import pallete from '../../constants/colors/pallete';
import {useAppSelector} from '../../constants/utils/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
interface MainLayoutProps {
  children: ReactNode;
  transparent?: boolean;
  grayBg?: boolean;
  purpleBg?: boolean;
}
const LayoutWithSafeArea: FC<MainLayoutProps> = ({
  children,
  transparent,
  grayBg,
  purpleBg,
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);

  return (
    <KeyboardAvoidingView
      style={[globalStyle.flexOne]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        backgroundColor={
          purpleBg
            ? pallete.purpleLayout
            : darkMode
            ? pallete.black
            : pallete.white
        }
        barStyle={darkMode || purpleBg ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={[
          globalStyle.flexOne,
          globalStyle.bgPrimary,
          globalStyle.ptStatus,
          // darkMode && globalStyle.bgDarkPrimary,
          transparent && globalStyle.bgTransparent,
          purpleBg && globalStyle.bgPurpleLayout,
        ]}>
        <Box
          flex={1}
          backgroundColor={grayBg ? 'grayBackground' : 'mainBackground'}
          style={[
            transparent && globalStyle.bgTransparent,
            purpleBg && globalStyle.bgPurpleLayout,
          ]}>
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
            style={[
              globalStyle.flexOne,
              transparent && globalStyle.bgTransparent,
            ]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={[globalStyle.flexOne]}>
              {children}
            </ScrollView>
          </TouchableWithoutFeedback>
        </Box>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LayoutWithSafeArea;
