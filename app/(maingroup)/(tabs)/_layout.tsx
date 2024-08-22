import React, {FC} from 'react';
import {Tabs} from 'expo-router';
import HomeActive from '@/assets/svgs/HomeActive.svg';
import HomeInactive from '@/assets/svgs/HomeInactive.svg';
import ChatActive from '@/assets/svgs/ChatActive.svg';
import ChatInactive from '@/assets/svgs/ChatInactive.svg';
import CommunityActive from '@/assets/svgs/CommunityActive.svg';
import CommunityInactive from '@/assets/svgs/CommunityInactive.svg';
import ProfileActive from '@/assets/svgs/ProfileActive.svg';
import ProfileInactive from '@/assets/svgs/ProfileInactive.svg';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '@/constants/colors/pallete';
import globalStyle from '@/globalStyle/globalStyle';
import TextComponent from '@/components/text/TextComponent';
import {StreamChat} from 'stream-chat';
import {STREAM_API_KEY} from '@/constants/streamConfig';
interface bottomTextInterface {
  title: string;
  color: string;
}
const BottomTabText: FC<bottomTextInterface> = ({color, title}) => {
  return (
    <TextComponent style={[globalStyle.fontSize11, {color}]}>
      {title}
    </TextComponent>
  );
};

export const streamClient = StreamChat.getInstance(STREAM_API_KEY);
export const user = {
  id: 'francis',
  name: 'Francis',
  // image:
  //   'data:image/jpeg;base64,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',
};
const TabLayout = () => {
  return (
    // <OverlayProvider>
    //   <Chat client={streamClient}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [tabBarStyle.tabStyle],
        tabBarLabelStyle: [globalStyle.fontSize10, globalStyle.fontWeight500],
        tabBarActiveTintColor: palette.primaryDefault,
        tabBarInactiveTintColor: palette.tabBarInactive,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <HomeActive /> : <HomeInactive />;
          },
          tabBarLabel: ({color}) => (
            <BottomTabText title="Home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <CommunityActive /> : <CommunityInactive />;
          },
          tabBarLabel: ({color}) => (
            <BottomTabText title="Communities" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <ChatActive /> : <ChatInactive />;
          },
          tabBarLabel: ({color}) => (
            <BottomTabText title="Chats" color={color} />
          ),
          // title: 'Chat',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <ProfileActive /> : <ProfileInactive />;
          },
          tabBarLabel: ({color}) => (
            <BottomTabText title="Profile" color={color} />
          ),
        }}
      />
    </Tabs>
    // </Chat>
    // </OverlayProvider>
  );
};

const tabBarStyle = ScaledSheet.create({
  iconsize: {
    width: '22@s',
    height: '22@s',
  },
  tabStyle: {
    elevation: 3,
    shadowColor: palette.grey4,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: '40@s',
    borderTopWidth: 1,
    borderTopColor: palette.transparent,
    // height: '84@s',
  },
  tabBarLabelStyle: {
    fontSize: '15@s',
    fontWeight: 'bold',
  },
});

export default TabLayout;
