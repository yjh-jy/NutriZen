import {useEffect, useState} from 'react';
import { onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase'


export function useAuthentication() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(undefined);
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return {
        user
    };
}