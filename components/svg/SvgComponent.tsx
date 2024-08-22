import React, {FC} from 'react';
import {SvgProps} from '../../constants/types/types';
import {SvgXml} from 'react-native-svg';

const SvgComponent: FC<SvgProps> = ({icon, color, width}) => {
  return (
    <SvgXml
      xml={icon}
      stroke={color ?? undefined}
      width={width ?? '100%'}
      // height={'100%'}
    />
  );
};

export default SvgComponent;
