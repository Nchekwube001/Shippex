import React from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import SearchInputComponent from '@/components/textInputs/SearchInputComponent';

const shipment = () => {
  return (
    <LayoutWithSafeArea>
      <Box style={[globalStyle.px2]}>
        <SearchInputComponent placeholder="Search" />
      </Box>
    </LayoutWithSafeArea>
  );
};

export default shipment;
