import React, {useCallback, useEffect} from 'react';
import {persistor, store} from '@/store/store';
import {SplashScreen, Stack} from 'expo-router';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from '@shopify/restyle';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import globalStyle from '@/globalStyle/globalStyle';
import {useFonts} from 'expo-font';
import Box from '@/components/layout/Box';
import theme from '@/constants/theme/theme';
import {useAppSelector} from '@/constants/utils/hooks';
import ToastComponent from '@/components/toast/ToastComponent';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'DMSans-Black': require('@/assets/fonts/DMSans-Black.ttf'),
    'DMSans-ExtraBold': require('@/assets/fonts/DMSans-ExtraBold.ttf'),
    'DMSans-Bold': require('@/assets/fonts/DMSans-Bold.ttf'),
    'DMSans-Light': require('@/assets/fonts/DMSans-Light.ttf'),
    'DMSans-Medium': require('@/assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Regular': require('@/assets/fonts/DMSans-Regular.ttf'),
    'DMSans-SemiBold': require('@/assets/fonts/DMSans-SemiBold.ttf'),
    'Matter-Bold': require('@/assets/fonts/Matter-Bold.ttf'),
    'Matter-Light': require('@/assets/fonts/Matter-Light.ttf'),
    'Matter-Medium': require('@/assets/fonts/Matter-Medium.ttf'),
    'Matter-Regular': require('@/assets/fonts/Matter-Regular.ttf'),
    'Matter-SemiBold': require('@/assets/fonts/Matter-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      webClientId:
        '497051864317-f446haclfv4u522910ccq4fij3goc8pd.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '497051864317-arvm4ba31b73gfq05ib3sr7t04o9nld7.apps.googleusercontent.com',
    });
  }, []);
  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <WrapperLayout />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

const WrapperLayout = () => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  const {access_token} = useAppSelector(state => state.isLoggedIn);
  if (!access_token) {
  }
  // console.log({
  //   access_token,
  // });
  // console.log({
  //   darkMode,
  // });

  // const dispatch = useAppDispatch();
  // const checkDeviceHasBiometric = useCallback(async () => {
  //   const rnBiometrics = ReactNativeBiometrics;
  //   const { available } = await rnBiometrics.isSensorAvailable();
  //   // console.log({available});

  //   if (available) {
  //     dispatch(
  //       setDeviceHasBio({
  //         deviceHasBio: true,
  //       })
  //     );
  //   }
  // }, [dispatch]);
  // useEffect(() => {
  //   checkDeviceHasBiometric();
  // }, [checkDeviceHasBiometric]);

  return (
    <ThemeProvider theme={darkMode ? theme.darkTheme : theme.lightTheme}>
      <GestureHandlerRootView style={[globalStyle.flexOne]}>
        <SafeAreaProvider>
          <Box style={[globalStyle.flexOne]}>
            <ToastComponent />
            <MainNavigation />
          </Box>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

const MainNavigation = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(maingroup)" />
    </Stack>
  );
  // return <Slot screenOptions={{headerShown: false}} />;
};
