import React from 'react';
import Box from '@/components/layout/Box';
import TextComponent from '@/components/text/TextComponent';
import PersonalityIcon from '@/assets/svgs/personalityIcon.svg';
import globalStyle from '@/globalStyle/globalStyle';
import ButtonComponent from '@/components/button/ButtonComponent';
import {router} from 'expo-router';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
const PersonalityTest = () => {
  return (
    <LayoutWithSafeAreaWithoutScroll showAvoiding={false}>
      <Box style={[]} flex={1}>
        <Box
          style={[
            globalStyle.py1p6,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
          ]}>
          <PersonalityIcon />
        </Box>
        <Box
          style={[
            globalStyle.w10,
            globalStyle.alignItemsCenter,
            globalStyle.px2,
          ]}>
          <TextComponent
            style={[
              globalStyle.fontMatterSemiBold,
              globalStyle.fontSize22,
              globalStyle.fontWeight600,
            ]}>
            Personality Test
          </TextComponent>
          <Box style={[globalStyle.pt0p8]}>
            <TextComponent
              style={[
                globalStyle.textCenter,
                globalStyle.fontSize13,
                globalStyle.fontWeight500,
              ]}>
              Discover compatibility with the Kinnect Personality Test - your
              key to meaningful matches
            </TextComponent>
          </Box>
          <Box style={[globalStyle.pt2p4]}>
            <TextComponent
              style={[
                globalStyle.textCenter,
                globalStyle.fontSize13,
                globalStyle.fontWeight500,
              ]}>
              Our Personality test is more than just a fun questionnaire; it's a
              science-backed tool designed to help you find your ideal match.
              {'\n'}
              {'\n'}Here's why you should give it a shot.
            </TextComponent>
          </Box>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.pt0p4,
              globalStyle.alignItemsCenter,
            ]}>
            <Box
              style={[
                globalStyle.bullet,
                globalStyle.br,
                globalStyle.bgBlack,
                globalStyle.mr0p5,
              ]}
            />
            <TextComponent style={[]}>Personalized matches</TextComponent>
          </Box>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.pt0p4,
              globalStyle.alignItemsCenter,
            ]}>
            <Box
              style={[
                globalStyle.bullet,
                globalStyle.br,
                globalStyle.bgBlack,
                globalStyle.mr0p5,
              ]}
            />
            <TextComponent style={[]}>Higher success rate</TextComponent>
          </Box>
          <Box style={[globalStyle.pt2p4]}>
            <ButtonComponent
              title="Get Started"
              onPress={() => {
                router.push('takepersonalitytest');
              }}
            />
          </Box>
          <Box style={[globalStyle.pt1p2]}>
            <ButtonComponent
              secondary
              title="Maybe later"
              onPress={() => {
                router.back();
              }}
            />
          </Box>
        </Box>
      </Box>
    </LayoutWithSafeAreaWithoutScroll>
  );
};

export default PersonalityTest;
