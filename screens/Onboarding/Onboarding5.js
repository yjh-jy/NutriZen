import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {useState} from 'react';
import colors from '../../assets/colors/colors';
import LoadingAnimation from '../../components/LoadingAnimation';
import { doc, setDoc} from "firebase/firestore"; 
import { db } from '../../firebase';
import { auth } from '../../firebase';
import DropdownComponent from '../../components/DropDown';


export default Onboarding5 = ({navigation, route}) => {
  const [isloading, setIsloading] = useState(false);
  const [fitness, setFitness] = useState('');
  
  const name = route.params.nameParam;
  const age = route.params.ageParam;
  const height = route.params.heightParam;
  const weight = route.params.weightParam;
  const gender = route.params.genderParam;

  const fitnessData = [
    { label: 'Sedentary', value: 1.2 },
    { label: 'Lightly active', value: 1.375 },
    { label: 'Moderate', value: 1.55 },
    { label: 'Very active', value: 1.725},
    { label: 'Extra active', value: 1.9 },
  ];

  async function handleSubmit() {
    setIsloading(true);
    user = auth.currentUser;
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      gender: gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      fitness_constant: fitness
    });
    setIsloading(false);
  }

  if (isloading) {
    return <LoadingAnimation caption='Onboarding. . .'/>
  }
  
  return (
    <View style={styles.container}>
        <KeyboardAvoidingView>
            <View style = {styles.itemsWrapper}>

              <DropdownComponent 
              data={fitnessData} 
              dropdownlabel={fitness ? fitness : 'Select your fitness level'} 
              icon = 'running' 
              value={fitness}
              setValue={setFitness}
              />

              <TouchableOpacity onPress={
                fitness 
                ? handleSubmit
              : ()=>{alert('Enter a fitness level')}
              }>
                <Text style = {styles.proceed}>Submit</Text>
                </TouchableOpacity>
                
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Text style = {styles.back} >Back</Text>
                </TouchableOpacity>
              
              

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