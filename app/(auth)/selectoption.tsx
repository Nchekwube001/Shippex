import Box from '@/components/layout/Box';
import React from 'react';
import selectBg from '@/assets/images/selectBg.png';
import AppLogo from '@/assets/svgs/AppLogo.svg';
import {ImageBackground} from 'react-native';
import globalStyle from '@/globalStyle/globalStyle';
import {router} from 'expo-router';
import ButtonComponent from '@/components/button/ButtonComponent';
import TextComponent from '@/components/text/TextComponent';

const SelectOption = () => {
  return (
    <Box flex={1}>
      <ImageBackground
        source={selectBg}
        style={[globalStyle.w10, globalStyle.h10, globalStyle.justifyEnd]}>
        <Box style={[globalStyle.px2p4, globalStyle.pb3]}>
          <Box style={[globalStyle.pb1p6, globalStyle.alignItemsCenter]}>
            <AppLogo />
          </Box>
          <Box style={[globalStyle.justifyCenter]}>
            <TextComponent
              style={[
                globalStyle.fontSize22,
                globalStyle.fontWeight700,
                globalStyle.fontMatterBold,
                globalStyle.textCenter,
                globalStyle.textWhite,
                globalStyle.alignItemsCenter,
              ]}>
              Explore with Kinnect!
            </TextComponent>
          </Box>
          <Box style={[globalStyle.pt0p8]}>
            <TextComponent
              style={[
                globalStyle.textCenter,
                globalStyle.fontSize16,
                globalStyle.textGray4,
                globalStyle.textCenter,
                globalStyle.textWhite,
                globalStyle.pt0p2,
                globalStyle.pb0p8,
              ]}>
              Start your journey
            </TextComponent>
          </Box>
          <ButtonComponent
            title="Create an account"
            onPress={() => {
              router.navigate('enterdetails');
            }}
          />
          <Box style={[globalStyle.pt1p6]}>
            <ButtonComponent
              secondaryFilled
              title="Login to your account"
              onPress={() => {
                router.navigate('login');
              }}
            />
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default SelectOption;
