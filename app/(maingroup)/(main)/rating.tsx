import React, {useState} from 'react';
import LayoutWithSafeAreaWithBg from '@/components/layout/LayoutWithSafeAreaWithBg';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import HeaderComponent from '@/components/header/Header';
import StarFilled from '@/assets/svgs/StarFilled.svg';
import StarEmpty from '@/assets/svgs/StarEmpty.svg';
import TextComponent from '@/components/text/TextComponent';
import {appName} from '@/constants/utils/constants';
import PressableComponent from '@/components/pressable/PressableComponent';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import SuccessComponent from '@/components/success/SuccessComponent';
import {router} from 'expo-router';
import useProfile from '@/service/profile';
import Loader from '@/components/loader/Loader';
const Rating = () => {
  const [curr, setCurr] = useState<number>(4);
  const [review, setReview] = useState('');
  const {useRateApp} = useProfile();
  const {isLoadingRateApp, rateAppMutation, isSuccess} = useRateApp();
  const reviewApp = () => {
    rateAppMutation({
      rating: curr + 1,
      review,
    });
  };
  return (
    <>
      {isSuccess ? (
        <SuccessComponent
          title="Review Received"
          desc="Thanks for your feedback! We are always working to give you the best experience on Kinnect"
          btnText="Back To Settings"
          btnOnPress={() => router.replace('profile')}
          secondBtnText="Go To Dashboard"
          secondBtnOnPress={() => router.replace('home')}
        />
      ) : isLoadingRateApp ? (
        <Loader />
      ) : (
        <LayoutWithSafeAreaWithBg>
          <Box flex={1} style={[globalStyle.px1p6]}>
            <HeaderComponent text="Ratings & Reviews" />
            <Box
              style={[
                globalStyle.mt3,
                globalStyle.borderRadius8,
                globalStyle.bgTextInput,
                globalStyle.borderInput,
                globalStyle.p0p8,
              ]}>
              <TextComponent style={[globalStyle.textCenter]}>
                Rate the {appName} app
              </TextComponent>

              <Box
                style={[
                  globalStyle.py1p6,
                  globalStyle.flexrow,
                  globalStyle.alignItemsCenter,
                  globalStyle.justifyCenter,
                ]}>
                {new Array(5).fill('a').map((_, idx) => (
                  <PressableComponent
                    onPress={() => setCurr(idx)}
                    style={[globalStyle.mr0p4]}
                    key={idx.toString()}>
                    <Animated.View
                      key={curr}
                      entering={FadeIn}
                      exiting={FadeOut}>
                      {curr !== null && curr >= idx ? (
                        <StarFilled />
                      ) : (
                        <StarEmpty />
                      )}
                    </Animated.View>
                  </PressableComponent>
                ))}
              </Box>
            </Box>
            <Box style={[globalStyle.pt3p6]}>
              <TextInputComponent
                value={review}
                onChangeText={setReview}
                placeholder="Write here"
                title="Write a Review"
                multiline
              />
            </Box>
            <Box style={[globalStyle.pt3p6]}>
              <ButtonComponent title="Submit" onPress={reviewApp} />
            </Box>
          </Box>
        </LayoutWithSafeAreaWithBg>
      )}
    </>
  );
};

export default Rating;
