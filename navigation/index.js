import { useAuthentication } from '../hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import OnboardingStack from './onboardingStack';
import { checkOnboarded } from '../hooks/checkOnboarded';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootNavigation() {
  const {user} = useAuthentication();
  const {onboarded} = checkOnboarded();
  // AsyncStorage.clear();
  return user ? (onboarded ? <UserStack /> : <OnboardingStack/> ) : <AuthStack />;
}