import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput, } from 'react-native';
import {useState} from 'react';
import colors from '../../assets/colors/colors';
import LoadingAnimation from '../LoadingAnimation';
import { collection, doc, setDoc} from "firebase/firestore"; 
import { db } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebase';


export default Onboarding5 = ({navigation, route}) => {
  const [isloading, setIsloading] = useState(false);
  const [goal, setGoal] = useState('');
  const name = route.params.nameParam;
  const age = route.params.ageParam;
  const height = route.params.heightParam;
  const weight = route.params.weightParam;
  const gender = route.params.genderParam;

  async function handleSubmit() {
    setIsloading(true);
    const userRef = doc(collection(db, "users"));
    await setDoc(userRef, {
      name: name,
      gender: gender,
      age: age,
      height: height,
      weight: weight,
      goal: goal
    })
  user = auth.currentUser;
  await AsyncStorage.setItem(user.uid, userRef.id);
  console.log(user.uid, userRef.id);
  setIsloading(false);
  }


  if (isloading) {
    return <LoadingAnimation/>
  }
  
  return (
    <View style={styles.container}>
        <KeyboardAvoidingView>
            <View style = {styles.itemsWrapper}>
              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              textAlign = 'center'
              value = {goal}
              onChangeText={text => setGoal(text)}
              >
              </TextInput>

              <Text style = {styles.subtitle}>Enter your goal</Text>              

              <Pressable onPress={handleSubmit}>
                <Text style = {styles.proceed}>Submit</Text>
                </Pressable>
                
            <Pressable onPress={()=>{navigation.goBack()}}>
                <Text style = {styles.back} >Back</Text>
                </Pressable>
              
              

            </View>
            </KeyboardAvoidingView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.backgroundColor,
  },
  itemsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '80%',

  },
  input: {
    height:49,
    width:220,
    backgroundColor: colors.textFieldColor,
    fontSize: 20,
    fontFamily: "PixeloidSan",
    padding:10
    
  },
  subtitle: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 18,
    padding:10
  },
  proceed: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    marginTop:40,
  },
  back: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    marginTop:20,
  },

})