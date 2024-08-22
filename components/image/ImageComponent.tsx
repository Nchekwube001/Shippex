import {Skeleton} from 'moti/skeleton';
import React, {FC, useState} from 'react';
import Box from '../layout/Box';
import {Image, ImageProps} from 'react-native';
import globalStyle from '@/globalStyle/globalStyle';

interface imageProp {
  isVisible?: boolean;
}

const ImageComponent: FC<ImageProps & imageProp> = ({isVisible, ...rest}) => {
  const [showLoad, setShowLoad] = useState(true);
  // console.log({
  //   style: rest.style,
  // });
  // const arr = useMemo(() => new Array(50).fill('a'), []);
  return (
    <Box
      style={[
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
        // globalStyle.overflowHidden,
        globalStyle.w10,
        rest.style,
        // globalStyle.bgBlack,
      ]}>
      <>
        <Box zIndex={2} style={[globalStyle.w10, globalStyle.h10]}>
          <Image
            onLoad={() => {
              setShowLoad(false);
            }}
            onError={() => {
              setShowLoad(false);
            }}
            {...rest}

            // onLoadStart={() => setShowLoad(true)}
            // onLoadEnd={() => {
            //   setShowLoad(false);
            // }}
          />
        </Box>

        {(isVisible || showLoad) && (
          <Box
            zIndex={5}
            style={[
              globalStyle.w10,
              globalStyle.h10,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
              globalStyle.absolute,
              globalStyle.br,
            ]}>
            <Skeleton
              radius={200}
              colorMode={'light'}
              width={'100%'}
              height={'100%'}
            />
          </Box>
        )}
      </>
    </Box>
  );
};

export default ImageComponent;
