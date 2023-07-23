import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { atom, useAtom, useAtomValue } from 'jotai';

export const onboardedAtom = atom(false);
const currentUserOnboardedAtom = atom(false);

export function checkOnboarded() {
  const onboarded = useAtomValue(onboardedAtom);
  const [currentUserOnboarded, setCurrentUserOnboarded] = useAtom(currentUserOnboardedAtom);
  
  const user = auth.currentUser;
  console.log(currentUserOnboarded);
    
  useEffect(() => {
    const unsub = async () =>{
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() || onboarded) {
          setCurrentUserOnboarded(true);
        } else {
          setCurrentUserOnboarded(false)
        };
      } else {
        setCurrentUserOnboarded(false)
      }
    };
    unsub();
  }, [user, onboarded]);
  return currentUserOnboarded
}