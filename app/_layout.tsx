import React, {useCallback, useEffect} from 'react';
import {store} from '@/store/store';
import {SplashScreen, Stack} from 'expo-router';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from '@shopify/restyle';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import globalStyle from '@/globalStyle/globalStyle';
import {useFonts} from 'expo-font';
import Box from '@/components/layout/Box';
import theme from '@/constants/theme/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Medium': require('@/assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/Inter-SemiBold.ttf'),
    'Grotesk-Book20': require('@/assets/fonts/SharpGrotesk-Book20.otf'),
    'Grotesk-Book25': require('@/assets/fonts/SharpGrotesk-Book25.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
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
        <WrapperLayout />
      </Provider>
    </QueryClientProvider>
  );
}

const WrapperLayout = () => {
  const darkMode = false;

  return (
    <ThemeProvider theme={darkMode ? theme.darkTheme : theme.lightTheme}>
      <GestureHandlerRootView style={[globalStyle.flexOne]}>
        <SafeAreaProvider>
          <Box style={[globalStyle.flexOne]}>
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
