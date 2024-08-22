import ProfileUpdateIcon from '@/assets/svgs/ProfileUpdateIcon.svg';
import React, {useMemo, useState} from 'react';
import LayoutWithSafeAreaWithBgWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithBgWithoutScroll';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import ButtonComponent from '@/components/button/ButtonComponent';
import {router} from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import HeaderComponent from '@/components/header/Header';
import {ScaledSheet} from 'react-native-size-matters';
import TextComponent from '@/components/text/TextComponent';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import SelectComponent from '@/components/select/SelectComponent';
import PressableComponent from '@/components/pressable/PressableComponent';
import PhotoIconBg from '@/assets/svgs/PhotoIconBg.svg';
import PlusIconPrimary from '@/assets/svgs/PlusIconPrimary.svg';
import ArrowProfile from '@/assets/svgs/ArrowProfile.svg';
import DeleteImage from '@/assets/svgs/DeleteImage.svg';
import {dealBreakerQuestions, drinkOptions} from '@/constants/utils/constants';
import BottomSheetComponent from '@/components/bottomSheet/BottomSheetComponent';
import {showToast} from '@/reducerSlices/toastSlice';
import {
  useAppDispatch,
  useDebouncedValue,
  useProfileProgress,
} from '@/constants/utils/hooks';
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
  ImagePickerOptions,
  ImagePickerAsset,
} from 'expo-image-picker';
import {FlatList, Image} from 'react-native';
import SuccessComponent from '@/components/success/SuccessComponent';
import ModalHeaderRow from '@/components/uttility/ModalHeaderRow';
import useProfile from '@/service/profile';
import Loader from '@/components/loader/Loader';
import {Controller, useForm} from 'react-hook-form';
import countryList, {countryListInterface} from '@/constants/countryList';
import SearchInputComponent from '@/components/textInputs/SearchInputComponent';
import LayoutWithSafeAreaWithoutScroll from '@/components/layout/LayoutWithSafeAreaWithoutScroll';
import SlideUpComponent from '@/components/layout/SlideUpComponent';
import {useQueryClient} from '@tanstack/react-query';
import {createFile, getCurrentValue} from '@/constants/utils/utils';
import TitleDescBox from '@/components/uttility/TitleDescBox';
import useAuth from '@/service/auth';
const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const noOfImages = 5;
  const {useUpdateProfile, useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  const userProfile = profileData?.user ?? {};
  const {useFileUploadMutation} = useAuth();
  const {isLoadingUplaodFile, uploadFileMutation} = useFileUploadMutation();
  // console.log({
  //   userProfile: userProfile?.dealBreakerId,
  // });
  const onDelete = () => {
    const filt = fileList.filter(file => file.uri !== currentFiile?.uri);
    setFileList(filt);
    setCurrent(0);
    setCurrentFiile(fileList?.[0] ?? undefined);
  };
  const {isLoadingUpdateprofile, updateProfileMutation} = useUpdateProfile();
  const [fileList, setFileList] = useState<ImagePickerAsset[]>([]);
  const [current, setCurrent] = useState(0);
  const [currentFiile, setCurrentFiile] = useState<
    ImagePickerAsset | undefined
  >(undefined);
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();

  const filterCountry = (country: string) => {
    if (!country) {
      return {
        name: '',
        iso3: '',
      };
    } else
      return countryList.find(
        item => item.name === country,
      ) as countryListInterface;
  };
  const [currentCountry, setCurrentCountry] = useState<countryListInterface>(
    filterCountry(userProfile?.country),
  );
  const stateList = useMemo(
    () =>
      countryList.find(item => item.name === currentCountry.name)?.states ?? [],
    [currentCountry],
  );
  const [stateSearch, setStateSearch] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const debouncedStateSearch = useDebouncedValue(stateSearch);
  const {percentalue} = useProfileProgress();
  const filteredStateList = useMemo(() => {
    if (debouncedStateSearch === '') {
      return stateList;
    } else {
      let filtered = stateList?.filter(item => {
        return item.name
          .toLowerCase()
          .includes(debouncedStateSearch.toLowerCase());
      });

      return filtered;
    }
  }, [debouncedStateSearch, stateList]);
  const debouncedCountrySearch = useDebouncedValue(countrySearch);
  const filteredCountryList = useMemo(() => {
    if (debouncedCountrySearch === '') {
      return countryList;
    } else {
      let filtered = countryList?.filter(item => {
        return item.name
          .toLowerCase()
          .includes(debouncedCountrySearch.toLowerCase());
      });

      return filtered;
    }
  }, [debouncedCountrySearch]);
  const [state, setState] = useState(userProfile?.state ?? '');
  const [stateModal, setStateModal] = useState(false);
  const [countryModal, setCountryModal] = useState(false);
  const {
    control,
    formState: {errors},
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      bio: (userProfile?.bio ?? '') as string,
      address: (userProfile?.address ?? '') as string,
      city: (userProfile?.city ?? '') as string,
    },
  });
  const watchBio = watch('bio');
  const watchAddress = watch('address');

  const [religion, setReligion] = useState(
    getCurrentValue(0, userProfile?.religion),
  );
  const [education, setEducation] = useState(
    getCurrentValue(1, userProfile?.education),
  );
  const [bodyType, setBodyType] = useState(
    getCurrentValue(4, userProfile?.bodyType),
  );
  const [complexion, setComplexion] = useState(
    getCurrentValue(3, userProfile?.complexion),
  );
  const [smoker, setSmoker] = useState(
    getCurrentValue(2, userProfile?.smokeRate),
  );
  const [drinker, setDrinker] = useState(
    getCurrentValue(0, userProfile?.drinkRate, true),
  );
  const [valueIndex, setValueIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const expoPickerOption: ImagePickerOptions = {
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: true,
    selectionLimit: noOfImages - fileList.length,
  };

  async function onPressImageLibrary() {
    let path = await launchImageLibraryAsync(expoPickerOption);
    setModal(false);
    if (!path?.canceled) {
      setFileList(prev => [...prev, ...((path?.assets as any) ?? [])]);
    }
  }
  async function onPressCamera() {
    try {
      let path = await launchCameraAsync(expoPickerOption);
      // console.log({
      //   path,
      // });

      setModal(false);
      if (!path?.canceled) {
        setFileList(prev => [...prev, ...((path?.assets as any) ?? [])]);
      }
    } catch (err) {
      setModal(false);
      dispatch(
        showToast({
          message: 'Camera is currently unavailable',
          status: 2,
        }),
      );
    }
  }
  const [modal, setModal] = useState(false);
  const noOfSteps = useMemo(() => 4, []);

  const getImageUrl = async (fileLink: ImagePickerAsset) => {
    const file = createFile({
      base64: fileLink?.base64 ?? '',
      filename: fileLink?.fileName ?? '',
      path: fileLink?.uri ?? '',
      type: fileLink?.type ?? '',
    });
    const image = await uploadFileMutation(file);
    return image?.data?.data?.url;
  };
  const onNext = async (data: any) => {
    if (step !== noOfSteps) {
      setStep(prev => (prev += 1));
    } else {
      const images = await Promise.all(
        fileList.map(async fileInstance => {
          return await getImageUrl(fileInstance);
        }),
      );
      if (images) {
        updateProfileMutation(
          {
            address: watchAddress,
            bio: watchBio,
            bodyType: bodyType?.mainKey ?? '',
            city: data?.city ?? '',
            complexion: complexion?.mainKey ?? '',
            drinkRate: drinker?.mainKey,
            education: education?.mainKey ?? '',
            religion: religion?.mainKey ?? '',
            smokeRate: smoker?.mainKey ?? '',
            country: currentCountry.name ?? '',
            state,
            profilePhotos: images,
            //       // profilePhotos: ['...', '...'],
          },
          {
            onSuccess: () => {
              setSuccess(true);
            },
          },
        );
      }
      // .then(promiseResponse => {
      //   console.log({
      //     promiseResponse,
      //   });

      //   updateProfileMutation(
      //     {
      //       address: watchAddress,
      //       bio: watchBio,
      //       bodyType: bodyType?.mainKey ?? '',
      //       city: data?.city ?? '',
      //       complexion: complexion?.mainKey ?? '',
      //       drinkRate: drinker?.mainKey,
      //       education: education?.mainKey ?? '',
      //       religion: religion?.mainKey ?? '',
      //       smokeRate: smoker?.mainKey ?? '',
      //       country: currentCountry.name ?? '',
      //       state,
      //       profilePhotos,
      //       // profilePhotos: ['...', '...'],
      //     },
      //     {
      //       onSuccess: () => {
      //         setSuccess(true);
      //       },
      //     },
      //   );
      // });
      // setSuccess(true);
    }
  };
  const onBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(prev => (prev -= 1));
    }
  };
  // console.log({
  //   fileList,
  // });

  return (
    <>
      {success ? (
        <SuccessComponent
          title="Profile Completed"
          desc="Congratulations! Your profile is now complete! This is a crucial step in our matching process."
          btnOnPress={() => {
            queryClient.invalidateQueries({
              queryKey: ['user-matches', 'user-profile'],
            });
            router.replace('home');
          }}
          btnText="Find a Match"
          supportingComponent={
            <>
              {!userProfile?.dealBreakerId && (
                <Box
                  style={[
                    globalStyle.mt2p4,
                    globalStyle.borderRadius8,
                    globalStyle.bgPurpleLayout,
                    globalStyle.py2,
                    globalStyle.px1p6,
                  ]}>
                  <Box style={[globalStyle.mb1p6]}>
                    <TextComponent
                      style={[
                        globalStyle.fontSize12,
                        globalStyle.fontMatterLight,
                        globalStyle.fontWeight500,
                        globalStyle.textCenter,
                        globalStyle.pb1,
                        globalStyle.textGray2,
                      ]}>
                      Profile Strength
                    </TextComponent>
                    <TextComponent
                      style={[
                        globalStyle.fontSize18,
                        globalStyle.fontMatterBold,
                        globalStyle.fontWeight500,
                        globalStyle.textWhite,
                        globalStyle.textCenter,
                      ]}>
                      {percentalue}% Completed
                    </TextComponent>
                  </Box>
                  <PressableComponent
                    onPress={() => router.replace('/dealbreaker')}
                    style={[
                      globalStyle.w10,
                      globalStyle.bgWhite,
                      globalStyle.justifyCenter,
                      globalStyle.alignItemsCenter,
                      globalStyle.br,
                      globalStyle.py1p6,
                      globalStyle.flexrow,
                    ]}>
                    <TextComponent
                      secondary
                      style={[
                        globalStyle.fontSize13,
                        globalStyle.fontMatterSemiBold,
                        globalStyle.fontWeight500,
                      ]}>
                      Select Deal Breakers
                    </TextComponent>
                    <Box style={[globalStyle.pl0p6]}>
                      <ArrowProfile />
                    </Box>
                  </PressableComponent>
                </Box>
              )}
            </>
          }
        />
      ) : isLoadingUpdateprofile || isLoadingUplaodFile ? (
        <Loader />
      ) : (
        <>
          {step === 1 && (
            <LayoutWithSafeAreaWithBgWithoutScroll>
              <Box flex={1} style={[globalStyle.px2]}>
                <Box flex={1}>
                  <ProfileUpdateIcon />
                </Box>
                <Box>
                  <TitleDescBox
                    bigText
                    isCenter
                    title="Help us find your perfect match!"
                    desc={
                      'Complete your profile and let us connect you with someone who truly gets you.'
                    }
                  />
                </Box>
                <Box style={[globalStyle.pb3, globalStyle.pt2p4]}>
                  <ButtonComponent
                    title="Get Started"
                    onPress={() => setStep(2)}
                  />

                  <Box style={[globalStyle.pt2]}>
                    <ButtonComponent
                      onPress={router.back}
                      title="Back"
                      secondary
                    />
                  </Box>
                </Box>
              </Box>
            </LayoutWithSafeAreaWithBgWithoutScroll>
          )}
          {step > 1 && (
            <>
              <LayoutWithSafeArea>
                <Box style={[globalStyle.px2]}>
                  <HeaderComponent text="" useGray onBackPress={onBack} />
                  <Box style={[globalStyle.pt1p6]}>
                    <Animated.View
                      entering={FadeIn}
                      exiting={FadeOut}
                      key={step}>
                      <TextComponent
                        secondary
                        style={[
                          globalStyle.fontWeight600,
                          globalStyle.fontMatterSemiBold,
                          globalStyle.fontSize22,
                        ]}>
                        {step === 2 && 'Personal Details'}
                        {step === 3 && 'Location'}
                        {step === 4 && 'Profile Photo (s)'}
                      </TextComponent>
                    </Animated.View>
                  </Box>
                  <Box style={[globalStyle.pt1p6, globalStyle.flexrow]}>
                    {new Array(noOfSteps - 1).fill('#').map((_, index) => (
                      <Box
                        key={index.toString()}
                        flex={1}
                        style={[
                          index !== noOfSteps - 1 && globalStyle.mr1,
                          completeStyle.indictorHeigh,
                          globalStyle.bgPrimary20,
                          index + 2 <= step && globalStyle.bgPurplePrimary,
                          globalStyle.br,
                        ]}
                      />
                    ))}
                  </Box>

                  <Box style={[globalStyle.pt2p4]}>
                    <Animated.View
                      entering={SlideInRight}
                      exiting={SlideOutLeft}
                      key={step}>
                      {step === 2 && (
                        <>
                          <Controller
                            control={control}
                            name="bio"
                            rules={{
                              required: {
                                value: true,
                                message: 'Bio is required',
                              },
                            }}
                            render={({field: {onBlur, onChange, value}}) => (
                              <TextInputComponent
                                //   editable={!(isLoadingAirtime || isLoadingTransReq)}
                                title="Bio"
                                placeholder="Write here"
                                multiline
                                errorText={errors?.bio?.message}
                                onChangeText={onChange}
                                value={value}
                                onBlur={onBlur}
                              />
                            )}
                          />
                          <Box style={[globalStyle.pt2]}>
                            <SelectComponent
                              label="Religion"
                              placeholder="-- select option --"
                              onPress={() => {
                                setValueIndex(0);
                                setShowModal(true);
                              }}
                              value={religion?.item ?? ''}
                            />
                          </Box>
                          <Box style={[globalStyle.pt2]}>
                            <SelectComponent
                              label="Education"
                              placeholder="-- select option --"
                              onPress={() => {
                                setValueIndex(1);
                                setShowModal(true);
                              }}
                              value={education?.item ?? ''}
                            />
                          </Box>
                          <Box style={[globalStyle.pt2]}>
                            <SelectComponent
                              label="Your Body Type"
                              placeholder="-- select option --"
                              onPress={() => {
                                setValueIndex(4);
                                setShowModal(true);
                              }}
                              value={bodyType?.item ?? ''}
                            />
                          </Box>
                          <Box style={[globalStyle.pt2]}>
                            <SelectComponent
                              label="Your Complexion"
                              placeholder="-- select option --"
                              onPress={() => {
                                setValueIndex(3);
                                setShowModal(true);
                              }}
                              value={complexion?.item ?? ''}
                            />
                          </Box>
                          <Box style={[globalStyle.pt2]}>
                            <SelectComponent
                              label="Are you a smoker"
                              placeholder="-- select option --"
                              onPress={() => {
                                setValueIndex(2);
                                setShowModal(true);
                              }}
                              value={smoker?.item ?? ''}
                            />
                          </Box>
                          <Box style={[globalStyle.pt2]}>
                            <SelectComponent
                              label="Are you a drinker"
                              placeholder="-- select option --"
                              onPress={() => {
                                setValueIndex(5);
                                setShowModal(true);
                              }}
                              value={drinker?.item ?? ''}
                            />
                          </Box>
                        </>
                      )}
                      {step === 3 && (
                        <>
                          <Controller
                            control={control}
                            name="address"
                            // rules={{
                            //   required: {
                            //     value: true,
                            //     message: 'First name is required',
                            //   },
                            // }}
                            render={({field: {onBlur, onChange, value}}) => (
                              <TextInputComponent
                                //   editable={!(isLoadingAirtime || isLoadingTransReq)}
                                title="House Address"
                                placeholder="Write here"
                                multiline
                                errorText={errors?.address?.message}
                                onChangeText={onChange}
                                value={value}
                                onBlur={onBlur}
                              />
                            )}
                          />
                          {/* <TextInputComponent
                            title="House Address"
                            placeholder="Write here"
                            multiline
                          /> */}
                          <Box style={[globalStyle.pt2]}>
                            <Controller
                              control={control}
                              name="city"
                              // rules={{
                              //   required: {
                              //     value: true,
                              //     message: 'First name is required',
                              //   },
                              // }}
                              render={({field: {onBlur, onChange, value}}) => (
                                <TextInputComponent
                                  //   editable={!(isLoadingAirtime || isLoadingTransReq)}
                                  title="City"
                                  placeholder="Enter city"
                                  multiline
                                  errorText={errors?.city?.message}
                                  onChangeText={onChange}
                                  value={value}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                            {/* <TextInputComponent
                              title="City"
                              placeholder="Enter city"
                            /> */}
                          </Box>
                          <Box style={[globalStyle.pt2]}>
                            <SelectComponent
                              label="Country"
                              placeholder="-- select option --"
                              onPress={() => {
                                setCountryModal(true);
                              }}
                              value={currentCountry?.name}
                            />
                          </Box>
                          <Box style={[globalStyle.pt2]}>
                            <SelectComponent
                              label="State"
                              placeholder="-- select option --"
                              onPress={() => {
                                setStateModal(true);
                              }}
                              value={state}
                              disabled={!currentCountry?.iso3}
                            />
                          </Box>
                        </>
                      )}
                      {step === 4 && (
                        <>
                          <Box
                            style={[
                              globalStyle.w10,
                              globalStyle.py1,
                              globalStyle.justifyCenter,
                              globalStyle.alignItemsCenter,
                              globalStyle.bgBanner,
                              globalStyle.mb1p2,
                            ]}>
                            <TextComponent secondary>
                              You can upload a maximum of {noOfImages} photos
                            </TextComponent>
                          </Box>
                          <PressableComponent
                            onPress={() => setModal(true)}
                            disabled={fileList.length > 0}
                            style={[
                              completeStyle.imageBox,
                              globalStyle.w10,
                              globalStyle.borderRadius6,
                              globalStyle.borderInput,
                              globalStyle.bgTextInput,
                              globalStyle.borderDashed,
                              globalStyle.justifyCenter,
                              globalStyle.alignItemsCenter,
                            ]}>
                            {fileList.length === 0 && (
                              <>
                                <PhotoIconBg />
                                <TextComponent
                                  primary
                                  style={[
                                    globalStyle.pt1,
                                    globalStyle.underline,
                                  ]}>
                                  Click to add photo (s)
                                </TextComponent>
                              </>
                            )}
                            {fileList.length > 0 && (
                              <Animated.View
                                entering={FadeIn}
                                exiting={FadeOut}
                                style={[
                                  globalStyle.w10,
                                  completeStyle.imageBox,
                                  globalStyle.bgBlack,
                                  globalStyle.borderRadius6,
                                ]}
                                key={current}>
                                <Box
                                  zIndex={5}
                                  position={'absolute'}
                                  right={20}
                                  top={10}>
                                  <PressableComponent onPress={onDelete}>
                                    <DeleteImage />
                                  </PressableComponent>
                                </Box>
                                <Image
                                  style={[
                                    globalStyle.w10,
                                    globalStyle.borderRadius6,

                                    completeStyle.imageBox,
                                  ]}
                                  source={{
                                    uri: fileList[current].uri,
                                  }}
                                />
                              </Animated.View>
                            )}
                          </PressableComponent>
                          <Box
                            style={[
                              globalStyle.pt1p2,
                              globalStyle.flexrow,
                              globalStyle.alignItemsCenter,
                              globalStyle.flexwrap,
                              // globalStyle.justifyBetween,
                            ]}>
                            {fileList.map((file, index) => (
                              <Box
                                key={index.toString()}
                                style={[
                                  globalStyle.w2,
                                  globalStyle.justifyCenter,
                                  globalStyle.alignItemsCenter,
                                  index < 5 && globalStyle.mb1p2,
                                ]}>
                                <Box
                                  style={[
                                    completeStyle.smallImg,
                                    globalStyle.borderRadius6,
                                    globalStyle.justifyCenter,
                                    globalStyle.alignItemsCenter,
                                    globalStyle.bgTextInput,
                                    current === index &&
                                      globalStyle.borderPrimary,
                                    globalStyle.borderDashed,
                                    // current === index && globalStyle.p1,
                                  ]}>
                                  <PressableComponent
                                    style={[]}
                                    onPress={() => {
                                      setCurrent(index);
                                      setCurrentFiile(file);
                                    }}>
                                    <Image
                                      source={{uri: file.uri}}
                                      style={[
                                        completeStyle.smallImg,

                                        globalStyle.borderRadius6,
                                        current === index &&
                                          completeStyle.smallerImg,
                                      ]}
                                    />
                                  </PressableComponent>
                                </Box>
                              </Box>
                            ))}
                            {fileList.length < noOfImages &&
                              fileList.length > 0 && (
                                <Box
                                  style={[
                                    globalStyle.w2,
                                    globalStyle.justifyCenter,
                                    globalStyle.alignItemsCenter,
                                    fileList.length < 5 && globalStyle.mb1p2,
                                  ]}>
                                  <PressableComponent
                                    style={[
                                      completeStyle.smallImg,
                                      globalStyle.borderRadius6,
                                      globalStyle.justifyCenter,
                                      globalStyle.alignItemsCenter,
                                      globalStyle.bgTextInput,
                                      globalStyle.borderDashed,
                                      globalStyle.borderInput,
                                    ]}
                                    onPress={() => setModal(true)}>
                                    <PlusIconPrimary width={15} height={15} />
                                    <TextComponent
                                      secondary
                                      style={[
                                        // globalStyle.fontWeight500,
                                        globalStyle.fontMatterSemiBold,
                                        globalStyle.pt0p4,
                                      ]}>
                                      Add
                                    </TextComponent>
                                  </PressableComponent>
                                </Box>
                              )}
                          </Box>
                        </>
                      )}

                      <Box style={[globalStyle.py2]}>
                        <ButtonComponent
                          title="Continue"
                          onPress={handleSubmit(onNext)}
                          disabled={
                            (step === 2 &&
                              (!religion?.item ||
                                !education?.item ||
                                !bodyType?.item ||
                                !complexion?.item ||
                                !smoker?.item ||
                                !drinker?.item)) ||
                            (step === 3 && (!currentCountry.iso3 || !state)) ||
                            (step === 4 && fileList.length < 1)
                          }
                        />
                      </Box>
                    </Animated.View>
                  </Box>
                </Box>
              </LayoutWithSafeArea>
            </>
          )}
        </>
      )}

      {/* <BottomSheetComponent
        avoidKeyboard={false}
        showHandle={false}
        showAvoiding
        setShowBlur={setCountryModal}
        showBlur={countryModal}>
      
      </BottomSheetComponent> */}
      {countryModal && (
        <SlideUpComponent>
          <LayoutWithSafeAreaWithoutScroll noTouchable showAvoiding={false}>
            <Box flex={1} style={[globalStyle.w10, globalStyle.pt1p6]}>
              <ModalHeaderRow
                title="Select Country"
                onPress={() => setCountryModal(false)}
              />
              <Box style={[globalStyle.py1p6, globalStyle.px1p6]}>
                <SearchInputComponent
                  placeholder="Enter country name"
                  value={countrySearch}
                  onChangeText={setCountrySearch}
                />
              </Box>
              <Box flex={1}>
                <FlatList
                  // style={[globalStyle.flexOne]}
                  showsVerticalScrollIndicator={false}
                  // contentContainerStyle={[globalStyle.px1p6] as any}
                  data={filteredCountryList}
                  renderItem={({index, item: {name, iso3}}) => (
                    <PressableComponent
                      onPress={() => {
                        setCurrentCountry({
                          iso3,
                          name,
                        });
                        setCountryModal(false);
                      }}
                      key={index.toString() + iso3}
                      style={[
                        globalStyle.w10,
                        globalStyle.flexrow,
                        globalStyle.alignItemsCenter,
                        globalStyle.px2p4,
                        globalStyle.py1p6,
                      ]}>
                      <Box>
                        <TextComponent style={[globalStyle.fontWeight500]}>
                          {name}
                        </TextComponent>
                      </Box>
                    </PressableComponent>
                  )}
                />
              </Box>
            </Box>
          </LayoutWithSafeAreaWithoutScroll>
        </SlideUpComponent>
      )}
      {stateModal && (
        <SlideUpComponent>
          <LayoutWithSafeAreaWithoutScroll noTouchable showAvoiding={false}>
            <Box flex={1} style={[globalStyle.w10, globalStyle.pt1p6]}>
              <ModalHeaderRow
                title="Select State"
                onPress={() => setStateModal(false)}
              />
              <Box style={[globalStyle.py1p6, globalStyle.px1p6]}>
                <SearchInputComponent
                  placeholder="Enter state name"
                  value={stateSearch}
                  onChangeText={setStateSearch}
                />
              </Box>
              <Box flex={1}>
                <FlatList
                  // style={[globalStyle.flexOne]}
                  showsVerticalScrollIndicator={false}
                  // contentContainerStyle={[globalStyle.px1p6] as any}
                  data={
                    filteredStateList as {
                      name: string;
                      state_code: null;
                    }[]
                  }
                  renderItem={({index, item: {name, state_code}}) => (
                    <PressableComponent
                      onPress={() => {
                        setState(name);
                        setStateModal(false);
                      }}
                      key={index.toString() + state_code}
                      style={[
                        globalStyle.w10,
                        globalStyle.flexrow,
                        globalStyle.alignItemsCenter,
                        globalStyle.px2p4,
                        globalStyle.py1p6,
                      ]}>
                      <Box>
                        <TextComponent style={[globalStyle.fontWeight500]}>
                          {name}
                        </TextComponent>
                      </Box>
                    </PressableComponent>
                  )}
                />
              </Box>
            </Box>
          </LayoutWithSafeAreaWithoutScroll>
        </SlideUpComponent>
      )}
      <BottomSheetComponent
        grayBg
        setShowBlur={setShowModal}
        showBlur={showModal}>
        <Box
          style={[
            globalStyle.w10,
            globalStyle.pb1,
            globalStyle.pt1p6,
            // styles.maxHeight,
          ]}>
          <Box style={[globalStyle.px2p4]}>
            <ModalHeaderRow
              title="Select Option"
              onPress={() => setShowModal(false)}
            />
          </Box>
          <Box>
            {(valueIndex !== 5
              ? dealBreakerQuestions[valueIndex]?.options
              : drinkOptions
            ).map(({item, mainKey}, index) => (
              <PressableComponent
                onPress={() => {
                  (valueIndex === 5
                    ? setDrinker
                    : valueIndex === 2
                    ? setSmoker
                    : valueIndex === 3
                    ? setComplexion
                    : valueIndex === 4
                    ? setBodyType
                    : valueIndex === 1
                    ? setEducation
                    : setReligion)({
                    item,
                    mainKey,
                  });
                  setShowModal(false);
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
                  <TextComponent style={[globalStyle.fontWeight500]}>
                    {item}
                  </TextComponent>
                </Box>
              </PressableComponent>
            ))}
          </Box>
        </Box>
      </BottomSheetComponent>
      <BottomSheetComponent showBlur={modal} setShowBlur={setModal} transparent>
        <Box
          style={[
            globalStyle.px2p4,
            globalStyle.pt1p4,
            globalStyle.w10,
            globalStyle.pb3,
          ]}>
          <Box
            style={[
              globalStyle.p1p6,
              globalStyle.w10,
              globalStyle.borderRadius16,
            ]}
            backgroundColor={'mainBackground'}>
            <PressableComponent
              onPress={onPressCamera}
              style={[
                globalStyle.flexrow,
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
                globalStyle.pb1p6,
                globalStyle.borBtm,
              ]}>
              <TextComponent
                style={[globalStyle.fontWeight500, globalStyle.fontSize16]}>
                Take a photo
              </TextComponent>
            </PressableComponent>
            <PressableComponent
              onPress={onPressImageLibrary}
              style={[
                globalStyle.flexrow,
                globalStyle.justifyCenter,
                globalStyle.alignItemsCenter,
                globalStyle.pt1p6,
              ]}>
              <TextComponent
                style={[globalStyle.fontWeight500, globalStyle.fontSize16]}>
                Choose from Gallery
              </TextComponent>
            </PressableComponent>
          </Box>
          <Box style={[globalStyle.pt1p6]}>
            <ButtonComponent title="Cancel" onPress={() => setModal(false)} />
          </Box>
        </Box>
      </BottomSheetComponent>
    </>
  );
};

const completeStyle = ScaledSheet.create({
  indictorHeigh: {
    height: '2@s',
  },
  imageBox: {
    height: '300@s',
  },
  smallImg: {
    height: '56@s',
    width: '56@s',
  },
  smallerImg: {
    height: '48@s',
    width: '48@s',
  },
});
export default CompleteProfile;
