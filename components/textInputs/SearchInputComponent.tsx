import {StyleProp, TextInput, TextInputProps, TextStyle} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import TextComponent from '../text/TextComponent';
import globalStyle from '../../globalStyle/globalStyle';
import inputStyles from './inputStyles';
import pallete from '../../constants/colors/pallete';
import {MotiView} from 'moti';
import Box from '../layout/Box';
import Search from '../../assets/svgs/SearchGray.svg';
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
  style?: StyleProp<TextStyle>;
}
const SearchInputComponent: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorText,
  title,
  onFocus,
  onBlur,
  whiteBg,
  style,
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
    <Animated.View style={[globalStyle.w10, animatedStyle]}>
      {title && (
        <TextComponent style={[globalStyle.fontSize12, globalStyle.mb0p8]}>
          {title}
        </TextComponent>
      )}
      <MotiView
        style={[
          globalStyle.w10,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          // !!errorText && inputStyles.errorStyle,
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
            globalStyle.w10,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
            globalStyle.borderInput,
            globalStyle.borderRadius6,
            globalStyle.pl4,
            focus && inputStyles.focusedStyle,
            !!errorText && inputStyles.errorStyle,
            whiteBg && globalStyle.bgWhite,
            style,
          ]}
          placeholder={placeholder}
          keyboardType="web-search"
          onFocus={e => {
            onFocus && onFocus(e);
            setFocus(true);
          }}
          onBlur={e => {
            onBlur && onBlur(e);
            setFocus(false);
          }}
          placeholderTextColor={pallete.grey4}
          {...rest}
        />
        <Box style={[inputStyles.searchView]}>
          <PressableComponent
            disabled
            style={[
              globalStyle.h10,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
            ]}>
            <Box>
              <Search width={20} height={20} />
            </Box>
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

export default SearchInputComponent;
