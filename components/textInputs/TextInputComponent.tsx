import {TextInput, TextInputProps} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import TextComponent from '../text/TextComponent';
import globalStyle from '../../globalStyle/globalStyle';
import inputStyles from './inputStyles';
import pallete from '../../constants/colors/pallete';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Box from '../layout/Box';
import PressableComponent from '../pressable/PressableComponent';

interface textInputProps extends TextInputProps {
  errorText?: string;
  title?: string;
  whiteBg?: boolean;
  rightText?: string;
  onTextPress?: () => void;
}

const TextInputComponent: FC<textInputProps> = ({
  value,
  onChangeText,
  errorText,
  title,
  multiline,
  onFocus,
  onBlur,
  whiteBg,
  rightText,
  onTextPress,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
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
    <Animated.View style={[globalStyle.w10, !!errorText && animatedStyle]}>
      {title && (
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.justifyBetween,
            globalStyle.w10,
            globalStyle.mb0p8,
          ]}>
          <TextComponent style={[globalStyle.fontSize13]}>
            {title}
          </TextComponent>
          {rightText && (
            <PressableComponent onPress={onTextPress}>
              <TextComponent
                primary
                style={[globalStyle.fontSize13, globalStyle.underline]}>
                {rightText}
              </TextComponent>
            </PressableComponent>
          )}
        </Box>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          //   buttonStyle.buttonBr,
          globalStyle.textBlack,
          globalStyle.w10,
          globalStyle.textInputHeight,
          globalStyle.px1,
          globalStyle.fontSize14,
          multiline && globalStyle.MultiTextInputHeight,
          multiline && globalStyle.pt1,
          multiline && globalStyle.textAlignVertical,
          globalStyle.w10,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.bgTextInput,
          globalStyle.borderRad,
          focus && inputStyles.focusedStyle,
          !!errorText && inputStyles.errorStyle,
          whiteBg && globalStyle.bgWhite,
        ]}
        placeholderTextColor={pallete.grey4}
        onFocus={e => {
          onFocus && onFocus(e);
          setFocus(true);
        }}
        onBlur={e => {
          onBlur && onBlur(e);
          setFocus(false);
        }}
        multiline={multiline}
        {...rest}
      />
      {/* </Box> */}

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

export default TextInputComponent;
