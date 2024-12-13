import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';


import { View } from 'react-native';
import { Stack } from 'expo-router';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#05071E'}}>
    {
      isLoggedin ? (
        <View></View>
      ):(
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name='index' />
          <Stack.Screen name='(routes)/login/index'/>
          <Stack.Screen name='(routes)/signUp/index'/>
          <Stack.Screen name='(routes)/signUpTwo/index'/>
        </Stack>
      )
    }
  </View>

  );
}
