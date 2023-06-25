import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";


export function checkOnboarded() {
  const [onboarded, setOnboarded] = useState(false);
  
  useEffect(() => {
    const unsub = async () =>{
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOnboarded(true);
        } else {
          setOnboarded(false);
        };
    } else {
      setOnboarded(false);
    }
  };
  unsub();
  }, [auth.currentUser]);
  return onboarded;
}