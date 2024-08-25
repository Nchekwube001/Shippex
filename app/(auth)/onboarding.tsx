import React, {useEffect, useState} from 'react';
import Box from '@/components/layout/Box';
import SplashImage from '@/assets/svgs/SplashImageBig.svg';
import ShippexWhite from '@/assets/svgs/ShippexWhite.svg';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import globalStyle from '@/globalStyle/globalStyle';
import {ScaledSheet} from 'react-native-size-matters';
import ButtonComponent from '@/components/button/ButtonComponent';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import {router} from 'expo-router';
const Onboarding = () => {
  const scaleVal = useSharedValue(0);
  const [done, setDone] = useState(false);
  const initialScale = 30 / 1000;
  const aStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    return {
      transform: [
        {
          scale: interpolate(
            scaleVal.value,
            inputRange,
            [initialScale, initialScale * 3],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            scaleVal.value,
            [...inputRange, 1.3],
            [0, 0, -1200],
          ),
        },
      ],
    };
  });
  const cStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // scale: 8,
          scale: interpolate(scaleVal.value, [0, 1.1, 1.3], [0, 0, 300]),
        },
      ],
    };
  });

  useEffect(() => {
    scaleVal.value = withTiming(
      1.3,
      {
        duration: 2000,
        // duration: 6000,
      },
      () => {
        runOnJS(setDone)(true);
      },
    );
  }, [scaleVal]);

  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Animated.View
        style={[globalStyle.flexOne]}
        key={`${done}`}
        entering={FadeIn}
        exiting={FadeOut}>
        {done ? (
          <LayoutWithSafeAreaWithoutScroll primaryStatus>
            <Box
              justifyContent={'center'}
              alignItems={'center'}
              flex={1}
              style={[
                globalStyle.bgPrimary,
                globalStyle.px2,
                globalStyle.pb3,
                globalStyle.justifyBetween,
              ]}>
              <Box />
              <ShippexWhite />
              <Box>
                <ButtonComponent
                  secondary
                  title="Login"
                  onPress={() => {
                    router.push('/login');
                  }}
                />
              </Box>
            </Box>
          </LayoutWithSafeAreaWithoutScroll>
        ) : (
          <Box flex={1} justifyContent={'center'} alignItems={'center'}>
            <Animated.View style={[aStyle]}>
              <SplashImage />
            </Animated.View>
            <Animated.View
              style={[
                globalStyle.absolute,
                onbStyle.circle,
                globalStyle.br,
                globalStyle.bgPrimary,
                cStyle,
              ]}
            />
          </Box>
        )}
      </Animated.View>
    </Box>
  );
};

const onbStyle = ScaledSheet.create({
  circle: {
    width: '4@s',
    height: '4@s',
    zIndex: 3,
  },
});

export default Onboarding;
