import {Pressable} from 'react-native';
import React, {FC, useMemo} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import globalStyle from '../../globalStyle/globalStyle';
import Box from '../layout/Box';
import {MotiTransitionProp, MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';
import palette from '../../constants/colors/pallete';

interface SwitchProps {
  isActive: boolean;
  disabled?: boolean;
  // setIsActive: Dispatch<SetStateAction<boolean>>;
  size?: number;
  onPress: () => void;
}
const transition: MotiTransitionProp = {
  type: 'timing',
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};
const SwitchComponent: FC<SwitchProps> = ({
  isActive,
  size = 32,
  disabled,
  onPress,
}) => {
  const trackWidth = useMemo(() => size * 1.5, [size]);
  const trackHeight = useMemo(() => size * 0.85, [size]);
  const knobSize = useMemo(() => size * 0.62, [size]);

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Box style={[globalStyle.justifyCenter, globalStyle.alignItemsCenter]}>
        {/* track */}
        <MotiView
          transition={transition}
          from={{
            backgroundColor: isActive
              ? palette.secondaryDefault
              : palette.borbtm,
          }}
          style={[
            globalStyle.br,
            {
              width: trackWidth,
              height: trackHeight,
            },
          ]}
        />

        <MotiView
          from={{
            transform: [
              {
                translateX: isActive ? trackWidth / 4 - 2 : -trackWidth / 4 + 2,
              },
            ],
          }}
          style={[
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
            globalStyle.absolute,
            {
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize,
              backgroundColor: isActive ? palette.white : palette.white,
            },
          ]}
        />
      </Box>
    </Pressable>
  );
};

export const switchStyle = ScaledSheet.create({
  switch: {
    width: '36@s',
    height: '20@s',
  },
  innerSwitchCircle: {
    width: '5@s',
    height: '5@s',
    borderRadius: '10@s',
  },
} as Record<any, any>);

export default SwitchComponent;
