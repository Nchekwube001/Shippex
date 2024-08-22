import {TextInput, TextInputProps} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import TextComponent from '../text/TextComponent';
import globalStyle from '../../globalStyle/globalStyle';
import inputStyles from './inputStyles';
import pallete from '../../constants/colors/pallete';
import {MotiView} from 'moti';
import Box from '../layout/Box';
import EyeOpen from '@/assets/svgs/eyeOpen.svg';
import EyeClosed from '@/assets/svgs/eyeClosed.svg';
import PressableComponent from '../pressable/PressableComponent';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
export interface InputProps extends TextInputProps {
  errorText?: string;
  title?: string;
  showContacts?: boolean;
  whiteBg?: boolean;
  setValue?: (val: string) => void;
}
const PasswordInputComponent: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorText,
  title,
  onFocus,
  onBlur,
  whiteBg,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setVisible(!visible);
    setShowPassword(!showPassword);
  };
  let iconView = null;
  if (!showPassword) {
    iconView = <EyeOpen width="20" />;
  } else {
    iconView = <EyeClosed width="20" />;
  }
  const animationValue = useSharedValue(0);

  useEffect(() => {
    if (errorText && errorText?.length > 0) {
      animationValue.value = withTiming(1);
    } else {
      animationValue.value = withTiming(0);
    }
  }, [errorText, animationValue]);
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationValue.value,
      [0, 0.2, 0.4, 0.8, 1],
      [0, -4, 0, 4, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [
        {
          translateX,
        },
      ],
    };
  });
  return (
    <Animated.View style={[globalStyle.w10, animatedStyle]}>
      {title && (
        <TextComponent
          style={[
            globalStyle.fontSize13,
            globalStyle.fontMatterRegular,

            globalStyle.mb0p8,
          ]}>
          {title}
        </TextComponent>
      )}
      <MotiView
        style={[
          globalStyle.w10,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          whiteBg && globalStyle.bgWhite,
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          // selectionColor={primaryPlain}
          style={[
            globalStyle.textBlack,
            globalStyle.w10,
            globalStyle.textInputHeight,
            globalStyle.px1,
            globalStyle.fontSize14,
            globalStyle.fontMatterRegular,

            globalStyle.w10,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
            globalStyle.borderInput,
            globalStyle.bgTextInput,

            globalStyle.borderRadius4,
            focus && inputStyles.focusedStyle,
            !!errorText && inputStyles.errorStyle,
            whiteBg && globalStyle.bgWhite,
          ]}
          placeholder={placeholder}
          onFocus={e => {
            onFocus && onFocus(e);
            setFocus(true);
          }}
          onBlur={e => {
            onBlur && onBlur(e);
            setFocus(false);
          }}
          placeholderTextColor={pallete.grey4}
          secureTextEntry={visible}
          textContentType={!showPassword ? 'name' : 'password'}
          {...rest}
        />
        <Box style={[inputStyles.iconView, globalStyle.h10]}>
          <PressableComponent
            onPress={toggleShowPassword}
            style={[
              globalStyle.h10,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
            ]}>
            <Box>{iconView}</Box>
          </PressableComponent>
        </Box>
      </MotiView>

      {errorText && (
        <TextComponent
          style={[
            globalStyle.fontSize11,
            globalStyle.errorText,
            globalStyle.ml1,
            globalStyle.mt1,
          ]}>
          {`* ${errorText}`}
        </TextComponent>
      )}
    </Animated.View>
  );
};

export default PasswordInputComponent;
