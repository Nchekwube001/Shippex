import React, {FC} from 'react';
import Box from '../layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import TextComponent from '../text/TextComponent';

interface props {
  title: string;
  desc?: string;
  isCenter?: boolean;
  bigText?: boolean;
  top?: boolean;
}
const TitleDescBox: FC<props> = ({desc, top, title, isCenter}) => {
  return (
    <Box>
      {desc && top && (
        <TextComponent
          style={[
            !top && globalStyle.pt0p6,
            top && globalStyle.pb0p4,
            isCenter && globalStyle.textCenter,
            globalStyle.fontWeight300,
          ]}>
          {desc}
        </TextComponent>
      )}
      <TextComponent
        style={[
          globalStyle.fontGroteskBook20,
          globalStyle.fontWeight500,
          globalStyle.fontSize28,
          isCenter && globalStyle.textCenter,
        ]}>
        {title}
      </TextComponent>
      {desc && !top && (
        <TextComponent
          style={[
            !top && globalStyle.pt0p6,
            top && globalStyle.pb0p4,
            globalStyle.fontWeight300,
            isCenter && globalStyle.textCenter,
          ]}>
          {desc}
        </TextComponent>
      )}
    </Box>
  );
};

export default TitleDescBox;
