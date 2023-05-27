import { useAuthentication } from '../hooks/useAuthentication';
import UserTab from './userTab';
import AuthStack from './authStack';
import OnboardingStack from './onboardingStack';

export default function RootNavigation() {
  const {user} = useAuthentication();
  const onboarded = true;

  return user ? (onboarded ? <UserTab /> : <OnboardingStack/> ) : <AuthStack />;
}