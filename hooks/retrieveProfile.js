import { doc, getDoc, getDocFromCache } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function retrieveProfile() {
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();

}