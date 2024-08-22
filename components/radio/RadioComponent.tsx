import React, {FC} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import pallete from '../../constants/colors/pallete';
import globalStyle from '../../globalStyle/globalStyle';
import Box from '../layout/Box';
import PressableComponent from '../pressable/PressableComponent';

interface radioInterface {
  enabled: boolean;
  onPress?: () => void;
  disabled?: boolean;
}
const RadioComponent: FC<radioInterface> = ({enabled, onPress, disabled}) => {
  return (
    <Box style={[radioStyle.size]}>
      <PressableComponent
        disabled={disabled}
        onPress={onPress}
        style={[
          globalStyle.w10,
          globalStyle.h10,
          globalStyle.br,
          enabled && radioStyle.enabled,
          !enabled && radioStyle.disabled,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
        ]}>
        {/* <Box style={[radioStyle.inner, globalStyle.bgPurplePrimary]} /> */}
        {enabled && (
          <Box style={[radioStyle.inner, globalStyle.bgPurplePrimary]} />
        )}
      </PressableComponent>
    </Box>
  );
};

const radioStyle = ScaledSheet.create({
  disabled: {
    borderColor: pallete.mainGray,
    borderWidth: '1@s',
  },
  enabled: {
    borderColor: pallete.primary,
    borderWidth: '1@s',
  },
  size: {
    width: '20@s',
    height: '20@s',
    borderRadius: '20@s',
  },
  inner: {
    width: '12@s',
    height: '12@s',
    borderRadius: '14@s',
  },
} as Record<any, any>);

export default RadioComponent;
