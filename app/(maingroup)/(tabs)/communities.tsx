import React, {useState} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import globalStyle, {STATUSBAR_HEIGHT} from '@/globalStyle/globalStyle';
import TabHeader from '@/components/header/TabHeader';
import Box from '@/components/layout/Box';
import {ImageBackground} from 'react-native';
import {detailStyle} from '../(main)/communities/[id]';
import communityIntoBg from '@/assets/images/communityIntoBg.png';
import PressableComponent from '@/components/pressable/PressableComponent';
import TextComponent from '@/components/text/TextComponent';
import SlideInComponent from '@/components/uttility/SlideInComponent';
import CommunityListBox from '@/components/uttility/CommunityList';
const Community = () => {
  const [viewdIntro, setViewedIntro] = useState(false);

  return (
    <LayoutWithSafeArea>
      <Box>
        <Box style={[globalStyle.px2p4, globalStyle.mb0p8]}>
          <TabHeader />
        </Box>
        <SlideInComponent keyValue={`${viewdIntro}`}>
          {!viewdIntro && (
            <>
              <Box
                style={[
                  globalStyle.w10,
                  detailStyle.cardHeightSmall,
                  globalStyle.bgCommunity,
                  globalStyle.px1p6,
                ]}>
                <Box
                  style={[
                    globalStyle.w10,
                    detailStyle.cardHeightSmall,
                    globalStyle.borderRadius8,
                    globalStyle.overflowHidden,
                    {
                      top: STATUSBAR_HEIGHT,
                    },
                  ]}>
                  <ImageBackground
                    source={communityIntoBg}
                    style={[globalStyle.w10, globalStyle.h10]}
                  />
                  {/* <Box
                style={[globalStyle.w10, globalStyle.px1p6, globalStyle.pt1p2]}>
                <HeaderComponent text="" transparent />
              </Box> */}
                </Box>
              </Box>

              <Box
                style={[
                  globalStyle.px2p4,
                  {
                    paddingTop: STATUSBAR_HEIGHT + 24,
                  },
                ]}>
                <Box
                  style={[
                    globalStyle.pt1p6,
                    globalStyle.justifyCenter,
                    globalStyle.alignItemsCenter,
                  ]}>
                  <TextComponent
                    style={[
                      globalStyle.fontSize22,
                      globalStyle.fontWeight600,
                      globalStyle.fontMatterMedium,
                    ]}>
                    Explore Communities
                  </TextComponent>
                  <Box
                    style={[
                      globalStyle.pt1p2,
                      globalStyle.flexrow,
                      globalStyle.alignItemsCenter,
                    ]}>
                    <TextComponent gray style={[globalStyle.fontSize12]}>
                      Our communities are designed to provide a supportive space
                      for sharing experiences, asking questions, and learning
                      from others. Our professionally moderated Kinnect
                      Communities cover dating advice, gender-specific support,
                      and personal growth resources.
                    </TextComponent>
                  </Box>
                  <PressableComponent
                    style={[
                      globalStyle.justifyCenter,
                      globalStyle.alignItemsCenter,
                      globalStyle.px2p4,
                      globalStyle.py1p2,
                      globalStyle.br,
                      globalStyle.bgPurplePrimary,
                      globalStyle.mt3p2,
                      globalStyle.mb2p4,
                    ]}
                    onPress={() => {
                      setViewedIntro(true);
                    }}>
                    <TextComponent
                      style={[
                        globalStyle.fontMatterBold,
                        globalStyle.fontWeight600,
                        globalStyle.fontSize16,
                        globalStyle.textWhite,
                      ]}>
                      Get Started
                    </TextComponent>
                  </PressableComponent>
                </Box>
              </Box>
            </>
          )}
          {viewdIntro && (
            <Box style={[globalStyle.px2p4]}>
              <Box style={[globalStyle.pt1p6]}>
                <TextComponent
                  secondary
                  style={[globalStyle.fontWeight500, globalStyle.fontSize18]}>
                  Communities For You
                </TextComponent>
              </Box>
              <Box style={[globalStyle.pt1p6]}>
                <CommunityListBox />
              </Box>
            </Box>
          )}
        </SlideInComponent>
      </Box>
    </LayoutWithSafeArea>
  );
};

export default Community;
