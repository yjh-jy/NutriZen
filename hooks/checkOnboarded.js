import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';


export function checkOnboarded() {
  const [onboarded, setOnboarded] = useState(false);
  useEffect(()=> {
    const unsub = async () => {
      const ref = auth.currentUser ? await AsyncStorage.getItem(auth.currentUser.uid) : null
      if (ref !== null) {
        setOnboarded(true);
      } else {
        setOnboarded(false);
      }
    };
    return (() => {unsub()});
  }, [auth.currentUser]);

  return onboarded;
  
}