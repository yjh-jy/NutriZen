import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {useState} from 'react';
import colors from '../../assets/colors/colors';
import DropdownComponent from '../../components/DropDown';


export default Onboarding2 = ({route, navigation}) => {
  const [gender, setGender] = useState('');

  const genderData = [
    { label: 'male', value: 'male' },
    { label: 'female', value: 'female' },
  ];

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView>
            <View style = {styles.itemsWrapper}>

              <DropdownComponent 
              data={genderData} 
              dropdownlabel={gender ? gender : 'Select your gender'} 
              icon = 'venus-mars' 
              value={gender}
              setValue={setGender}
              />              

              <TouchableOpacity 
              onPress={gender 
              ? ()=>{navigation.navigate('Onboarding3', {genderParam: gender, nameParam: route.params.nameParam})} 
              : () => {alert('Please select your gender')}}>
                <Text style = {styles.proceed}>Proceed</Text>
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
    marginVertical: '80%',

  },
  input: {
    height:49,
    width:150,
    backgroundColor: colors.textFieldColor,
    fontSize: 20,
    fontFamily: "PixeloidSan",
    padding:10
    
  },
  subtitle: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
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