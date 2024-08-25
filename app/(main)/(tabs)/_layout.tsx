import React, {FC} from 'react';
import {Tabs} from 'expo-router';
import Shipment from '@/assets/svgs/Shipment.svg';
import Scan from '@/assets/svgs/Scan.svg';
import Wallet from '@/assets/svgs/Wallet.svg';
import Profile from '@/assets/svgs/Profile.svg';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '@/constants/colors/pallete';
import globalStyle from '@/globalStyle/globalStyle';
import TextComponent from '@/components/text/TextComponent';

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

const TabLayout = () => {
  return (
    // <OverlayProvider>
    //   <Chat client={streamClient}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [tabBarStyle.tabStyle],
        tabBarLabelStyle: [globalStyle.fontSize10, globalStyle.fontWeight500],
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.grey4,
      }}>
      <Tabs.Screen
        name="shipment"
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <Shipment /> : <Shipment />;
          },
          tabBarLabel: ({color}) => (
            <BottomTabText title="Shipments" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <Scan /> : <Scan />;
          },
          tabBarLabel: ({color}) => (
            <BottomTabText title="Scan" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <Wallet /> : <Wallet />;
          },
          tabBarLabel: ({color}) => (
            <BottomTabText title="Wallet" color={color} />
          ),
          // title: 'Chat',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <Profile /> : <Profile />;
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
    shadowColor: palette.mainGray,
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
