import React, {useState} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import HeaderComponent from '@/components/header/Header';
import TitleDescBox from '@/components/uttility/TitleDescBox';
import {helpList} from '@/constants/utils/constants';
import FaqItem from '@/components/uttility/FaqItem';
import Animated, {LinearTransition} from 'react-native-reanimated';
import PressableComponent from '@/components/pressable/PressableComponent';
import TextComponent from '@/components/text/TextComponent';

const NeedHelp = () => {
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <LayoutWithSafeArea>
      <Box flex={1} style={[globalStyle.px1p6]}>
        <HeaderComponent text="" />
        <Box style={[globalStyle.pt2p4]}>
          <TitleDescBox
            title="Need Help With App?"
            bigText
            desc="Below are frequently asked questions"
          />
        </Box>
        <Animated.View layout={LinearTransition} style={[globalStyle.pt3p6]}>
          {helpList.map(({answer, question}, index) => (
            <FaqItem
              key={question}
              current={current}
              setCurrent={setCurrent}
              index={index}
              title={question}
              desc={answer}
            />
          ))}
        </Animated.View>
        <Box style={[globalStyle.py2]}>
          <TitleDescBox
            isCenter
            title="Need help with something else?"
            desc="Our support team is here to assist you. Please contact us."
          />
          <Box
            style={[
              globalStyle.pt1p2,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
            ]}>
            <PressableComponent
              style={[
                globalStyle.br,
                globalStyle.px2p4,
                globalStyle.py1p6,
                globalStyle.bgPurplePrimary,
              ]}>
              <TextComponent style={[globalStyle.textWhite]}>
                Contact Us
              </TextComponent>
            </PressableComponent>
          </Box>
        </Box>
      </Box>
    </LayoutWithSafeArea>
  );
};

export default NeedHelp;
