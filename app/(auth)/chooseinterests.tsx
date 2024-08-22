import React, {useState} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import InterestIcon from '@/assets/svgs/InterestIcon.svg';
import globalStyle from '@/globalStyle/globalStyle';
import TextComponent from '@/components/text/TextComponent';
import PressableComponent from '@/components/pressable/PressableComponent';
import {capialiseFirst} from '@/constants/utils/utils';
import ButtonComponent from '@/components/button/ButtonComponent';
import {router} from 'expo-router';
import Loader from '@/components/loader/Loader';
import useProfile from '@/service/profile';
import {useQueryClient} from '@tanstack/react-query';
import {useAppDispatch} from '@/constants/utils/hooks';
import {showToast} from '@/reducerSlices/toastSlice';

const ChooseInterests = () => {
  const {useAddInterest, useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  const dispatch = useAppDispatch();
  const userProfile = profileData?.user ?? {};
  const {addInterestsMutation, isLoadingInterests} = useAddInterest();
  const [interests] = useState([
    {
      value: 'Reading',
    },
    {
      value: 'Dancing',
    },
    {
      value: 'Shopping',
    },
    {
      value: 'Phototgraphy & Videography',
    },
    {
      value: 'Sports',
    },
    {
      value: 'Arts',
    },
    {
      value: 'Gardenings',
    },
    {
      value: 'Music',
    },
    {
      value: 'Movies',
    },
    {
      value: 'Pottery',
    },
    {
      value: 'Excercise',
    },
    {
      value: 'Meditation',
    },
    {
      value: 'Festivals',
    },
    {
      value: 'Politics',
    },
    {
      value: 'Board Games',
    },
    {
      value: 'Cooking',
    },
    {
      value: 'Cars',
    },
    {
      value: 'Travelling',
    },
    {
      value: 'Clubbing',
    },
    {
      value: 'Pets',
    },
    {
      value: 'Gardening',
    },
    {
      value: 'Singing',
    },
    {
      value: 'Nature',
    },
    {
      value: 'Basketball',
    },
    {
      value: 'Web3',
    },
    {
      value: 'Money',
    },
  ]);
  const [selectedItems, setSelectedItems] = useState<
    {name: string; id: string}[]
  >(
    (userProfile?.interests ?? []).map((item: string) => {
      return {
        name: item,
        id: item,
      };
    }),
  );
  const [min] = useState(5);
  const queryClient = useQueryClient();
  const addInterests = () => {
    const mappedInterests = selectedItems.map(item => item.id);
    addInterestsMutation(
      {
        interests: mappedInterests,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['user-matches', 'user-profile'],
          });
          router.replace('home');
          dispatch(
            showToast({
              message: 'Interests updated',
              status: 1,
            }),
          );
        },
      },
    );
  };
  return (
    <>
      {isLoadingInterests ? (
        <Loader />
      ) : (
        <LayoutWithSafeArea>
          <Box flex={1} style={[globalStyle.px1p6, globalStyle.pt2p4]}>
            <Box style={[globalStyle.alignItemsCenter]}>
              <InterestIcon />
              <Box style={[globalStyle.pt2p4]}>
                <TextComponent
                  secondary
                  style={[
                    globalStyle.fontMatterBold,
                    globalStyle.fontWeight500,
                    globalStyle.fontSize22,
                    globalStyle.textCenter,
                  ]}>
                  Choose Your Interests
                </TextComponent>
              </Box>
              <Box style={[globalStyle.pt0p8, globalStyle.w8p5]}>
                <TextComponent
                  style={[globalStyle.fontSize12, globalStyle.textCenter]}>
                  Choose at least 5 things you like. This will help you find
                  people with similar interests.
                </TextComponent>
              </Box>
            </Box>
            <Box
              style={[
                globalStyle.pt2p4,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.flexwrap,
              ]}>
              {interests.map(({value}) => (
                <Box
                  key={value}
                  style={[globalStyle.px0p8, globalStyle.alignItemsCenter]}>
                  <PressableComponent
                    onPress={() => {
                      if (selectedItems.find(val => value === val.name)) {
                        const filt = selectedItems.filter(
                          val => val.name !== value,
                        );
                        setSelectedItems(filt);
                      } else {
                        setSelectedItems(prev => [
                          ...prev,
                          {
                            name: value,
                            id: value,
                          },
                        ]);
                      }
                    }}
                    style={[
                      globalStyle.px1p2,
                      globalStyle.py1,
                      globalStyle.borderInput,
                      globalStyle.bgTextInput,
                      // globalStyle.borderRadius4,
                      globalStyle.br,
                      globalStyle.mb1p6,
                      selectedItems.find(val => value === val.name) &&
                        globalStyle.bgPurplePrimary,
                    ]}>
                    <TextComponent
                      secondary
                      style={[
                        selectedItems.find(val => value === val.name) &&
                          globalStyle.textWhite,
                      ]}>
                      {capialiseFirst(value ?? '')}
                    </TextComponent>
                  </PressableComponent>
                </Box>
              ))}
            </Box>
            <Box style={[globalStyle.py2p4, globalStyle.w10]}>
              <ButtonComponent
                disabled={selectedItems.length < min}
                title="Submit"
                onPress={addInterests}
                secondaryFilled
              />
            </Box>
          </Box>
        </LayoutWithSafeArea>
      )}
    </>
  );
};

export default ChooseInterests;
