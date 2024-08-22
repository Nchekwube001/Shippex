import React, {useEffect, useMemo, useState} from 'react';
import HeaderComponent from '@/components/header/Header';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import TextComponent from '@/components/text/TextComponent';
import {router} from 'expo-router';
import ButtonComponent from '@/components/button/ButtonComponent';
import {answerLists, personalityQuestions} from '@/constants/utils/constants';
import RadioComponent from '@/components/radio/RadioComponent';
import PressableComponent from '@/components/pressable/PressableComponent';
import Loader from '@/components/loader/Loader';
import SuccessComponent from '@/components/success/SuccessComponent';
import useProfile from '@/service/profile';
import ClapIcon from '@/assets/svgs/ClapIcon.svg';
import {useQueryClient} from '@tanstack/react-query';
import {useAppDispatch} from '@/constants/utils/hooks';
import {showToast} from '@/reducerSlices/toastSlice';

const TakePersonalityTest = () => {
  const queryClient = useQueryClient();
  const maxStep = useMemo(() => 15, []);
  const [answerArr, setAnswerArr] = useState<any[]>([]);
  const {useTakepersonalityTest, useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  const [showSuccess, setShowSuccess] = useState(false);
  const [testResult, setTestResult] = useState('');
  const userProfile = profileData?.user ?? {};
  const userPersonality = profileData?.personality ?? {};

  // console.log({
  //   userPersonality,
  // });

  const dispatch = useAppDispatch();
  const {isLoadingTaketest, takeTestMutation} = useTakepersonalityTest();
  const [step, setStep] = useState(1);
  const getPersonalityDetails = () => {
    const mappedPersonality = personalityQuestions.map(item => ({
      key: item.key,
    }));
    const keyArray = Object.keys(userPersonality)
      .filter(item => mappedPersonality.find(val => val.key === item))
      .map(item => ({
        desc: item,
        val: userPersonality?.[item] ?? 0,
        response: {
          key: item,
          value: userPersonality?.[item] ?? 0,
        },
      }));

    setAnswerArr(keyArray);
  };

  useEffect(() => {
    if (Object.keys(userPersonality)?.length > 0) {
      // console.log({
      //   userPersonality,
      // });

      getPersonalityDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPersonality]);

  useEffect(() => {
    if (step === 7) {
      dispatch(
        showToast({
          message: `Well done ${
            userProfile?.firstname ?? ''
          } Just a few questions to go!!`,
          icon: <ClapIcon />,
          status: 1,
        }),
      );
    }
  }, [dispatch, step, userProfile?.firstname]);

  const payloadObject = useMemo(() => {
    const res = {};
    answerArr
      .map(val => {
        const newVal = {...val};
        delete newVal.desc;
        delete newVal.val;

        return newVal?.response;
      })
      .forEach(({key, value}) => {
        // console.log({
        //   value,
        // });

        // return (res[key] = value);
        return Object.assign(res, {[key]: value});
      });

    return res;
  }, [answerArr]);

  const [isback, setIsBack] = useState(false);
  const onNext = () => {
    setIsBack(false);
    if (maxStep > step) {
      setStep(prev => (prev += 1));
    } else {
      takeTestMutation(payloadObject, {
        onSuccess: personalityRes => {
          setTestResult(
            personalityRes?.data?.data?.personality?.personalitySummary ?? '',
          );
          setShowSuccess(true);
        },
      });
    }
  };
  const onBack = () => {
    setIsBack(true);
    if (step === 1) {
      router.back();
    } else {
      setStep(prev => (prev -= 1));
    }
  };
  const onPress = (index: number, desc: string, val: number) => {
    const newArr = [...answerArr];
    const currentKey = personalityQuestions[index].key;
    newArr[index] = {
      desc,
      val,
      response: {
        key: currentKey,
        value: val,
      },
    };

    setAnswerArr(newArr);
  };

  return (
    <>
      {isLoadingTaketest ? (
        <Loader isdark />
      ) : showSuccess ? (
        <SuccessComponent
          title="Personality Test Completed"
          desc="Great job! Our algorithm will combine your test results with your deal breakers and interests to find your most compatible matches."
          additionalText={testResult}
          btnText="Continue"
          btnOnPress={() => {
            queryClient.invalidateQueries({
              queryKey: ['user-matches', 'user-profile'],
            });
            router.replace('home');
            setShowSuccess(false);
          }}
          secondBtnText="Chat with an  expert"
          secondBtnOnPress={() => {
            queryClient.invalidateQueries({
              queryKey: ['user-matches', 'user-profile'],
            });
            router.replace('home');
          }}
        />
      ) : (
        <LayoutWithSafeAreaWithoutScroll purpleBg>
          <Box flex={1} style={[globalStyle.px2p4, globalStyle.py1p2]}>
            <HeaderComponent
              text="Personality Test"
              transparent
              onBackPress={onBack}
            />
            <Box style={[globalStyle.pt2p4]} flex={1}>
              <TextComponent gray style={[globalStyle.pb1p2]}>
                Question {step} / {personalityQuestions.length}
              </TextComponent>
              <Animated.View
                key={step.toString()}
                entering={isback ? SlideInLeft : SlideInRight}
                exiting={isback ? SlideOutRight : SlideOutLeft}>
                {personalityQuestions.map(({question}, index) => (
                  <Box key={index.toString()}>
                    {index + 1 === step && (
                      <Box>
                        <TextComponent style={[globalStyle.textWhite]}>
                          {question}
                        </TextComponent>
                      </Box>
                    )}
                  </Box>
                ))}

                <Box style={[globalStyle.pt2p4]}>
                  {answerLists.map(({description, value}) => (
                    <PressableComponent
                      onPress={() => {
                        onPress(step - 1, description, value);
                        // setAnswer(
                        //   answer === value.toString() ? '' : value.toString(),
                        // );
                      }}
                      key={description}
                      style={[
                        globalStyle.flexrow,
                        globalStyle.mb1p6,
                        globalStyle.alignItemsCenter,
                      ]}>
                      <RadioComponent
                        enabled={answerArr?.[step - 1]?.val === value}
                        disabled
                      />
                      <TextComponent
                        style={[globalStyle.textWhite, globalStyle.pl0p8]}>
                        {description}
                      </TextComponent>
                    </PressableComponent>
                  ))}
                </Box>
              </Animated.View>
            </Box>
            <Box>
              <ButtonComponent
                title="Continue"
                onPress={onNext}
                disabled={!answerArr[step - 1]}
              />
            </Box>
          </Box>
        </LayoutWithSafeAreaWithoutScroll>
      )}
    </>
  );
};

export default TakePersonalityTest;
