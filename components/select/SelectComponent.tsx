import React, {FC} from 'react';
import Box from '../layout/Box';
import TextComponent from '../text/TextComponent';
// import {styles} from '../textInputs/PaperTextInputComponent';
import {Entypo} from '@expo/vector-icons';
// import {dateTimeStyle} from '../dateTime/DateTime';
import {ScaledSheet} from 'react-native-size-matters';
import globalStyle from '../../globalStyle/globalStyle';
import PressableComponent from '../pressable/PressableComponent';
import palette from '../../constants/colors/pallete';
// import {nairaSign, removeCurrency} from '../../constants/utils/utils';
// import ActivityIndicatorComonent from '../activity/ActivityIndicatorComonent';

interface selectProps {
  onPress?: () => void;
  placeholder: string;
  label: string;
  value: string;
  disabled?: boolean;
  loading?: boolean;
  showIcon?: boolean;
  isRight?: boolean;
  whiteBg?: boolean;
  icon?: React.ReactNode;
  data?: React.ReactNode;
}
const SelectComponent: FC<selectProps> = ({
  onPress,
  placeholder,
  value,
  label,
  disabled = false,
  showIcon = true,
  loading,
  isRight,
  icon,
  data,
  whiteBg,
}) => {
  return (
    <>
      <Box
        style={[
          globalStyle.flexrow,
          globalStyle.alignItemsCenter,
          globalStyle.justifyCenter,
          globalStyle.justifyBetween,
        ]}>
        {label && (
          <TextComponent
            style={[
              globalStyle.fontSize13,
              globalStyle.fontMatterRegular,
              globalStyle.mb0p8,
            ]}>
            {label}
          </TextComponent>
        )}
      </Box>
      <PressableComponent
        disabled={disabled || loading}
        onPress={onPress}
        style={[
          globalStyle.w10,
          globalStyle.textInputHeight,
          globalStyle.borderInput,
          globalStyle.bgTextInput,
          whiteBg && globalStyle.bgWhite,
          globalStyle.borderRadius4,
        ]}>
        <Box
          flex={1}
          style={[
            globalStyle.flexrow,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
            globalStyle.justifyBetween,
            globalStyle.px1,
            // globalStyle.mt1,
          ]}>
          <Box flex={1}>
            <Box
              flex={1}
              style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}>
              {icon && (
                <Box
                  style={[
                    globalStyle.mr0p8,
                    globalStyle.justifyCenter,
                    globalStyle.alignItemsCenter,
                    selectStyle.iconBox,
                    // globalStyle.bgPurple,
                  ]}>
                  {icon}
                </Box>
              )}
              <TextComponent
                numberOfLines={1}
                style={[
                  globalStyle.fontSize13,
                  !value && globalStyle.textGray4,
                ]}>
                {value?.length > 0 ? value : placeholder}
              </TextComponent>
            </Box>
          </Box>

          <Box>
            {/* {loading && <ActivityIndicatorComonent size={18} />} */}
            {!disabled && !loading && showIcon && (
              <Box
                style={[
                  selectStyle.iconBox,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsEnd,
                  // globalStyle.absolute,
                  // selectStyle.icon,
                ]}>
                <Entypo
                  // name="chevron-small-down"
                  name={isRight ? 'chevron-small-right' : 'chevron-small-down'}
                  size={24}
                  color={palette.black}
                />
              </Box>
            )}
          </Box>
        </Box>
        {data && data}
      </PressableComponent>
    </>
  );
};
const selectStyle = ScaledSheet.create({
  icon: {
    right: '8@s',
  },
  iconBox: {
    height: '22@s',
    width: '22@s',
  },
  circleSize: {
    width: '6@s',
    height: '6@s',
  },
});
export default SelectComponent;
