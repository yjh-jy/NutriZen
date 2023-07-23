import { useAuthentication } from '../hooks/useAuthentication';
import UserTab from './userTab';
import AuthStack from './authStack';
import OnboardingStack from './onboardingStack';
import { checkOnboarded } from '../hooks/checkOnboarded';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';


export default function RootNavigation() {
  const [fontsLoaded] = useFonts({
    "PixeloidSan": require("../assets/fonts/PixeloidSans-mLxMm.ttf"),
    "PixeloidsSanBold": require("../assets/fonts/PixeloidSansBold-PKnYd.ttf"),
    "MinimalPixel": require("../assets/fonts/MinimalPixelFont.ttf")
    });
  const {user} = useAuthentication();
  const onboarded = checkOnboarded();
  // AsyncStorage.clear();
  return user ? (onboarded ? <UserTab /> : <OnboardingStack/> ) : <AuthStack />;

}