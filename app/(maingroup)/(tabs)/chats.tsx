import React, {useState} from 'react';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import {ScaledSheet} from 'react-native-size-matters';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import TextComponent from '@/components/text/TextComponent';
import palette from '@/constants/colors/pallete';
import {useWindowDimensions} from 'react-native';
// import NoMessageIcon from '@/assets/svgs/NoMessageIcon.svg';
import {ChannelList} from 'stream-chat-expo';
import {router} from 'expo-router';
import useProfile from '@/service/profile';
import NoMessageBox from '@/components/uttility/NoMessageBox';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import SearchInputComponent from '@/components/textInputs/SearchInputComponent';
import LogoComponent from '@/components/globals/LogoComponent';
import {groupchatconst, onetooneconst} from '@/constants/utils/constants';
const FirstRoute = () => {
  const {useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  const userProfile = profileData?.user ?? {};
  // Filter the channels to only show the channels where the user is a member
  const filters = {
    type: onetooneconst,
    members: {
      $in: [userProfile?.id.toString()],
    },
  };
  // Sort the channels by the last message date
  const sort = {
    last_message_at: -1,
  };
  return (
    <Box flex={1}>
      <Box style={[globalStyle.pt1p2, globalStyle.px2p4]}>
        <TextComponent gray style={[]}>
          All Messages
        </TextComponent>
      </Box>
      <Box style={[globalStyle.pt1p2]} flex={1}>
        <ChannelList
          onSelect={channel => router.navigate(`chats/${channel.id}`)}
          filters={filters}
          sort={sort as any}
          EmptyStateIndicator={() => (
            <>
              <NoMessageBox />
            </>
          )}
        />
        {/* <NoMessageIcon /> */}
      </Box>
    </Box>
  );
};
const SecondRoute = () => {
  const {useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  const userProfile = profileData?.user ?? {};
  // Filter the channels to only show the channels where the user is a member
  const filters = {
    type: groupchatconst,
    members: {
      $in: [userProfile?.id.toString()],
    },
  };

  // Sort the channels by the last message date
  const sort = {
    last_message_at: -1,
  };
  return (
    <Box flex={1}>
      <Box style={[globalStyle.pt1p2, globalStyle.px2p4]}>
        <TextComponent gray style={[]}>
          All Messages
        </TextComponent>
      </Box>
      <Box style={[globalStyle.pt1p2]} flex={1}>
        <ChannelList
          onSelect={channel => router.navigate(`chats/${channel.id}`)}
          filters={filters}
          sort={sort as any}
          EmptyStateIndicator={() => (
            <>
              <NoMessageBox />
            </>
          )}
        />
        {/* <NoMessageIcon /> */}
      </Box>
    </Box>
  );
};

const Index = () => {
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: 'Messages'},
    {key: 'second', title: 'Community'},
  ]);
  const [index, setNewIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  return (
    <LayoutWithSafeAreaWithoutScroll>
      <Box flex={1} style={[]}>
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.justifyBetween,
            globalStyle.pt2p4,
            globalStyle.px2p4,
          ]}>
          <LogoComponent size={32} />
          <Box flex={1} style={[globalStyle.pl1p2]}>
            <SearchInputComponent
              placeholder="Search"
              style={[chatStyle.searchHeight]}
              value={searchText}
              onChangeText={setSearchText}
            />
          </Box>
        </Box>
        <Box flex={1} style={[globalStyle.pt2p4]}>
          {/* <Box
            style={[
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
              globalStyle.w10,
              globalStyle.bgSecondary10,
              globalStyle.borderRadius6,
              globalStyle.p0p4,
            ]}>
            <Box
              style={[
                globalStyle.w5,
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
                // index === 0 && globalStyle.bgSecondary,
              ]}>
              <Pressable
                onPress={() => {
                  setNewIndex(0);
                }}
                style={[
                  globalStyle.w10,
                  globalStyle.py0p8,
                  index === 0 && globalStyle.bgSecondary,
                  globalStyle.borderRadius4,
                ]}>
                <TextComponent
                  style={[
                    globalStyle.textCenter,
                    globalStyle.fontSize12,
                    index === 0 && globalStyle.textWhite,
                  ]}>
                  Messages
                </TextComponent>
              </Pressable>
            </Box>
            <Box
              style={[
                globalStyle.w5,
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
              ]}>
              <Pressable
                onPress={() => {
                  setNewIndex(1);
                }}
                style={[
                  globalStyle.w10,
                  globalStyle.py0p8,
                  index === 1 && globalStyle.bgSecondary,
                  globalStyle.borderRadius4,
                ]}>
                <TextComponent
                  style={[
                    globalStyle.textCenter,
                    globalStyle.fontSize12,
                    index === 1 && globalStyle.textWhite,
                  ]}>
                  Community
                </TextComponent>
              </Pressable>
            </Box>
          </Box>
          <Box flex={1} backgroundColor={'mainBackground'}>
            <Animated.View
              key={index.toString()}
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={[globalStyle.pt1p2, globalStyle.flexOne]}>
              <ChannelList
                onSelect={channel => router.navigate(`chats/${channel.id}`)}
                filters={filters}
                sort={sort as any}
                EmptyStateIndicator={() => (
                  <>
                    <NoMessageBox />
                  </>
                )}
              />
            </Animated.View>
          </Box> */}

          <TabView
            lazyPreloadDistance={0}
            navigationState={{index, routes}}
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
            })}
            onIndexChange={setNewIndex}
            initialLayout={{width: layout.width}}
            swipeEnabled={true}
            renderTabBar={props => (
              <Box style={[globalStyle.px2p4]}>
                <TabBar
                  {...props}
                  pressColor={'transparent'}
                  renderLabel={({route, focused}) => (
                    <TextComponent
                      style={[
                        globalStyle.textCenter,
                        globalStyle.fontSize12,
                        focused && globalStyle.textWhite,
                      ]}>
                      {route.title}
                    </TextComponent>
                  )}
                  indicatorStyle={[
                    globalStyle.bgSecondary,
                    globalStyle.h10,
                    globalStyle.borderRadius6,
                    globalStyle.justifyCenter,
                    globalStyle.alignItemsCenter,
                    // chatStyle.indicatorStyle,
                  ]}
                  style={[
                    globalStyle.bgSecondary10,
                    globalStyle.borderRadius6,
                    // chatStyle.searchHeight,
                  ]}
                />
              </Box>
            )}
          />
        </Box>
      </Box>
    </LayoutWithSafeAreaWithoutScroll>
  );
};

const chatStyle = ScaledSheet.create({
  searchHeight: {
    height: '36@s',
  },
  indicatorStyle: {
    borderColor: palette.primaryDefault,
    borderBottomWidth: 3,
  },
});
export default Index;
