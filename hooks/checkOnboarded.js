import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';

export function checkOnboarded() {
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const checkUserOnboarded = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const ref = await AsyncStorage.getItem(user.uid);
          if (ref !== null) {
            setOnboarded(true);
          } else {
            setOnboarded(false);
          }
        } else {
          setOnboarded(false);
        }
      } catch (error) {
        console.log('Error checking onboarded status:', error);
      }
    };

    checkUserOnboarded();
  }, [auth.currentUser]);

  return onboarded;
}