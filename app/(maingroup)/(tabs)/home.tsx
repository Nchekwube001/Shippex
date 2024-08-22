import React, {useCallback, useEffect} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import useProfile from '@/service/profile';
import CompleteProfileBox from '@/components/uttility/CompleteProfileBox';
import TextComponent from '@/components/text/TextComponent';
import CommunityListBox from '@/components/uttility/CommunityList';
import TabHeader from '@/components/header/TabHeader';
import MatchItem from '@/components/uttility/MatchItem';
import ProfileProgressCard from '@/components/uttility/ProfileProgressCard';
import {streamClient} from './_layout';
import HomePrompt from '@/components/uttility/HomePrompt';
import bookBg from '@/assets/images/BookBg.png';
import subBg from '@/assets/images/SubBg.png';
import BookIcon from '@/assets/svgs/BookIcon.svg';
import SubIcon from '@/assets/svgs/SubIcon.svg';
import {router} from 'expo-router';
import {onetooneconst} from '@/constants/utils/constants';
import {useUserProfile} from '@/constants/utils/hooks';
const Home = () => {
  const {useGetKiki, useGetProfileMatches} = useProfile();
  const {isFreemimum, isLoading, profileData, userProfile} = useUserProfile();
  const {kikiData} = useGetKiki();
  const kikiProfile = kikiData?.user ?? {};
  const joinKiki = useCallback(async () => {
    if (
      kikiProfile?.id &&
      userProfile?.id &&
      kikiProfile?.id !== userProfile?.id
    ) {
      const channel = streamClient.channel(onetooneconst, {
        members: [userProfile?.id?.toString(), kikiProfile?.id?.toString()],
        // name:''
      });

      // if (isFreemimum) {
      //   channel.removeMembers([
      //     userProfile?.id?.toString(),
      //     kikiProfile?.id?.toString(),
      //   ]);
      // } else {
      await channel
        .create()
        .then(() => {})
        .catch(createErr => {
          if (createErr) {
          }
        });
      // }

      // await channel.
    }
  }, [kikiProfile?.id, userProfile?.id]);

  useEffect(() => {
    joinKiki();
  }, [joinKiki]);

  // const queryClient = useQueryClient();

  const {matchData} = useGetProfileMatches({
    breaker_id: profileData?.user?.dealBreakerId,
  });
  // const {email} = useAppSelector(state => state.loggedInUser);
  // useEffect(() => {
  //   if (email) {
  //     console.log({
  //       email,
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ['user-matches', 'user-profile'],
  //     });
  //     refetch();
  //   }
  // }, [email, refetch]);

  return (
    <LayoutWithSafeArea>
      <Box style={[globalStyle.px2p4]}>
        <TabHeader />
        <Box style={[globalStyle.pt2p4]}>
          <TextComponent
            style={[
              globalStyle.fontMatterBold,
              globalStyle.fontWeight500,
              globalStyle.fontSize22,
            ]}>
            Welcome {profileData?.user?.firstname ?? ''}
          </TextComponent>
        </Box>
        <Box style={[globalStyle.pt0p2, globalStyle.pb0p8]}>
          <TextComponent gray style={[globalStyle.fontSize14]}>
            Your love story starts here
          </TextComponent>
        </Box>
        {!isLoading && (
          <>
            {!profileData?.user?.address && (
              <Box style={[globalStyle.pt1p6]}>
                <CompleteProfileBox />
              </Box>
            )}
            {profileData?.user?.address && <ProfileProgressCard />}

            <Box style={[globalStyle.pt1p6]}>
              {matchData?.map((item: any, idx: number) => (
                <Box key={idx.toString()} style={[globalStyle.pb1p2]}>
                  <MatchItem item={item} />
                </Box>
              ))}
            </Box>
          </>
        )}
        {isFreemimum && (
          <Box style={[globalStyle.pt1p2]}>
            <HomePrompt
              bg={subBg}
              leftIcon={<SubIcon />}
              title="Subscribe to Premium Plan"
              onPress={() => router.push('subscriptions')}
            />
          </Box>
        )}
        <Box style={[globalStyle.pt1p2]}>
          <HomePrompt
            bg={bookBg}
            leftIcon={<BookIcon />}
            title="Book A Coaching Session"
            desc="Book now to talk to an expert"
            onPress={() => router.push('booksession')}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <TextComponent
            secondary
            style={[globalStyle.fontWeight500, globalStyle.fontSize18]}>
            Communities For You
          </TextComponent>
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <CommunityListBox />
        </Box>
      </Box>
    </LayoutWithSafeArea>
  );
};

export default Home;
