import { useAuthentication } from '../hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import OnboardingStack from './onboardingStack';

export default function RootNavigation() {
  const {user} = useAuthentication();
  const onboarded = false;

  return user ? (onboarded ? <UserStack /> : <OnboardingStack/> ) : <AuthStack />;
}