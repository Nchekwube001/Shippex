import globalStyle from '@/globalStyle/globalStyle';
import React, {FC, ReactNode} from 'react';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';

interface slideProps {
  //   shown: boolean;
  children: ReactNode;
  zIndex?: number;
  showBlur?: boolean;
}

const SlideUpComponent: FC<slideProps> = ({children, zIndex}) => {
  return (
    <>
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={[
          globalStyle.width,
          globalStyle.height,
          globalStyle.bgWhite,
          globalStyle.absolute,
          // globalStyle.px2p4,
          globalStyle.justifyEnd,
          // globalStyle.pb3,
          {
            zIndex: zIndex ?? 40,
            backgroundColor: '#272D3433',
          },
        ]}>
        {children}
      </Animated.View>
    </>
  );
};

export default SlideUpComponent;
