import {TouchableOpacityProps} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';
import TextComponent from '../text/TextComponent';
import globalStyle from '../../globalStyle/globalStyle';
import Box from '../layout/Box';
import {useSharedValue} from 'react-native-reanimated';
import PressableComponent from '../pressable/PressableComponent';
import {Spinner, spinnerStyle} from '../loader/Spinner';
interface buttonProps extends TouchableOpacityProps {
  disabled?: boolean;
  title: string;
  onPress: () => void;
  loading?: boolean;
  transparent?: boolean;
  secondary?: boolean;
  grayBg?: boolean;
  secondaryFilled?: boolean;
  error?: boolean;
  text14?: boolean;
  redBtn?: boolean;
  orangeText?: boolean;
  orangeBtn?: boolean;
}

const ButtonComponent: FC<buttonProps> = ({
  disabled,
  title,
  onPress,
  loading = false,
  text14,
  transparent,
  secondary,
  secondaryFilled,
  orangeText,
  redBtn,
  grayBg,
  ...rest
}) => {
  const currentPos = useSharedValue(0);
  const changer = useCallback(() => {
    if (loading) {
      if (currentPos.value === 2) {
        currentPos.value = 0;
      } else {
        currentPos.value = currentPos.value + 1;
      }
    }
  }, [currentPos, loading]);
  useEffect(() => {
    const interval = setInterval(() => {
      changer();
    }, 250);

    return () => clearInterval(interval);
  }, [changer]);
  return (
    <PressableComponent
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      {...rest}
      style={[
        globalStyle.textInputHeight,
        globalStyle.borderRad,
        globalStyle.flexrow,
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
      ]}>
      <Box
        // backgroundColor={'mainBackground'}
        style={[
          globalStyle.w10,
          globalStyle.bgPurplePrimary,
          globalStyle.textInputHeight,
          globalStyle.flexrow,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.br,
          // globalStyle.borderRadius16,
          (transparent || orangeText) && globalStyle.bgTransparent,
          transparent && globalStyle.borderBtnTransparent,
          secondaryFilled && globalStyle.bgSecondary,
          disabled && globalStyle.bgDisabled,
          secondaryFilled && disabled && globalStyle.bgDisabled,
          // secondaryFilled && disabled && globalStyle.borderBtnPurple,
          secondary && globalStyle.bgSecondaryBtn,
          grayBg && globalStyle.bgGreyBtn,
          redBtn && globalStyle.bgDel,
        ]}>
        {!loading && (
          <TextComponent
            secondary={grayBg || secondary}
            style={[
              globalStyle.flexrow,
              globalStyle.textCenter,
              (!grayBg || !secondary) && globalStyle.textWhite,
              globalStyle.fontSize16,
              secondary && globalStyle.textSecondary,
              orangeText && globalStyle.textSecondaryDark,
              text14 && globalStyle.fontSize14,
              globalStyle.fontWeight500,
            ]}>
            {title}
          </TextComponent>
        )}
        {loading && (
          <Box style={[spinnerStyle.small]}>
            <Spinner />
          </Box>
        )}
      </Box>
    </PressableComponent>
  );
};

export default ButtonComponent;
