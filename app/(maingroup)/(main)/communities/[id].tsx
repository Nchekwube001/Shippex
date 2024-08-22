import {ImageBackground} from 'react-native';
import React, {useMemo} from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import MainLayoutComponent from '@/components/layout/MainLayoutComponent';
import Box from '@/components/layout/Box';
import {ScaledSheet} from 'react-native-size-matters';
import globalStyle, {STATUSBAR_HEIGHT} from '@/globalStyle/globalStyle';
import {communityList, groupchatconst} from '@/constants/utils/constants';
import HeaderComponent from '@/components/header/Header';
import MembersCountIcon from '@/assets/svgs/MembersCountIcon.svg';
import TextComponent from '@/components/text/TextComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import {streamClient} from '../../(tabs)/_layout';
import useProfile from '@/service/profile';
const CommunityDetail = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const {useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  const userProfile = profileData?.user ?? {};
  const currentItem = useMemo(
    () => communityList.find(item => item.id === Number(id)),
    [id],
  );
  const joinCommunity = async () => {
    const channel = streamClient.channel(
      groupchatconst,
      (currentItem?.name ?? '').replace(/\s/g, ''),
      {
        name: currentItem?.name ?? '',
      },
    );
    await channel
      .create()
      .then(() => {
        channel
          .addMembers([`${userProfile?.id ?? ''}`], {
            text: `${userProfile?.firstname ?? ''} joined the channel.`,
          })
          .then(() => {
            router.push(`chats/${channel.id}`);
          })
          .catch(addmemberErr => {
            if (addmemberErr) {
            }
          });
      })
      .catch(createErr => {
        if (createErr) {
        }
      });

    // console.log({
    //   '--------------channel --------------': channel,
    // });
  };
  return (
    <MainLayoutComponent lightBar>
      <Box flex={1}>
        <Box
          style={[
            globalStyle.w10,
            detailStyle.cardHeight,
            globalStyle.bgLoaderDark,
            globalStyle.px1p6,
          ]}>
          <Box
            style={[
              globalStyle.w10,
              detailStyle.cardHeight,
              globalStyle.borderRadius8,
              globalStyle.overflowHidden,
              {
                top: STATUSBAR_HEIGHT,
              },
            ]}>
            <ImageBackground
              source={currentItem?.img}
              style={[globalStyle.w10, globalStyle.h10]}>
              <Box
                style={[globalStyle.w10, globalStyle.px1p6, globalStyle.pt1p2]}>
                <HeaderComponent text="" transparent />
              </Box>
            </ImageBackground>
          </Box>
        </Box>
        <Box
          style={[
            globalStyle.px2p4,
            {
              paddingTop: STATUSBAR_HEIGHT + 24,
            },
          ]}>
          <TextComponent
            style={[
              globalStyle.fontSize22,
              globalStyle.fontWeight600,
              globalStyle.fontMatterMedium,
            ]}>
            {currentItem?.name}
          </TextComponent>
          <Box
            style={[
              globalStyle.pt1p2,
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
            ]}>
            <Box style={[globalStyle.pr0p6]}>
              <MembersCountIcon />
            </Box>
            <TextComponent gray style={[]}>
              {currentItem?.members} members
            </TextComponent>
          </Box>
          <TextComponent
            style={[
              globalStyle.fontSize18,
              globalStyle.fontWeight600,
              globalStyle.fontMatterMedium,
              globalStyle.pt1p6,
            ]}>
            About this community
          </TextComponent>
          <Box
            style={[
              globalStyle.pt1p2,
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
            ]}>
            <TextComponent gray style={[]}>
              {currentItem?.about}
            </TextComponent>
          </Box>

          <Box style={[globalStyle.pt4p8]}>
            <ButtonComponent title="Join Community" onPress={joinCommunity} />
          </Box>
        </Box>
      </Box>
    </MainLayoutComponent>
  );
};

export const detailStyle = ScaledSheet.create({
  cardHeight: {
    height: '300@s',
  },
  cardHeightSmall: {
    height: '260@s',
  },
});

export default CommunityDetail;
