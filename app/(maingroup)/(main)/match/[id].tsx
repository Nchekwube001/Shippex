import React, {useMemo} from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import useProfile from '@/service/profile';
import MainLayoutComponent from '@/components/layout/MainLayoutComponent';
import Box from '@/components/layout/Box';
import globalStyle, {STATUSBAR_HEIGHT} from '@/globalStyle/globalStyle';
import {detailStyle} from '../communities/[id]';
import HeaderComponent from '@/components/header/Header';
import TextComponent from '@/components/text/TextComponent';
import LocationPrimary from '@/assets/svgs/LocationPrimary.svg';
import HeartWhite from '@/assets/svgs/HeartWhite.svg';
import SmokeIcon from '@/assets/svgs/SmokeIcon.svg';
import DrinkIcon from '@/assets/svgs/DrinkIcon.svg';
import ReligionIcon from '@/assets/svgs/ReligionIcon.svg';
import CloseWhite from '@/assets/svgs/CloseWhite.svg';
import MessageSecondary from '@/assets/svgs/MessageSecondary.svg';
import EducationIcon from '@/assets/svgs/EducationIcon.svg';
// import OccupationIcon from '@/assets/svgs/OccupationIcon.svg';
import AgeIcon from '@/assets/svgs/AgeIcon.svg';
import TitleDescBox from '@/components/uttility/TitleDescBox';
import {capialiseFirst, getCurrentValue} from '@/constants/utils/utils';
import PressableComponent from '@/components/pressable/PressableComponent';
import IconTextRow from '@/components/uttility/IconTextRow';
import dayjs from 'dayjs';
import {streamClient} from '../../(tabs)/_layout';
import {onetooneconst} from '@/constants/utils/constants';

