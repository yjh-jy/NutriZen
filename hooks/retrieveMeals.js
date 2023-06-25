import { getDocs, getDoc, collection, query, orderBy, limit, where} from 'firebase/firestore';
import {auth, db} from '../firebase';


export async function retrieveMeals(currentDate){
    currentDate.setHours(0, 0, 0, 0);
    const user = auth.currentUser;
    const mealsRef = collection(db, "users", user.uid, "meals");
    const mealsQuery = query(mealsRef, where('time', '>=', currentDate), where('time', '<', new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)));
    const querySnapshot = await getDocs(mealsQuery);
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
    return data;
}
