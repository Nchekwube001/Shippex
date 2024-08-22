import React, {useRef, useState} from 'react';
import LayoutWithSafeAreaWithBg from '@/components/layout/LayoutWithSafeAreaWithBg';
import Box from '@/components/layout/Box';
import HeaderComponent from '@/components/header/Header';
import globalStyle from '@/globalStyle/globalStyle';
import PressableComponent from '@/components/pressable/PressableComponent';
import {ImageBackground} from 'react-native';
import TextComponent from '@/components/text/TextComponent';
import ArrowProfile from '@/assets/svgs/ArrowProfile.svg';
import useProfile from '@/service/profile';
import {capialiseFirst, numberWithCommas} from '@/constants/utils/utils';
import premiumBg from '@/assets/images/premiumBg.png';
import premium2Bg from '@/assets/images/premium2Bg.png';
import standardBg from '@/assets/images/standardBg.png';
import Loader from '@/components/loader/Loader';
import PaystackComponent from '@/components/Paystack/paystack';
import {router} from 'expo-router';
import SuccessComponent from '@/components/success/SuccessComponent';
import {useQueryClient} from '@tanstack/react-query';
const PAYSTACK_SECRET_KEY = 'pk_test_678c607da781953e7710aa5b7e86a234e941bdd8';
const Subscriptions = () => {
  const {useGetSubsciptionList, useEnrollSubscriotion, useGetProfile} =
    useProfile();
  const {profileData} = useGetProfile();
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const userProfile = profileData?.user ?? {};
  const {subscriptionData, isLoading} = useGetSubsciptionList();
  const paystackWebViewRef = useRef<any>();
  // currentSubId;
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    reference: '',
    amount: 0,
  });
  const {enrollSubscriptionMutation, isLoadingEnrollSubscription} =
    useEnrollSubscriotion();

  const enrollToSub = (subId: string) => {
    enrollSubscriptionMutation(
      {
        subId,
      },
      {
        onSuccess: enrollRes => {
          const transDetails = enrollRes?.data?.data?.transaction;
          console.log({
            transDetails,
          });

          setSubscriptionDetails({
            amount: transDetails?.amount ?? 0,
            reference: transDetails?.reference ?? '',
          });
          if (transDetails?.amount) {
            paystackWebViewRef?.current?.startTransaction();
          } else {
            setSuccess(true);
          }

          // console.log({
          //   enrollRes: enrollRes?.data?.data,
          // });
        },
        // onError: enrollErr => {
        //   console.log({
        //     enrollErr,
        //   });
        // },
      },
    );
  };
  return (
    <>
      {isLoadingEnrollSubscription || isLoading ? (
        <Loader />
      ) : success ? (
        <SuccessComponent
          title="Subscription Successful"
          desc="Great job! We will update your subscription details soon."
          btnText="Continue"
          btnOnPress={() => {
            queryClient.invalidateQueries({
              queryKey: ['user-profile'],
            });
            router.replace('home');
            setSuccess(false);
          }}
        />
      ) : (
        <LayoutWithSafeAreaWithBg transparent usePattern>
          <Box style={[globalStyle.px2p4]}>
            <HeaderComponent text="Subscriptions" />
            <Box style={[globalStyle.pt2p4]}>
              {subscriptionData.map(({id, name, price, perks, description}) => (
                <PressableComponent
                  disabled={id === userProfile?.currentSubId}
                  onPress={() => {
                    if (id) {
                      enrollToSub(id);
                    }
                    // id;
                  }}
                  style={[globalStyle.mb1p6]}
                  key={name}>
                  {name !== 'FREEMIUM' ? (
                    <Box
                      style={[
                        globalStyle.borderRadius8,
                        globalStyle.overflowHidden,
                      ]}>
                      <ImageBackground
                        source={
                          name === 'VIP'
                            ? premiumBg
                            : name === 'PREMIUM'
                            ? premium2Bg
                            : standardBg
                        }>
                        <Box style={[globalStyle.py1p6, globalStyle.px1p2]}>
                          <Box
                            style={[
                              globalStyle.flexrow,
                              globalStyle.alignItemsCenter,
                              globalStyle.justifyBetween,
                            ]}>
                            <TextComponent
                              style={[
                                globalStyle.fontSize16,
                                globalStyle.fontMatterSemiBold,
                                globalStyle.fontWeight600,
                                globalStyle.textWhite,
                              ]}>
                              {capialiseFirst(name)}
                            </TextComponent>
                            {id === userProfile?.currentSubId && (
                              <TextComponent
                                primary
                                style={[
                                  globalStyle.fontMatterSemiBold,
                                  globalStyle.fontWeight500,
                                ]}>
                                • Current Plan
                              </TextComponent>
                            )}
                          </Box>
                          <Box style={[globalStyle.pt1]}>
                            {perks?.map((txt: any, idx: number) => (
                              <Box
                                key={idx.toString()}
                                style={[globalStyle.pb0p8]}>
                                <TextComponent
                                  style={[
                                    globalStyle.fontMatterLight,
                                    globalStyle.textGray2,
                                    globalStyle.fontSize13,
                                  ]}>
                                  •&nbsp;{txt}
                                </TextComponent>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                        <Box
                          style={[
                            globalStyle.py0p4,
                            globalStyle.borBtm10,
                            globalStyle.borTop10,
                            globalStyle.px1p2,
                            globalStyle.mb0p8,
                          ]}>
                          <TextComponent
                            style={[
                              globalStyle.fontSize20,
                              globalStyle.fontMatterSemiBold,
                              globalStyle.fontWeight600,
                              globalStyle.textWhite,
                            ]}>
                            {numberWithCommas(price ?? '')}
                            <TextComponent
                              style={[
                                globalStyle.textWhite,
                                globalStyle.fontMatterLight,
                              ]}>
                              &nbsp;/ month
                            </TextComponent>
                          </TextComponent>
                        </Box>
                        {id !== userProfile?.currentSubId && (
                          <Box style={[globalStyle.px1p2, globalStyle.py1p2]}>
                            <Box
                              style={[
                                globalStyle.w10,
                                globalStyle.bgWhite,
                                globalStyle.justifyCenter,
                                globalStyle.alignItemsCenter,
                                globalStyle.br,
                                globalStyle.py1,
                                globalStyle.flexrow,
                              ]}>
                              <TextComponent
                                secondary
                                style={[
                                  globalStyle.fontSize13,
                                  globalStyle.fontMatterSemiBold,
                                  globalStyle.fontWeight500,
                                ]}>
                                Get Started
                              </TextComponent>
                              <Box style={[globalStyle.pl0p6]}>
                                <ArrowProfile />
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </ImageBackground>
                    </Box>
                  ) : (
                    <Box
                      style={[
                        globalStyle.borderRadius8,
                        globalStyle.borderInput,
                        globalStyle.bgTextInput,
                        globalStyle.py1p6,
                        globalStyle.px1p2,
                      ]}>
                      <Box
                        style={[
                          globalStyle.flexrow,
                          globalStyle.alignItemsCenter,
                          globalStyle.justifyBetween,
                        ]}>
                        <TextComponent
                          style={[
                            globalStyle.fontSize16,
                            globalStyle.fontMatterSemiBold,
                            globalStyle.fontWeight600,
                          ]}>
                          {name}
                        </TextComponent>
                      </Box>
                      <TextComponent
                        gray
                        style={[
                          globalStyle.pt1p2,
                          //   globalStyle.fontMatterSemiBold,
                          globalStyle.fontSize12,
                        ]}>
                        {description}
                      </TextComponent>
                      {id !== userProfile?.currentSubId && (
                        <Box style={[globalStyle.px1p2, globalStyle.pt1p2]}>
                          <Box
                            style={[
                              globalStyle.w10,
                              globalStyle.bgWhite,
                              globalStyle.justifyCenter,
                              globalStyle.alignItemsCenter,
                              globalStyle.br,
                              globalStyle.py1,
                              globalStyle.flexrow,
                            ]}>
                            <TextComponent
                              secondary
                              style={[
                                globalStyle.fontSize13,
                                globalStyle.fontMatterSemiBold,
                                globalStyle.fontWeight500,
                              ]}>
                              Get Started
                            </TextComponent>
                            <Box style={[globalStyle.pl0p6]}>
                              <ArrowProfile />
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                </PressableComponent>
              ))}
            </Box>
          </Box>
        </LayoutWithSafeAreaWithBg>
      )}
      <PaystackComponent
        amount={subscriptionDetails.amount * 100}
        paystackKey={PAYSTACK_SECRET_KEY}
        billingEmail={userProfile?.email ?? ''}
        // activityIndicatorColor={palette.pr}
        onCancel={e => {
          if (e) {
          }
        }}
        onSuccess={() => {
          paystackWebViewRef.current?.endTransaction();
          setSuccess(true);
        }}
        ref={paystackWebViewRef as any}
        refNumber={subscriptionDetails.reference}
        metadata={{}}
      />
    </>
  );
};
export default Subscriptions;
