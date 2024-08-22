import Box from '@/components/layout/Box';
import React, {useCallback, useMemo, useState} from 'react';
import onb1 from '@/assets/images/onb1.png';
import onb2 from '@/assets/images/onb2.png';
import onb3 from '@/assets/images/onb3.png';
import {ImageBackground, ScrollView, StatusBar} from 'react-native';
import globalStyle, {width} from '@/globalStyle/globalStyle';
import {router} from 'expo-router';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import TextComponent from '@/components/text/TextComponent';
import {ScaledSheet} from 'react-native-size-matters';
import ButtonComponent from '@/components/button/ButtonComponent';
import DotIndicator from '@/components/indicator/DotIndicator';
import {useAppDispatch} from '@/constants/utils/hooks';
import {setAlreadyOnboarded} from '@/reducerSlices/userOnboarded';
const Onboarding = () => {
  const scrollViewRef = useAnimatedRef<ScrollView>();
  const translateX = useSharedValue(0);
  const dispatch = useAppDispatch();
  const [currIndex, setCurrndex] = useState(0);

  const newSliderOptions = useMemo(
    () => [
      {
        background: onb1,
        title: 'Kinnect and find your perfect match',
        subtitle: 'Embark on a journey where genuine connections are made.',
      },
      {
        background: onb2,
        title: 'Start your personal development journey.',
        subtitle:
          'Kinnect is designed to help you upgrade to a better version of you through our Personality Test, and our pre and post match coaching',
      },

      {
        background: onb3,
        title: 'Join the Community',
        subtitle:
          'Join a tribe of kindred spirits where conversations about relationships blossom, friendships grow, and support is always just a message away.',
      },
    ],
    [],
  );
  const textBoxStyle = useAnimatedStyle(() => {
    const transX = interpolate(translateX.value, [0, 1], [0, -width]);
    return {
      transform: [
        {
          translateX: withTiming(transX),
        },
      ],
    };
  });
  const setActionIndex = (val: number) => {
    setCurrndex(val);
  };
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      let offset = Math.round(event.contentOffset.x / width);
      // setCurrBg(scrollList[offset].backgroundColor);
      translateX.value = offset;
      runOnJS(setActionIndex)(offset);
      // widthVal.value = 0;
      // scrollingWorklet();

      // runOnJS(setBg)(offset);
    },
  });
  const currentIndex = useDerivedValue(() => {
    return translateX.value;
  }, [translateX.value]);
  const scroller = useCallback(() => {
    // trigger('impactLight');
    if (currentIndex.value < newSliderOptions.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (translateX.value + 1),
      });
    } else {
      dispatch(
        setAlreadyOnboarded({
          onboarded: true,
        }),
      );
      router.navigate('selectoption');
      // navigate('pickOption');
    }
  }, [
    currentIndex.value,
    dispatch,
    newSliderOptions.length,
    scrollViewRef,
    translateX.value,
  ]);
  const leftStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(translateX?.value < 2 ? '50%' : '0%'),
      opacity: withTiming(translateX?.value < 2 ? 1 : 0),
      paddingRight: withTiming(translateX?.value < 2 ? 8 : 0),
    };
  });
  const rightStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(translateX?.value < 2 ? '50%' : '100%'),
      paddingLeft: withTiming(translateX?.value < 2 ? 8 : 0),
    };
  });

  return (
    <Box flex={1}>
      <StatusBar barStyle={'dark-content'} />
      <Animated.ScrollView
        bounces={false}
        style={[globalStyle.flexOne, globalStyle.relative]}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={16}
        ref={scrollViewRef as any}
        onScroll={onScroll}
        pagingEnabled>
        {newSliderOptions.map(({background}, index) => (
          <LayoutWithSafeAreaWithoutScroll transparent key={index.toString()}>
            <Box
              flex={1}
              style={[
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
                // globalStyle.pt1,
                globalStyle.bgTransparent,
                // globalStyle.pb124,
                {width},
              ]}>
              <Box
                style={[
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                  globalStyle.w10,
                ]}
                flex={1}>
                <ImageBackground
                  resizeMode="cover"
                  source={background}
                  style={[
                    globalStyle.w10,
                    globalStyle.h10,
                    globalStyle.justifyEnd,
                  ]}
                />
              </Box>
              {/* <Box
                style={[
                  globalStyle.w10,
                  globalStyle.px2p4,
                ]}>
                <Box
                  style={[
                    globalStyle.w10,
                  ]}>
                  <TextComponent
                    style={[
                      globalStyle.fontMatterSemiBold,
                      globalStyle.fontSize20,
                      globalStyle.pb0p8,
                    ]}>
                    {title}
                  </TextComponent>
                </Box>
                <TextComponent
                  secondary
                  style={[globalStyle.fontSize14, globalStyle.fontMatterLight]}>
                  {subtitle}
                </TextComponent>
              </Box> */}
            </Box>
          </LayoutWithSafeAreaWithoutScroll>
        ))}
      </Animated.ScrollView>
      <Box
        zIndex={4}
        style={[globalStyle.absolute, globalStyle.w10, onboardingStyle.bottom]}>
        <Animated.View
          style={[
            globalStyle.flexOne,
            globalStyle.relative,
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.mb1p6,
            textBoxStyle,
          ]}>
          {newSliderOptions.map(({subtitle, title}, index) => (
            <Box
              style={[
                globalStyle.h10,
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
                globalStyle.px1p6,

                {
                  width,
                },
              ]}
              key={index.toString()}>
              <Box
                style={[
                  globalStyle.w8,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                ]}>
                <TextComponent
                  style={[
                    globalStyle.fontSize22,
                    globalStyle.fontWeight700,
                    globalStyle.fontMatterBold,
                    globalStyle.textCenter,
                  ]}>
                  {title}
                </TextComponent>
              </Box>
              <Box style={[globalStyle.pt0p8, globalStyle.w9]}>
                <TextComponent
                  style={[
                    globalStyle.textCenter,
                    globalStyle.fontSize12,
                    globalStyle.textGray4,
                    globalStyle.textCenter,
                  ]}>
                  {subtitle}
                </TextComponent>
              </Box>
            </Box>
          ))}
        </Animated.View>
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.justifyCenter,
            globalStyle.w10,
            globalStyle.mb1p6,
          ]}>
          {newSliderOptions.map((_, index) => (
            <Box
              style={[
                index !== newSliderOptions.length - 1 && globalStyle.mr0p8,
              ]}
              key={index.toString()}>
              <DotIndicator currentIndex={currentIndex} index={index} />
            </Box>
          ))}
        </Box>
        <Box
          style={[globalStyle.flexrow, globalStyle.px2p4, globalStyle.pb1p2]}>
          <Animated.View style={[leftStyle]}>
            <ButtonComponent
              title="Skip"
              secondary
              onPress={() => {
                router.navigate('selectoption');
                dispatch(
                  setAlreadyOnboarded({
                    onboarded: true,
                  }),
                );
              }}
            />
          </Animated.View>
          <Animated.View
            style={[rightStyle, globalStyle.justifyEnd, globalStyle.flexrow]}>
            <ButtonComponent
              title={currIndex === 2 ? 'Get started' : 'Next'}
              onPress={scroller}
            />
          </Animated.View>
        </Box>
      </Box>
    </Box>
  );
};

export const onboardingStyle = ScaledSheet.create({
  bottom: {
    bottom: '20@s',
  },
  top: {
    top: '50@s',
  },
  textTop: {
    top: '74@s',
  },
  indicHeight: {
    height: '2@s',
  },
} as Record<string, any>);
export default Onboarding;