const MatchDetail = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const {useGetProfileMatches, useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  const {matchData} = useGetProfileMatches({
    breaker_id: profileData?.user?.dealBreakerId,
  });

  const currentItem = useMemo(
    () => matchData.find((item: any) => item?.profile?.id === Number(id)),
    [id, matchData],
  );
  const userProfile = currentItem?.profile;
  const messageMatch = async () => {
    const members = [String(profileData?.user?.id), String(userProfile?.id)];
    const channel = streamClient.channel(onetooneconst, {
      members: members,
    });
    channel
      .create()
      .then(() => {
        router.push(`chats/${channel.id}`);
      })
      .catch(err => {
        console.log({
          err,
        });
      });
  };

  // console.log({
  //   userProfile,
  // });

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
            {/* <ImageBackground
              source={currentItem?.img}
              style={[globalStyle.w10, globalStyle.h10]}> */}
            <Box
              style={[
                globalStyle.w10,
                globalStyle.bgPurplePrimary,
                globalStyle.h10,
              ]}>
              <Box
                style={[globalStyle.w10, globalStyle.px1p6, globalStyle.pt1p2]}>
                <HeaderComponent text="" transparent />
              </Box>
            </Box>
            {/* </ImageBackground> */}
          </Box>
        </Box>
        <Box
          style={[
            globalStyle.px2p4,
            {
              paddingTop: STATUSBAR_HEIGHT + 24,
            },
          ]}>
          <Box style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}>
            <Box flex={1}>
              <TextComponent
                style={[
                  globalStyle.fontSize22,
                  globalStyle.fontWeight600,
                  globalStyle.fontMatterMedium,
                ]}>
                {userProfile?.firstname ?? ''}&nbsp;
                {userProfile?.lastname ?? ''}
              </TextComponent>
              <Box
                style={[
                  globalStyle.flexrow,
                  globalStyle.alignItemsCenter,
                  globalStyle.pt0p2,
                ]}>
                <Box style={[globalStyle.pr0p4]}>
                  <LocationPrimary />
                </Box>

                <TextComponent
                  style={[globalStyle.fontSize12, globalStyle.fontMatterLight]}>
                  {userProfile?.state ?? ''},{userProfile?.country ?? ''}
                </TextComponent>
              </Box>
            </Box>
            <Box
              style={[
                globalStyle.br,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.justifyCenter,
                globalStyle.px0p5,
                globalStyle.py0p4,
                globalStyle.bgPurplePrimary,
              ]}>
              <HeartWhite />
              <TextComponent
                style={[globalStyle.textWhite, globalStyle.fontSize12]}>
                &nbsp;92%
              </TextComponent>
            </Box>
          </Box>
          <Box style={[globalStyle.pt2p4]}>
            <TitleDescBox title="About Me" desc={userProfile?.bio ?? ''} />
          </Box>
          <Box style={[globalStyle.pt2p4]}>
            <TitleDescBox
              title="Personality Result"
              desc={userProfile?.bio ?? ''}
            />
          </Box>
          <Box style={[globalStyle.pt2p4]}>
            <TitleDescBox title="Essentials" />
            <Box style={[globalStyle.pt1p6]}>
              <Box>
                <IconTextRow
                  icon={<AgeIcon />}
                  text={`${dayjs().diff(userProfile?.dob, 'year')} years`}
                />
              </Box>
              <Box style={[globalStyle.pt1p2]}>
                <IconTextRow
                  icon={<EducationIcon />}
                  // text={`${userProfile?.education}`}
                  text={getCurrentValue(1, userProfile?.education)?.item ?? ''}
                />
              </Box>
              {/* <Box style={[globalStyle.pt1p2]}>
                <IconTextRow
                  icon={<OccupationIcon />}
                  text={`${userProfile?.occupation}`}
                />
              </Box> */}
              <Box style={[globalStyle.pt1p2]}>
                <IconTextRow
                  icon={<ReligionIcon />}
                  // text={`${userProfile?.religion}`}
                  text={getCurrentValue(0, userProfile?.religion)?.item ?? ''}
                />
              </Box>
              <Box style={[globalStyle.pt1p2]}>
                <IconTextRow
                  icon={<DrinkIcon />}
                  text={
                    getCurrentValue(0, userProfile?.drinkRate, true)?.item ?? ''
                  }
                  // text={`${
                  //   drinkOptions.find(
                  //     item => item.mainKey === userProfile?.drinkRate,
                  //   )?.item ?? ''
                  // }`}
                />
              </Box>
              <Box style={[globalStyle.pt1p2]}>
                <IconTextRow
                  icon={<SmokeIcon />}
                  text={
                    getCurrentValue(2, userProfile?.smokeRate, true)?.item ?? ''
                  }
                  // text={`${userProfile?.smokeRate}`}
                />
              </Box>
            </Box>
          </Box>
          <Box style={[globalStyle.pt2p4]}>
            <TitleDescBox title="Interest" />
            <Box
              style={[
                globalStyle.pt1p6,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.flexwrap,
              ]}>
              {userProfile?.interests.map((value: string) => (
                <Box
                  key={value}
                  style={[globalStyle.px0p8, globalStyle.alignItemsCenter]}>
                  <Box
                    style={[
                      globalStyle.px0p8,
                      globalStyle.py0p5,
                      globalStyle.borderInput,
                      globalStyle.bgTextInput,
                      globalStyle.mb0p5,
                      // globalStyle.borderRadius4,
                      globalStyle.br,
                    ]}>
                    <TextComponent gray style={[globalStyle.fontSize12]}>
                      {capialiseFirst(value ?? '')}
                    </TextComponent>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              style={[
                globalStyle.pt3p2,
                globalStyle.pb2p4,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
              ]}>
              <PressableComponent
                style={[
                  globalStyle.textInputHeight,
                  globalStyle.bgSecondary,
                  globalStyle.br,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                  globalStyle.px2p4,
                ]}>
                <CloseWhite />
              </PressableComponent>
              <Box flex={1} style={[globalStyle.px1p5]}>
                <PressableComponent
                  onPress={messageMatch}
                  style={[
                    globalStyle.w10,
                    globalStyle.textInputHeight,
                    globalStyle.bgTextInput,
                    globalStyle.br,
                    globalStyle.justifyCenter,
                    globalStyle.alignItemsCenter,
                    globalStyle.flexrow,
                  ]}>
                  <MessageSecondary />
                  <TextComponent
                    secondary
                    style={[
                      globalStyle.fontWeight600,
                      globalStyle.pl0p8,
                      globalStyle.fontSize16,
                    ]}>
                    Message
                  </TextComponent>
                </PressableComponent>
              </Box>
              <PressableComponent
                style={[
                  globalStyle.textInputHeight,
                  globalStyle.bgPurplePrimary,
                  globalStyle.br,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                  globalStyle.px2p4,
                ]}>
                <HeartWhite width={24} height={24} />
              </PressableComponent>
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayoutComponent>
  );
};

export default MatchDetail;
