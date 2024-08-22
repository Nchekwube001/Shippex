import {StyleProp, Text, TextStyle} from 'react-native';
import React, {FC} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
interface textProps {
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
  children: any;
  secondary?: boolean;
  gray?: boolean;
  primary?: boolean;
}
const TextComponent: FC<textProps> = ({
  numberOfLines,
  style,
  children,
  onPress,
  secondary,
  primary,
  gray,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={
        [
          globalStyle.fontSansMedium,
          globalStyle.fontSize14,
          globalStyle.fontWeight500,
          globalStyle.textBlack,

          secondary && globalStyle.textSecondary,
          gray && globalStyle.textGray4,
          primary && globalStyle.textPrimary,
          style,
        ] as any
      }>
      {children}
    </Text>
  );
};

export default TextComponent;
