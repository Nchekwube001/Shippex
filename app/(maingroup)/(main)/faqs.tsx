import React, {useState} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import HeaderComponent from '@/components/header/Header';
import {faqList} from '@/constants/utils/constants';
import FaqItem from '@/components/uttility/FaqItem';
import Animated, {LinearTransition} from 'react-native-reanimated';
import LinearBgWithtext from '@/components/uttility/LinearBgWithtext';

const Faqs = () => {
  const [current, setCurrent] = useState<number | null>(null);
  return (
    <LayoutWithSafeArea>
      <Box flex={1}>
        <Box style={[globalStyle.px1p6]}>
          <HeaderComponent text="" showLogo />
        </Box>
        <Box style={[globalStyle.pt0p8]}>
          <LinearBgWithtext text="Frequently Asked Questions" />
        </Box>
        <Animated.View
          layout={LinearTransition}
          style={[globalStyle.pt3p6, globalStyle.px1p6]}>
          {faqList.map(({answer, question}, index) => (
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
      </Box>
    </LayoutWithSafeArea>
  );
};

export default Faqs;
