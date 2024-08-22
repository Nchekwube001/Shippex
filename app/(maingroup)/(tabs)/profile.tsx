import React, {useMemo} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import LogoComponent from '@/components/globals/LogoComponent';
import TextComponent from '@/components/text/TextComponent';
import profileLinearBg from '@/assets/images/profileLinearBg.png';
import ChevronRight from '@/assets/svgs/ChevronRight.svg';
import MyProfileIcon from '@/assets/svgs/MyProfileIcon.svg';
import SubscriptionsIcon from '@/assets/svgs/SubscriptionsIcon.svg';
import NotificationsIcon from '@/assets/svgs/NotificationsIcon.svg';
import ChangePasswordIcon from '@/assets/svgs/ChangePasswordIcon.svg';
import NeedHelp from '@/assets/svgs/NeedHelp.svg';
import BookSession from '@/assets/svgs/BookSession.svg';
import Faqs from '@/assets/svgs/Faqs.svg';
import Rating from '@/assets/svgs/Rating.svg';
import TandCIcon from '@/assets/svgs/TandCIcon.svg';
import LogoutIcon from '@/assets/svgs/LogoutIcon.svg';
import {Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import PressableComponent from '@/components/pressable/PressableComponent';
import {router} from 'expo-router';
import useLogout from '@/service/logout';
import ProfileProgressCard from '@/components/uttility/ProfileProgressCard';
import DeleteAccountBox from '@/components/uttility/DeleteAccountBox';
import ImageComponent from '@/components/image/ImageComponent';
import {useUserProfile} from '@/constants/utils/hooks';
const Profile = () => {
  const {logout} = useLogout();

  const profileItemsList = useMemo(
    () => [
      {
        title: 'My Profile',
        leftIcon: <MyProfileIcon />,
        onPress: () => {
          router.push('profileoverview');
        },
      },
      {
        title: 'Subscriptions',
        leftIcon: <SubscriptionsIcon />,
        onPress: () => {
          router.push('subscriptions');
        },
      },
      {
        title: 'Book a Session',
        leftIcon: <BookSession />,
        onPress: () => {
          router.push('booksession');
        },
      },
      {
        title: 'Notifications',
        leftIcon: <NotificationsIcon />,
        onPress: () => {
          router.push('notification');
        },
      },
      {
        title: 'Change Password',
        leftIcon: <ChangePasswordIcon />,
        onPress: () => {
          router.push('changepassword');
        },
      },
      {
        title: 'Rating & Review',
        leftIcon: <Rating />,
        onPress: () => {
          router.push('rating');
        },
      },
      {
        title: 'Frequently Asked Questions',
        leftIcon: <Faqs />,
        onPress: () => {
          router.push('faqs');
        },
      },
      {
        title: 'Need Help with App',
        leftIcon: <NeedHelp />,
        onPress: () => {
          router.push('needhelp');
        },
      },

      {
        title: 'Terms & Conditions',
        leftIcon: <TandCIcon />,
        onPress: () => {
          router.push('terms');
        },
      },
      {
        title: 'Privacy Policy',
        leftIcon: <TandCIcon />,
        onPress: () => {
          router.push('privacy');
        },
      },
      {
        title: 'Logout',
        leftIcon: <LogoutIcon />,
        onPress: () => {
          logout();
        },
      },
    ],
    [logout],
  );
  const {userProfile} = useUserProfile();

  const profilePhotos = userProfile?.profilePhotos;

  return (
    <LayoutWithSafeArea>
      <Box>
        <Box style={[globalStyle.px2p4, globalStyle.pt2p4]}>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.w10,
              globalStyle.alignItemsCenter,
            ]}>
            <LogoComponent size={32} />
            <Box
              position={'absolute'}
              style={[
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.justifyCenter,
                globalStyle.w10,
              ]}>
              <TextComponent
                secondary
                style={[
                  globalStyle.fontSize18,
                  globalStyle.fontWeight600,
                  globalStyle.fontMatterSemiBold,
                ]}>
                Profile
              </TextComponent>
            </Box>
          </Box>
        </Box>
        <Box style={[globalStyle.pt0p8]}>
          <Image
            source={profileLinearBg}
            style={[globalStyle.w10, profileStyle.bgHeight]}
          />
          <Box
            top={40}
            style={[
              globalStyle.absolute,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
              globalStyle.w10,
            ]}>
            <Box
              style={[
                profileStyle.ppImageBox,
                globalStyle.borderPrimary,
                globalStyle.p0p3,
                globalStyle.br,
              ]}>
              <Box
                style={[
                  globalStyle.w10,
                  globalStyle.h10,
                  globalStyle.br,
                  globalStyle.bgBlack,
                ]}>
                {profilePhotos?.length > 0 && (
                  <ImageComponent
                    source={{uri: profilePhotos?.[0] ?? ''}}
                    style={[globalStyle.w10, globalStyle.h10, globalStyle.br]}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          style={[
            globalStyle.px2p4,
            globalStyle.pt4,
            globalStyle.mt1p6,
            globalStyle.alignItemsCenter,
          ]}>
          <TextComponent
            style={[globalStyle.fontSize18, globalStyle.fontMatterSemiBold]}>
            {userProfile?.firstname ?? ''}&nbsp;{userProfile?.lastname ?? ''}
          </TextComponent>
          <TextComponent gray style={[]}>
            {userProfile?.email ?? ''}
          </TextComponent>
          <ProfileProgressCard showMargin />
          <Box
            style={[
              globalStyle.mt2p4,
              globalStyle.mb2p4,
              globalStyle.py0p2,
              globalStyle.px1p2,
              globalStyle.bgTextInput,
              globalStyle.borderRadius8,
              globalStyle.w10,
            ]}>
            {profileItemsList.map(({leftIcon, onPress, title}) => (
              <PressableComponent
                onPress={onPress}
                key={title}
                style={[
                  globalStyle.w10,
                  globalStyle.flexrow,
                  globalStyle.alignItemsCenter,
                  globalStyle.py1p6,
                ]}>
                <Box>{leftIcon}</Box>
                <Box flex={1} style={[globalStyle.px0p8]}>
                  <TextComponent gray>{title}</TextComponent>
                </Box>
                <ChevronRight />
              </PressableComponent>
            ))}
          </Box>
          <Box style={[globalStyle.w10, globalStyle.pb2p4]}>
            <DeleteAccountBox />
          </Box>
        </Box>
      </Box>
    </LayoutWithSafeArea>
  );
};

export const profileStyle = ScaledSheet.create({
  bgHeight: {
    height: '80@s',
  },
  ppImageBox: {
    width: '88@s',
    height: '88@s',
  },
});

export default Profile;
