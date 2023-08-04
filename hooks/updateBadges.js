import { collection, getCountFromServer, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { atom } from "jotai";

export const calorieAtom = atom('lacking1');
export const sodiumAtom = atom('lacking1');
export const proteinAtom = atom('lacking1');
export const fibreAtom = atom('lacking1');
export const fatAtom = atom('lacking1');
export const carbohydrateAtom = atom('lacking1');
export const sugarAtom = atom('lacking1');
export const cholesterolAtom = atom('lacking1');


export async function updateBadges(calorie, sodium, protein, fibre, fat, carbohydrate, sugar, cholesterol) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const nutrientArray = [calorie, sodium, protein, fibre, fat, carbohydrate, sugar, cholesterol];

    const badgesStatus = {
        allExcessive: false,
        allSufficient: false,
        logConsecutive3:false,
        logConsecutive7:false,
        moreThan3MealsADay:false,
      };
      
    let mealsCounter = 0;
    let excessiveCounter = 0;
    let sufficientCounter = 0;
    let consecutiveDays = 0;
    let previousDate = null;

    const user = auth.currentUser;
    const mealsRef = collection(db, "users", user.uid, "meals");
  
    const currentDayMealQuery = query( mealsRef, where('time', '>=', currentDate), where('time', '<', new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)));
    const allTimeMealQuery = query(mealsRef, orderBy('time', 'asc'));

    const currentDayMealQuerySnapshot = await getCountFromServer(currentDayMealQuery);
    const allTimeMealQuerySnapshot = await getDocs(allTimeMealQuery);
    let time_list = [];

    allTimeMealQuerySnapshot.forEach((doc)=>{
        const timestamp = doc.data().time.toDate();
        const date = new Date(timestamp);
        date.setHours(0, 0, 0, 0);
        time_list.push(date);
    });

    time_list.forEach((date) => {
        if (previousDate) {
          const timeDifference = date - previousDate;
          const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

        //   console.log(`Current date: ${date}, Previous date: ${previousDate}, Day difference: ${dayDifference}`);

          if (dayDifference === 0) {
            return
          } else if (dayDifference === 1) {
            consecutiveDays++;

          } else if (dayDifference > 1) {
            consecutiveDays = 1; // Reset if the difference is greater than 1
          }
    
          if (consecutiveDays === 6) { // Check for 6, since we start counting from 0
            console.log('User has logged meals consecutively for 7 days!');
            return;
          };

        }
    
        if (!previousDate || date - previousDate !== 0) {
          previousDate = date; // Update previousDate only if the date is different from the previous one
        }
      });

      mealsCounter = currentDayMealQuerySnapshot.data().count;

      for (let nutrient of nutrientArray) {
        if (nutrient.includes('excessive')) {
            excessiveCounter++
        } else if (nutrient.includes('sufficient')) {
            sufficientCounter++
        }
    };
    

    if (excessiveCounter == 8) {
        badgesStatus['allExcessive'] = true
    };

    if (sufficientCounter == 8) {
        badgesStatus['allSufficient'] = true
    };

    if (mealsCounter > 3) {
        badgesStatus['moreThan3MealsADay'] = true
    };
    if (consecutiveDays >= 7 ) {
        badgesStatus['logConsecutive7'] = true
    };
    if (consecutiveDays >= 3 ) {
        badgesStatus['logConsecutive3'] = true
    };
    
    let awardedBadges = [];
    for (const key in badgesStatus) {
        if (badgesStatus[key]) {
            awardedBadges.push(key)
        }
    }
    return awardedBadges
};