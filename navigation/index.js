import { useAuthentication } from '../hooks/useAuthentication';
import UserTab from './userTab';
import AuthStack from './authStack';
import OnboardingStack from './onboardingStack';
import { checkOnboarded } from '../hooks/checkOnboarded';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootNavigation() {
  const {user} = useAuthentication();
  // AsyncStorage.clear();
  const onboarded = checkOnboarded();
  return user ? (onboarded ? <UserTab /> : <OnboardingStack/> ) : <AuthStack />;

}