import React, {FC, useEffect} from 'react';
import Box from '../layout/Box';
import globalStyle from '../../globalStyle/globalStyle';
import LogoComponent from '../globals/LogoComponent';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface loaderProp {
  isTransparent?: boolean;
  isdark?: boolean;
}

const Loader: FC<loaderProp> = ({isdark}) => {
  const transform = useSharedValue(0);
  const scaleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      transform.value,
      [0, 0.5, 0.8, 1],
      [1, 1.1, 1.2, 1],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  useEffect(() => {
    transform.value = withRepeat(withTiming(1, {duration: 2000}), -1, true);
  }, [transform]);
  return (
    // <MainLayoutWithoutScrollComponent>
    <Box
      flex={1}
      style={[
        globalStyle.justifyCenter,
        globalStyle.bgWhite,
        globalStyle.alignItemsCenter,
        isdark && globalStyle.bgLoaderDark,
      ]}>
      <Animated.View style={[scaleAnimation]}>
        <LogoComponent />
      </Animated.View>
    </Box>
    // </MainLayoutWithoutScrollComponent>
  );
};

export default Loader;
