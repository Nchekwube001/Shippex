import React from 'react';
import {Redirect} from 'expo-router';
import {useAppSelector} from '@/constants/utils/hooks';
export default function Index() {
  // const [onboarded] = useState(true);
  const {loggedIn} = useAppSelector(state => state.isLoggedIn);
  const {onboarded} = useAppSelector(state => state.userOnboarded);
  // return <Redirect href={'/onboarding'} />;
  if (!loggedIn && !onboarded) {
  }
  return (
    <Redirect
      // href={loggedIn ? '/home' : onboarded ? '/selectoption' : '/onboarding'}
      // href={
      //   loggedIn ? '/home' : onboarded ? '/takepersonalitytest' : '/onboarding'
      // }
      // href={'/home'}
      // href={'/chooseinterests'}
      href={'/onboarding'}
    />
  );
}
// ✗ eas build -p android --profile preview2
