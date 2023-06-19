import { doc, getDoc} from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase'
import { db } from '../firebase';

export async function retrieveRNI() {
    const user = auth.currentUser;
    console.log(user.uid, 'useruid');
    const id = await AsyncStorage.getItem(user.uid);
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        userInformation = docSnap.data();
        const calories = userInformation.gender === 'male' 
        ? (10*userInformation.weight + 6.25*userInformation.height - 5*userInformation.age + 5)*userInformation.fitness_constant
        : (10*userInformation.weight + 6.25*userInformation.height - 5*userInformation.age - 161)*userInformation.fitness_constant;
        const carbohydrate = calories * 0.55;
        const protein = userInformation.weight * 0.75;
        const fat = (calories*0.25)/9;
        const fibre = userInformation.gender === 'male' ? 30 : 21;
        const sugar = (calories * 0.10)/5;
        const cholesterol = 250;
        const sodium = 2.3;
        const RNI = {calories:calories, protein:protein, fat:fat, fibre:fibre, sugar:sugar, cholesterol:cholesterol, sodium:sodium}
        return RNI;
    
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
} 