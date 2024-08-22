import React, {useCallback, useEffect, useState} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import HeaderComponent from '@/components/header/Header';
import useProfile from '@/service/profile';
import SelectComponent from '@/components/select/SelectComponent';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import {capialiseFirst, getCurrentValue} from '@/constants/utils/utils';
import {router} from 'expo-router';
import TextComponent from '@/components/text/TextComponent';
import dayjs from 'dayjs';
import DeleteAccountBox from '@/components/uttility/DeleteAccountBox';
import {useDebouncedValue} from '@/constants/utils/hooks';
import SwitchComponent from '@/components/switch/SwitchComponent';

const ProfileOverview = () => {
  const {useGetProfile, useUpdateProfile} = useProfile();
  const {profileData} = useGetProfile();
  const {updateProfileMutation} = useUpdateProfile();
  const updateIncognito = useCallback(
    (val: boolean) =>
      updateProfileMutation({
        incognito: val,
      }),
    [updateProfileMutation],
  );
  // console.log({personality: profileData?.personality});
  const userProfile = profileData?.user ?? {};
  // console.log({userProfile});
  // console.log({dealBreaker: profileData?.dealBreaker});
  // console.log({dealBreaker: profileData?.dealBreaker});
  const [incognito, setIncognito] = useState<boolean>(
    userProfile?.incognito ?? true,
  );
  const debounceIncognito = useDebouncedValue(incognito, 1000);

  useEffect(() => {
    updateIncognito(debounceIncognito);
  }, [debounceIncognito, updateIncognito]);

  const [religion] = useState(getCurrentValue(0, userProfile?.religion)?.item);
  const [education] = useState(
    getCurrentValue(1, userProfile?.education)?.item,
  );
  const [bodyType] = useState(getCurrentValue(4, userProfile?.bodyType)?.item);
  const [complexion] = useState(
    getCurrentValue(3, userProfile?.complexion)?.item,
  );
  const [smoker] = useState(getCurrentValue(2, userProfile?.smokeRate)?.item);
  const [drinker] = useState(
    getCurrentValue(0, userProfile?.drinkRate, true)?.item,
  );
  const onProfileUpdate = () => router.push('completeprofile');
  return (
    <LayoutWithSafeArea>
      <Box style={[globalStyle.px2p4, globalStyle.pb2p4]}>
        <HeaderComponent text="My Profile" useGray />

        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            value={
              (userProfile?.firstname ?? '') +
              ' ' +
              (userProfile?.lastname ?? '')
            }
            label="Full Name"
            placeholder="Full Name"
            disabled
            whiteBg
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            value={userProfile?.username ?? ''}
            label="Username"
            placeholder="Username"
            disabled
            whiteBg
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            value={userProfile?.email ?? ''}
            label="Email address"
            placeholder="Email address"
            isRight
            whiteBg
            onPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            value={userProfile?.phone ?? ''}
            label="Phone number"
            placeholder="Phone number"
            onPress={onProfileUpdate}
            isRight
            whiteBg
          />
        </Box>
        <Box
          style={[
            globalStyle.mt1p6,
            globalStyle.borderInput,
            globalStyle.bgWhite,
            globalStyle.borderRadius4,
            globalStyle.py1p2,
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.px1,
            globalStyle.mb1p6,
          ]}>
          <Box flex={1}>
            <TextComponent
              numberOfLines={1}
              style={[globalStyle.fontSize13, globalStyle.textGray4]}>
              Gender
            </TextComponent>
            <TextComponent
              numberOfLines={1}
              style={[
                globalStyle.fontWeight500,
                globalStyle.fontMatterSemiBold,
                globalStyle.pt0p4,
              ]}>
              {capialiseFirst(userProfile?.gender ?? '')}
            </TextComponent>
          </Box>
          <Box flex={1}>
            <TextComponent
              numberOfLines={1}
              style={[globalStyle.fontSize13, globalStyle.textGray4]}>
              Date of birth
            </TextComponent>
            <TextComponent
              numberOfLines={1}
              style={[
                globalStyle.fontWeight500,
                globalStyle.fontMatterSemiBold,
                globalStyle.pt0p4,
              ]}>
              {userProfile?.dob
                ? dayjs(userProfile?.dob).format('DD MMM YYYY')
                : ''}
            </TextComponent>
          </Box>
        </Box>
        <Box style={[globalStyle.pt1p6, globalStyle.borTop]}>
          <TextInputComponent
            whiteBg
            multiline
            editable={false}
            value={userProfile?.bio ?? ''}
            title="Bio"
            rightText="Edit Bio"
            onTextPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            whiteBg
            value={education ?? ''}
            label="Education"
            placeholder="Education"
            isRight
            onPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            whiteBg
            value={religion ?? ''}
            label="Religion"
            placeholder="Religion"
            isRight
            onPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            whiteBg
            value={bodyType ?? ''}
            label="Body type"
            placeholder="Body type"
            isRight
            onPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            whiteBg
            value={complexion ?? ''}
            label="Complexion"
            placeholder="Complexion"
            isRight
            onPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            whiteBg
            value={smoker ?? ''}
            label="Smoking habit"
            placeholder="Smoking habit"
            isRight
            onPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            whiteBg
            value={drinker ?? ''}
            label="Drinking habit"
            placeholder="Drinking habit"
            isRight
            onPress={onProfileUpdate}
          />
        </Box>
        <Box
          style={[
            globalStyle.pt1p6,
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.justifyBetween,
          ]}>
          <TextComponent
            style={[globalStyle.fontSize16, globalStyle.fontWeight500]}>
            Incognito Mode
          </TextComponent>
          <SwitchComponent
            isActive={incognito}
            onPress={() => setIncognito(prev => !prev)}
          />
        </Box>
        <TextComponent
          style={[
            globalStyle.pt0p8,
            globalStyle.fontSize13,
            globalStyle.fontMatterLight,
          ]}>
          Once off, everyone will be able to see your profile picture.
        </TextComponent>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            whiteBg
            value={`${userProfile?.address ?? ''} ${userProfile?.city ?? ''}${
              userProfile?.state ? ', ' + userProfile.state : ''
            } ${userProfile?.country ? ', ' + userProfile.country : ''}`}
            label="Location"
            placeholder=""
            isRight
            onPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.pt1p6]}>
          <SelectComponent
            whiteBg
            value={`${
              userProfile?.profilePhotos?.length ?? ''
            } Photos uploaded`}
            label="Profile photos"
            placeholder="Profile photos"
            isRight
            onPress={onProfileUpdate}
          />
        </Box>
        <Box style={[globalStyle.py1p6, globalStyle.borBtm]}>
          <SelectComponent
            value={userProfile?.personalityCompleted}
            label=""
            placeholder="Deal breakers"
            isRight
            showProgress
            whiteBg
            onPress={() => {
              router.push('dealbreaker');
            }}
          />
        </Box>
        <Box style={[globalStyle.py1p6, globalStyle.borBtm]}>
          <SelectComponent
            value={userProfile?.personalityCompleted}
            label=""
            placeholder="Interests"
            isRight
            showProgress
            whiteBg
            onPress={() => {
              router.push('chooseinterests');
            }}
            data={
              <Box
                style={[
                  globalStyle.pt0p8,
                  globalStyle.flexrow,
                  globalStyle.alignItemsCenter,
                  globalStyle.flexwrap,
                  globalStyle.px1,
                ]}>
                {userProfile?.interests?.map((item: any) => (
                  <Box
                    style={[
                      globalStyle.px1p2,
                      globalStyle.py0p5,
                      globalStyle.borderInput,
                      globalStyle.bgTextInput,
                      globalStyle.br,
                      globalStyle.mb0p5,
                      globalStyle.mr0p4,
                    ]}
                    key={item}>
                    <TextComponent>{item}</TextComponent>
                  </Box>
                ))}
                {/* {

  userProfile?.interests?.map(item)=> <Box>
<TextComponent>
  {item}
</TextComponent>
    </Box>
} */}
              </Box>
            }
          />
        </Box>
        <Box style={[globalStyle.py1p6]}>
          <SelectComponent
            whiteBg
            value={userProfile?.personalityCompleted}
            label=""
            placeholder="Personality Test"
            isRight
            showProgress
            onPress={() => {
              router.push('personalitytest');
            }}
          />
        </Box>
        <DeleteAccountBox />
      </Box>
    </LayoutWithSafeArea>
  );
};

export default ProfileOverview;
