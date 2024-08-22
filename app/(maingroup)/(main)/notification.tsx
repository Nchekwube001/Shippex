import React from 'react';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import Box from '@/components/layout/Box';
import globalStyle, {height} from '@/globalStyle/globalStyle';
import HeaderComponent from '@/components/header/Header';
import {FlatList} from 'react-native';
import NoNotification from '@/assets/svgs/NoNotification.svg';
import TextComponent from '@/components/text/TextComponent';
const Notification = () => {
  return (
    <LayoutWithSafeAreaWithoutScroll>
      <Box flex={1}>
        <Box style={[globalStyle.px2p4, globalStyle.pb1p6]}>
          <HeaderComponent text="Notifications" useGray />
        </Box>
        <Box flex={1}>
          <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[globalStyle.px2p4]}
            ListEmptyComponent={
              <Box
                style={[
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                  {
                    height: height * 0.65,
                  },
                ]}>
                <NoNotification />
                <TextComponent
                  style={[
                    globalStyle.fontSize22,
                    globalStyle.fontMatterBold,
                    globalStyle.fontWeight600,
                    globalStyle.pt1p2,
                  ]}>
                  No Notifications Yet
                </TextComponent>
                <TextComponent
                  gray
                  style={[globalStyle.pt0p4, globalStyle.textCenter]}>
                  When you get notifications, they will show up here.
                </TextComponent>
              </Box>
            }
            renderItem={() => <></>}
          />
        </Box>
      </Box>
    </LayoutWithSafeAreaWithoutScroll>
  );
};

export default Notification;
