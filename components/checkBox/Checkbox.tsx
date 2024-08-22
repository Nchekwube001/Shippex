import React, {FC} from 'react';
// import CheckBox, {CheckBoxProps} from '@react-native-community/checkbox';
import CheckBox, {CheckboxProps} from 'expo-checkbox';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '../../constants/colors/pallete';
import globalStyle from '../../globalStyle/globalStyle';
import Box from '../layout/Box';
import {Platform} from 'react-native';

interface checkBoxProps extends CheckboxProps {
  value: boolean;
  small?: boolean;
  setValue: (val: any) => void;
}
const CheckboxComponent: FC<checkBoxProps> = ({
  setValue,
  value,
  small,
  ...rest
}) => {
  return (
    <Box
      style={[
        globalStyle.flexrow,
        // globalStyle.bgPurple,
        cheeckStyle.box,
        small && cheeckStyle.smallBox,
        globalStyle.alignItemsCenter,
        globalStyle.justifyCenter,
      ]}>
      <Box
        style={[
          globalStyle.borderRadius6,
          // value && cheeckStyle.borGreen,
          // !value && cheeckStyle.borTrans,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.flexrow,
          // globalStyle.bgPurple,
        ]}>
        <CheckBox
          style={[
            Platform.OS === 'ios' && cheeckStyle.checkboxSize,
            Platform.OS === 'ios' && small && cheeckStyle.smallCheckboxSize,
          ]}
          disabled={false}
          value={value}
          onValueChange={setValue}
          color={value ? palette.primaryDefault : palette.grey4}
          {...rest}
        />
      </Box>
    </Box>
  );
};
export const cheeckStyle = ScaledSheet.create({
  box: {
    width: '22@s',
    height: '22@s',
  },
  smallBox: {
    width: '20@s',
    height: '20@s',
  },
  checkboxSize: {
    width: '15@s',
    height: '15@s',
    // width: 10,
    // height: 10,
  },
  smallCheckboxSize: {
    width: '15@s',
    height: '15@s',
    // width: 10,
    // height: 10,
  },
  borGreen: {
    borderWidth: '1@s',
    width: '22@s',
    height: '22@s',
    borderColor: palette.primaryDefault,
  },
  borTrans: {
    borderWidth: '1@s',
    width: '22@s',
    height: '22@s',
    borderColor: palette.transparent,
  },
} as Record<any, any>);

export default CheckboxComponent;
