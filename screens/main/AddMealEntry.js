import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native'
import {useState} from 'react'
import colors from '../../assets/colors/colors'
import LoadingAnimation from '../../components/LoadingAnimation'
import DropdownComponent from '../../components/DropDown';
import { class_names } from '../../assets/model/class_names';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import {API_KEY_CALORIE_NINJA} from '@env';
import {addDoc, collection, serverTimestamp, doc } from "firebase/firestore";
import {auth, db} from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AddMealEntry({navigation, route}) {
  const [prediction, setPrediction] = useState(route.params.predictionParam);
  const [portionSize, setPortionSize] = useState(null);
  const [portionWeight, setPortionWeight] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const image = route.params.imageParam;
  const imageFileNameArray = image.uri.split('/');
  const imageFileName = imageFileNameArray[imageFileNameArray.length -1] // to be used later when creating a permanent copy on the device local storage

  //data arrays for the dropdowns
  const portionSizeData = [
    { label: 'one-quarter', value: 0.25 },
    { label: 'half', value: 0.50 },
    { label: 'three-quarters', value: 0.75},
    { label: 'full', value: 1 },
  ];
  const predictionsData = [];
  let i;
  for (i in class_names) {
    predictionsData.push(
      {
        label : class_names[i], 
        value : class_names[i]
      }
      );
    };

  const combineNutrients = async (mealNutrients) => {
    let hasMutipleItems = false;
    await mealNutrients.length === 1 ? null : hasMutipleItems = true; //changing control flow
        if (hasMutipleItems) {
          const combinedNutrients = mealNutrients.reduce((accumulator, item) => {
            for (const key in item) {
              if (typeof item[key] === 'number') {
                accumulator[key] = (accumulator[key] || 0) + item[key];
              } else if (typeof item[key] === 'string') {
                accumulator[key] = (accumulator[key] || ' ') + item[key];
              }
            }
            return accumulator;
          }, {});
          mealNutrients.splice(0, mealNutrients.length, combinedNutrients);
        } else {
          mealNutrients = mealNutrients[0]
        };
  }


  const handleAddMeal = async () => {
    try {
      setIsLoading(true);
      // making a permanent copy of the the image 
      await FileSystem.copyAsync(
        {
          from:image.uri,
          to: FileSystem.documentDirectory + imageFileName
        }
        );

      // formulating the query 
      const query = portionSize === 1
        ? portionWeight // if portionWeight is specified, 
          ? `${portionWeight}g ${prediction}` // query with the portionWeight 
          : `${quantity} ${prediction}` // else, query with the quantity, default is 1.
        : `1 ${prediction}`; // The API doesn't understand decimals, so we will query the full portionSize first then calculate later

      // retrieving the query from the API using GET HTTP
      const response = await axios.get('https://api.calorieninjas.com/v1/nutrition?query=', {
        params: {
          query: query
        },
        headers: {
          'X-Api-Key': API_KEY_CALORIE_NINJA
        },
      });

      let mealNutrients = response.data.items; // saving the nutrients into a variable
      combineNutrients(mealNutrients); //combining nutrients if there's multiple nutrients returned
    
      // applying the portionSize to each nutrient correctly
      for (let nutrient of Object.keys(mealNutrients)) {
        if(typeof mealNutrients[nutrient] == "number" ) {
          mealNutrients[nutrient]*= Number(portionSize); // calculate portionSize
          if (portionWeight) {
            mealNutrients[nutrient]*= Number(quantity); // calculate quantity based on portionWeight
          }
        }
      };

      // adding the meal information to firestore
      const user = auth.currentUser;
      id = await AsyncStorage.getItem(user.uid);       
      const userRef = doc(db, "users", id);
      const mealRef = collection(userRef, "meals");
      await addDoc(mealRef, {
        name: prediction,
        imageuri:  FileSystem.documentDirectory + imageFileName,
        nutrients: mealNutrients[0],
        time: serverTimestamp()
      });

      setIsLoading(false);
      navigation.navigate('IndividualMeals');

    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <LoadingAnimation caption='Getting Nutrients. . .'/>
  }
  
  return (
    <View style={{
      flex:1 , 
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.backgroundColor,
      paddingBottom: insets.bottom
      }}
      >
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height" }>
      <Image source={{uri:image.uri}} style={{height:230, width:230, alignSelf:'center',borderRadius:39}} resizeMode='contain'/>
      
      <Text style= {{fontFamily:'PixeloidsSanBold', fontSize:15, alignSelf:'center', margin:10}}>
        {'<<< Meal Information >>>'}
      </Text>

      <DropdownComponent 
      data={predictionsData} 
      dropdownlabel={prediction ? prediction : 'Enter meal name'} 
      icon = 'utensils' 
      value={prediction} 
      setValue={setPrediction}
      />

      <DropdownComponent 
      data={portionSizeData} 
      dropdownlabel='Enter portion size' 
      icon = 'drumstick-bite' 
      value={portionSize} 
      setValue={setPortionSize}
      />
    {portionSize !== 1 ? null : // display only portionWeight and quantity if portionSize is full
      <View>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          selectionColor={colors.backgroundColor}
          placeholder='Enter portion weight in g (if applicable)'
          enterKeyHint="done"
          inputMode='numeric'
          textAlign='center'
          maxLength={3}
          value={portionWeight}
          onChangeText={text => setPortionWeight(text)}
        />
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          selectionColor={colors.backgroundColor}
          placeholder='Enter quantity (if applicable)'
          enterKeyHint="done"
          inputMode='numeric'
          textAlign='center'
          maxLength={3}
          value={quantity}
          onChangeText={quantity === 0 ? setQuantity(1): text => setQuantity(text)}
        />
      </View>
    }

      <Ionicons name="add-circle" 
      color='black'
      backgroundColor='transparent'
      style={{marginTop:15, alignSelf:'center'}}
      size={40}
      onPress={() => {(portionSize !== null && quantity !== '' )? handleAddMeal() : alert('Please enter a portion size/quantity')}}
      />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height:49,
    width:300,
    margin:10,
    backgroundColor: colors.textFieldColor,
    fontSize: 12,
    fontFamily: "PixeloidSan",
    alignSelf:'center',
  
  },
})