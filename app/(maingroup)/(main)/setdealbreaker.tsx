import {ScrollView, StatusBar} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import HeaderComponent from '@/components/header/Header';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import TextComponent from '@/components/text/TextComponent';
import {router} from 'expo-router';
import {dealBreakerQuestions} from '@/constants/utils/constants';
import SlideInComponent from '@/components/uttility/SlideInComponent';
import DealBreakeritem from '@/components/uttility/DealBreakeritem';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import ButtonComponent from '@/components/button/ButtonComponent';
import {SafeAreaView} from 'moti';
import palette from '@/constants/colors/pallete';
import BottomSheetComponent from '@/components/bottomSheet/BottomSheetComponent';
import CloseIcon from '@/assets/svgs/closeIconWithBorder.svg';
import PressableComponent from '@/components/pressable/PressableComponent';
import useProfile from '@/service/profile';
import Loader from '@/components/loader/Loader';
import SuccessComponent from '@/components/success/SuccessComponent';
import {useQueryClient} from '@tanstack/react-query';

const SetDealBreaker = () => {
  const [step, setStep] = useState(1);
  const {useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  const userDealbreakers = profileData?.dealBreaker ?? {};
  const [isback, setIsBack] = useState(false);
  const maxStep = useMemo(() => 5, []);
  const queryClient = useQueryClient();
  const scrollRef = useRef<ScrollView>();
  const {useSetDealBreakers} = useProfile();
  const {isLoadingBreakers, setBreakersMutation} = useSetDealBreakers();
  const [showSuccess, setShowSuccess] = useState(false);

  const onBack = () => {
    setIsBack(true);
    if (step === 1) {
      router.back();
    } else {
      setStep(prev => (prev -= 1));
    }
    scrollToTop();
  };
  const [mappedDealBreaker, setMappedDealBreaker] =
    useState(dealBreakerQuestions);
  const extractOptions = (key: string, obj: Record<string, number>) => {
    if (key && obj) {
      const filterItem = dealBreakerQuestions.find(item => item.key === key);
      const optionArr = filterItem?.options;
      const mappedVal = optionArr?.map(val => {
        return {
          item: val.item,
          answer: obj?.[val.mainKey]?.toString(),
          mainKey: val.mainKey,
        };
      });
      return {
        options: mappedVal ?? [],
        key: filterItem?.key ?? '',
        question: filterItem?.question ?? '',
      };
    }
  };
  useEffect(() => {
    if (Object.keys(userDealbreakers)?.length > 0) {
      const mapped: any[] = Object.entries(userDealbreakers)
        ?.filter(([field]: any) => {
          return (
            field !== 'id' &&
            field !== 'version' &&
            field !== 'createdAt' &&
            field !== 'updatedAt'
          );
        })
        .map(([key, values]: any) => {
          const options = extractOptions(key, values);

          return options as any;
        });

      setMappedDealBreaker(mapped ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userDealbreakers?.bodyType,
    userDealbreakers?.complexion,
    userDealbreakers?.education,
    userDealbreakers?.preferredReligion,
    userDealbreakers?.smokingRate,
  ]);

  const returnKeys = (value: any[]) => {
    const mappedVals = value.map(item => {
      return {
        [item.mainKey]: Number(item?.answer ?? '0'),
      };
    });

    return Object.assign({}, ...mappedVals);
  };
  const payloadObject = useMemo(() => {
    const mainArr = mappedDealBreaker.map(item => {
      return {
        [item.key]: returnKeys(item.options),
      };
    });

    return Object.assign({}, ...mainArr);
  }, [mappedDealBreaker]);
  const onNext = () => {
    setIsBack(false);
    if (maxStep > step) {
      setStep(prev => (prev += 1));
    } else {
      setBreakersMutation(payloadObject, {
        onSuccess: () => {
          setShowSuccess(true);
          setMappedDealBreaker(dealBreakerQuestions);
        },
      });
    }
    scrollToTop();
  };
  const [showAnswermodal, setShowAnswermodal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollToTop = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollTo({
        y: 0,
      });
    }, 600);
  };
  const answerQuestion = (curr: number) => {
    const secondary = [...mappedDealBreaker];
    secondary[step - 1].options[currentIndex].answer = (curr + 1).toString();
    setMappedDealBreaker(secondary);
  };
  return (
    <>
      {isLoadingBreakers ? (
        <Loader isdark />
      ) : showSuccess ? (
        <SuccessComponent
          title="Deal Breakers Set"
          desc="You've successfully set your deal breakers! Your preferences will now be used to match you with like-minded individuals who share your values and interests."
          btnText="Find a match"
          btnOnPress={() => {
            setShowSuccess(false);

            queryClient.invalidateQueries({
              queryKey: ['user-matches', 'user-profile'],
            });
            router.replace('home');
          }}
        />
      ) : (
        <SafeAreaView
          style={[
            globalStyle.flexOne,
            globalStyle.bgPrimary,
            globalStyle.ptStatus,
            globalStyle.bgPurpleLayout,
          ]}>
          <StatusBar
            backgroundColor={palette.purpleLayout}
            barStyle={'light-content'}
          />
          <ScrollView
            ref={scrollRef as any}
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={[globalStyle.flexOne]}>
            <Box
              flex={1}
              style={[globalStyle.px2p4, globalStyle.py1p2, globalStyle.w10]}>
              <HeaderComponent
                text="Deal Breakers"
                transparent
                onBackPress={onBack}
              />
              <Box
                style={[
                  globalStyle.pt2p4,
                  globalStyle.pb1p2,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                ]}>
                <TextComponent gray style={[globalStyle.pb1p2]}>
                  {step} / {dealBreakerQuestions.length}
                </TextComponent>
                <SlideInComponent keyValue={step}>
                  <TextComponent
                    style={[
                      globalStyle.pb1p2,
                      globalStyle.textWhite,
                      globalStyle.fontSize18,
                      globalStyle.fontWeight500,
                    ]}>
                    {dealBreakerQuestions?.[step - 1]?.question}
                  </TextComponent>
                </SlideInComponent>
              </Box>
              <Animated.View
                key={step.toString()}
                entering={isback ? SlideInLeft : SlideInRight}
                exiting={isback ? SlideOutRight : SlideOutLeft}>
                {mappedDealBreaker?.[step - 1]?.options?.map(
                  ({item, answer}, idx) => (
                    <Box
                      style={[globalStyle.w10, globalStyle.pb1p2]}
                      key={idx.toString()}>
                      <DealBreakeritem
                        title={item}
                        onPress={() => {
                          setCurrentIndex(idx);
                          setShowAnswermodal(true);
                        }}
                        answer={answer}
                      />
                    </Box>
                  ),
                )}
              </Animated.View>
              <Box style={[globalStyle.py2p4]}>
                <ButtonComponent
                  title="Continue"
                  onPress={onNext}
                  // disabled={!answerArr[step - 1]}
                />
              </Box>
            </Box>
          </ScrollView>
        </SafeAreaView>
      )}
      <BottomSheetComponent
        purpleBg
        setShowBlur={setShowAnswermodal}
        showBlur={showAnswermodal}>
        <Box
          style={[
            globalStyle.w10,
            globalStyle.pb1p2,
            globalStyle.pt1p6,
            // globalStyle.bgPurpleLayout,
            // styles.maxHeight,
          ]}>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.justifyBetween,
              globalStyle.alignItemsCenter,
              globalStyle.px2p4,
            ]}>
            <Box>
              <TextComponent
                style={[
                  globalStyle.fontSize16,
                  globalStyle.fontWeight500,
                  globalStyle.fontGroteskMedium,
                  globalStyle.textWhite,
                ]}>
                Set rank
              </TextComponent>
            </Box>
            <PressableComponent onPress={() => setShowAnswermodal(false)}>
              <CloseIcon />
            </PressableComponent>
          </Box>
          <Box>
            {mappedDealBreaker.map((_, index) => (
              <PressableComponent
                onPress={() => {
                  answerQuestion(index);
                  setShowAnswermodal(false);
                }}
                key={index.toString()}
                style={[
                  globalStyle.w10,
                  globalStyle.flexrow,
                  globalStyle.alignItemsCenter,
                  globalStyle.px2p4,
                  globalStyle.py1p6,
                ]}>
                <Box>
                  <TextComponent
                    style={[globalStyle.fontWeight500, globalStyle.textWhite]}>
                    {index + 1}
                  </TextComponent>
                </Box>
              </PressableComponent>
            ))}
          </Box>
        </Box>
      </BottomSheetComponent>
    </>
  );
};

export default SetDealBreaker;
