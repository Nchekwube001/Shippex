import React from 'react';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import LogoComponent from '@/components/globals/LogoComponent';
import TextComponent from '@/components/text/TextComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import {router} from 'expo-router';

const DealBreaker = () => {
  return (
    <LayoutWithSafeAreaWithoutScroll>
      <Box
        style={[
          globalStyle.px2p4,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
        ]}
        flex={1}>
        <LogoComponent />
        <Box style={[globalStyle.pt1p6]}>
          <TextComponent
            style={[
              globalStyle.fontMatterSemiBold,
              globalStyle.fontSize22,
              globalStyle.fontWeight600,
            ]}>
            Deal Breaker
          </TextComponent>
        </Box>
        <Box style={[globalStyle.pt0p8]}>
          <TextComponent
            style={[
              globalStyle.textCenter,
              globalStyle.fontSize13,
              globalStyle.lineHeight20,
              globalStyle.fontMatterLight,
            ]}>
            Set your Deal Breakers by selecting your preferences from each
            field. Please note that your choices are ranked from your most
            desired quality in a potential partner, to the least desired (from 5
            to 0). And remember, be a little flexible as you rank.
          </TextComponent>
        </Box>

        <Box style={[globalStyle.pt2p4]}>
          <ButtonComponent
            title="Get Started"
            onPress={() => {
              router.push('setdealbreaker');
            }}
          />
        </Box>
        <Box style={[globalStyle.pt1p2]}>
          <ButtonComponent
            secondary
            title="Back"
            onPress={() => {
              router.back();
            }}
          />
        </Box>
      </Box>
    </LayoutWithSafeAreaWithoutScroll>
  );
};

export default DealBreaker;
