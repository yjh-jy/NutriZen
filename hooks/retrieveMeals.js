import { getDocs, getDoc, collection, query, orderBy, limit, where} from 'firebase/firestore';
import {auth, db} from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function retrieveMeals(currentDate){
    currentDate.setHours(0, 0, 0, 0);
    const user = auth.currentUser;
    const id = await AsyncStorage.getItem(user.uid);
    const mealsRef = collection(db, "users", id, "meals");
    const mealsQuery = query(mealsRef, where('time', '>=', currentDate), where('time', '<', new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)));
    const querySnapshot = await getDocs(mealsQuery);
    let data = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
    return data;
}
