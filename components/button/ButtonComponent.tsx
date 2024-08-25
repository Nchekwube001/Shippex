import {TouchableOpacityProps} from 'react-native';
import React, {FC} from 'react';
import TextComponent from '../text/TextComponent';
import globalStyle from '../../globalStyle/globalStyle';
import Box from '../layout/Box';
import PressableComponent from '../pressable/PressableComponent';
import {Spinner, spinnerStyle} from '../loader/Spinner';
interface buttonProps extends TouchableOpacityProps {
  disabled?: boolean;
  title: string;
  onPress: () => void;
  loading?: boolean;
  transparent?: boolean;
  secondary?: boolean;
}

const ButtonComponent: FC<buttonProps> = ({
  disabled,
  title,
  onPress,
  loading = false,
  secondary,
  ...rest
}) => {
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
        style={[
          globalStyle.w10,
          globalStyle.bgPrimary,
          secondary && globalStyle.bgWhite,
          globalStyle.textInputHeight,
          globalStyle.flexrow,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.borderRadius8,
        ]}>
        {!loading && (
          <TextComponent
            secondary={secondary}
            style={[
              globalStyle.flexrow,
              globalStyle.textCenter,
              globalStyle.textWhite,
              secondary && globalStyle.textPrimary,
              globalStyle.fontSize15,
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
