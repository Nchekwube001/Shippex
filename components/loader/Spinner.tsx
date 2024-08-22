import React, {useEffect} from 'react';
import {ViewProps} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {ScaledSheet} from 'react-native-size-matters';
import Svg, {Circle} from 'react-native-svg';
import palette from '../../constants/colors/pallete';
import globalStyle from '../../globalStyle/globalStyle';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
export type SpinnerProps = ViewProps & {
  small?: boolean;
  isPrimary?: boolean;
};

export const Spinner: React.FC<SpinnerProps> = ({small, isPrimary}) => {
  const R = small ? 18 : 30;
  const STROKE_WIDTH = small ? 6 : 11;
  const rotate = useSharedValue(0.01);
  const progress = useSharedValue(0.7);
  let circle_length = 2 * Math.PI * R;
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circle_length * progress.value,
  }));
  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, {duration: 1000, easing: Easing.linear}),
      -1,
      false,
    );
    return () => cancelAnimation(rotate);
  }, [rotate]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  });
  return (
    <Animated.View style={[spinnerStyle.aspect]}>
      <AnimatedSvg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        style={[
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.borderRadius,
          spinnerStyle.spin,
          small && spinnerStyle.small,
          stylez,
        ]}>
        <Circle
          cx={'50'}
          cy={'50'}
          r={R}
          strokeWidth={STROKE_WIDTH}
          fill={palette.transparent}
          stroke={palette.pinBg30}
        />
        <AnimatedCircle
          cx={'50'}
          cy={'50'}
          r={R}
          fill={palette.transparent}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap={'round'}
          stroke={isPrimary ? palette.primary : palette.white}
          strokeDasharray={circle_length}
          animatedProps={animatedProps}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export const spinnerStyle = ScaledSheet.create({
  aspect: {
    aspectRatio: 1,
  },
  spin: {
    height: '60@s',
    width: '60@s',
  },
  small: {
    height: '30@s',
    width: '30@s',
  },
} as Record<any, any>);
